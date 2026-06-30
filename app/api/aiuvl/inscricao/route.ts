import { NextRequest, NextResponse } from "next/server";
import { dbAiuvl as db } from "@/lib/prisma-aiuvl";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { gerarSenha, hashSenha } from "@/lib/password";
import { sendEmail, emailBoasVindasEntidade } from "@/lib/email";
import {
  periodoInscricaoCandidatosAiuvlAberto,
  periodoInscricaoEleitoresAiuvlAberto,
  periodoReinscricaoCandidatosAiuvlAberto,
  segmentoHabilitadoReinscricaoAiuvl,
  AIUVL_RODADA_CANDIDATOS,
} from "@/lib/config";
import type { CategoriaArquivo, Segmento, Genero } from "@/lib/generated/aiuvl";

function parseDateBR(dateStr: string): Date {
  const [dia, mes, ano] = dateStr.split("/").map(Number);
  return new Date(ano, mes - 1, dia);
}
function cleanCNPJ(v: string) { return v.replace(/[^\d]/g, ""); }
function cleanCPF(v: string) { return v.replace(/[^\d]/g, ""); }

async function salvarArquivo(arquivo: File, dir: string) {
  const nome = `${Date.now()}-${Math.random().toString(36).slice(2)}-${arquivo.name}`;
  const caminho = join(dir, nome);
  await writeFile(caminho, Buffer.from(await arquivo.arrayBuffer()));
  return { nome: arquivo.name, tipo: arquivo.type, tamanho: arquivo.size, caminho };
}

async function garantirDiretorio(dir: string) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

const CATEGORIA_MAP: Record<string, CategoriaArquivo> = {
  // Candidatura - entidade
  candEntRequerimento:         "CAND_ENT_REQUERIMENTO",
  candEntDeclaracaoAtuacao:    "CAND_ENT_DECLARACAO_ATUACAO",
  candEntEstatuto:             "CAND_ENT_ESTATUTO",
  candEntAtaEleicao:           "CAND_ENT_ATA_ELEICAO",
  candEntCnpj:                 "CAND_ENT_CNPJ",
  candEntDeclaracaoIdoneidade: "CAND_ENT_DECLARACAO_IDONEIDADE",
  // Candidatura - representante legal
  repIdentidade:               "CAND_REP_IDENTIDADE",
  repCpfDoc:                   "CAND_REP_CPF",
  repTituloEleitor:            "CAND_REP_TITULO_ELEITOR",
  repComprovanteResidencia:    "CAND_REP_COMPROVANTE_RESIDENCIA",
  // Candidatura - titular
  titularIdentidade:           "CAND_CAN_IDENTIDADE",
  titularCpfDoc:               "CAND_CAN_CPF",
  titularFoto:                 "CAND_CAN_FOTO",
  titularTituloEleitor:        "CAND_CAN_TITULO_ELEITOR",
  titularResidencia:           "CAND_CAN_COMPROVANTE_RESIDENCIA",
  titularDeclaracao:           "CAND_CAN_DECLARACAO",
  // Candidatura - suplente
  suplenteIdentidade:          "CAND_CAN_IDENTIDADE",
  suplenteCpfDoc:              "CAND_CAN_CPF",
  suplenteFoto:                "CAND_CAN_FOTO",
  suplenteTituloEleitor:       "CAND_CAN_TITULO_ELEITOR",
  suplenteResidencia:          "CAND_CAN_COMPROVANTE_RESIDENCIA",
  suplenteDeclaracao:          "CAND_CAN_DECLARACAO",
  // Eleitor - entidade
  eleitEntRequerimento:        "ELEIT_ENT_REQUERIMENTO",
  eleitEntDeclaracaoAtuacao:   "ELEIT_ENT_DECLARACAO_ATUACAO",
  eleitEntEstatuto:            "ELEIT_ENT_ESTATUTO",
  eleitEntAtaEleicao:          "ELEIT_ENT_ATA_ELEICAO",
  eleitEntCnpj:                "ELEIT_ENT_CNPJ",
  eleitEntDeclaracaoIdoneidade:"ELEIT_ENT_DECLARACAO_IDONEIDADE",
  // Eleitor - rep legal
  eleitRepIdentidade:          "ELEIT_REP_IDENTIDADE",
  eleitRepCpfDoc:              "ELEIT_REP_CPF",
  eleitRepTituloEleitor:       "ELEIT_REP_TITULO_ELEITOR",
  eleitRepResidencia:          "ELEIT_REP_COMPROVANTE_RESIDENCIA",
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const tipoInscricao = formData.get("tipoInscricao") as "CANDIDATO" | "ELEITOR";
    const uploadsBase = join(process.cwd(), "uploads", "aiuvl");
    await garantirDiretorio(uploadsBase);

    // -------------------------------------------------------------------------
    // CANDIDATO — período original (07/05 a 21/05) ou reabertura
    // -------------------------------------------------------------------------
    if (tipoInscricao === "CANDIDATO") {
      const inscricaoOriginalAberta = periodoInscricaoCandidatosAiuvlAberto();
      const reinscricaoAberta = periodoReinscricaoCandidatosAiuvlAberto();

      if (!inscricaoOriginalAberta && !reinscricaoAberta) {
        return NextResponse.json({ error: "Inscrições de candidatos fora do período permitido." }, { status: 400 });
      }

      const cnpj = cleanCNPJ(formData.get("entidadeCandidata.cnpj") as string);
      const razaoSocial = formData.get("entidadeCandidata.razaoSocial") as string;
      const segmento = formData.get("entidadeCandidata.segmento") as Segmento;
      const dataAbertura = parseDateBR(formData.get("entidadeCandidata.dataAbertura") as string);
      const sede = formData.get("entidadeCandidata.sede") as string;
      const repNome = formData.get("entidadeCandidata.repNome") as string;
      const repCpf = cleanCPF(formData.get("entidadeCandidata.repCpf") as string);
      const repTituloEleitor = (formData.get("entidadeCandidata.repTituloEleitor") as string) || null;
      const repDomicilio = (formData.get("entidadeCandidata.repDomicilio") as string) || null;
      const emailEntidade = (formData.get("entidadeCandidata.emailEntidade") as string).toLowerCase();
      const telefone = (formData.get("entidadeCandidata.telefone") as string) || null;

      // Valida segmento no período de reabertura
      if (reinscricaoAberta && !inscricaoOriginalAberta) {
        if (!segmentoHabilitadoReinscricaoAiuvl(segmento)) {
          return NextResponse.json(
            { error: "Segmento não habilitado na reabertura de inscrições." },
            { status: 400 },
          );
        }
      }

      // Verifica se CNPJ já existe na rodada atual
      const orgNaRodadaAtual = await db.organizacaoCandidata.findFirst({
        where: { cnpj, candidatura: { rodada: AIUVL_RODADA_CANDIDATOS } },
      });
      if (orgNaRodadaAtual) {
        return NextResponse.json(
          { error: "CNPJ já cadastrado nesta rodada de inscrições. Para atualizar, acesse o portal." },
          { status: 400 },
        );
      }

      // Verifica se existe inscrição anterior com este CNPJ (outra rodada)
      const orgAnterior = await db.organizacaoCandidata.findFirst({
        where: { cnpj },
        include: { candidatura: { include: { usuario: true } } },
        orderBy: { candidatura: { rodada: "desc" } },
      });

      const parseCandidato = (prefix: string) => ({
        nome: formData.get(`${prefix}.nome`) as string,
        nomeSocial: (formData.get(`${prefix}.nomeSocial`) as string) || null,
        genero: formData.get(`${prefix}.genero`) as Genero,
        dataNascimento: parseDateBR(formData.get(`${prefix}.dataNascimento`) as string),
        cpf: cleanCPF(formData.get(`${prefix}.cpf`) as string),
        tituloEleitor: (formData.get(`${prefix}.tituloEleitor`) as string) || null,
        domicilioEleitoral: (formData.get(`${prefix}.domicilioEleitoral`) as string) || null,
        email: (formData.get(`${prefix}.email`) as string).toLowerCase(),
        telefone: (formData.get(`${prefix}.telefone`) as string) || null,
      });

      // -----------------------------------------------------------------------
      // RE-INSCRIÇÃO: CNPJ encontrado com candidatura INDEFERIDA na rodada anterior
      // -----------------------------------------------------------------------
      if (orgAnterior && orgAnterior.candidatura.status === "INDEFERIDO" && reinscricaoAberta) {
        const usuarioExistente = orgAnterior.candidatura.usuario;

        const titularData = parseCandidato("titular");
        const suplenteData = parseCandidato("suplente");

        const senhaPlana = gerarSenha();
        const senhaHash = await hashSenha(senhaPlana);

        const resultado = await db.$transaction(async (tx) => {
          // Reativa o usuário e gera nova senha
          await tx.usuario.update({
            where: { id: usuarioExistente.id },
            data: { status: true, senha: senhaHash, primeiroAcesso: true },
          });

          const candidatura = await tx.candidatura.create({
            data: {
              tipoInscricao: "CANDIDATO",
              rodada: AIUVL_RODADA_CANDIDATOS,
              usuarioId: usuarioExistente.id,
            },
          });

          const org = await tx.organizacaoCandidata.create({
            data: {
              razaoSocial, cnpj, segmento, dataAbertura, sede,
              repNome, repCpf, repTituloEleitor, repDomicilio,
              emailEntidade, telefone, candidaturaId: candidatura.id,
            },
          });

          const dir = join(uploadsBase, `candidatura-${candidatura.id}`);
          await garantirDiretorio(dir);

          for (const campo of ["candEntRequerimento","candEntDeclaracaoAtuacao","candEntEstatuto","candEntAtaEleicao","candEntCnpj","candEntDeclaracaoIdoneidade"]) {
            const arquivo = formData.get(campo) as File | null;
            if (arquivo && arquivo.size > 0) {
              const salvo = await salvarArquivo(arquivo, dir);
              await tx.arquivo.create({ data: { ...salvo, orgCandidataId: org.id, categoria: CATEGORIA_MAP[campo] } });
            }
          }

          for (const campo of ["repIdentidade","repCpfDoc","repTituloEleitor","repComprovanteResidencia"]) {
            const arquivo = formData.get(campo) as File | null;
            if (arquivo && arquivo.size > 0) {
              const salvo = await salvarArquivo(arquivo, dir);
              await tx.arquivo.create({ data: { ...salvo, candidaturaId: candidatura.id, categoria: CATEGORIA_MAP[campo] } });
            }
          }

          const titular = await tx.candidato.create({
            data: { ...titularData, tipoCandidato: "TITULAR", candidaturaId: candidatura.id },
          });
          for (const campo of ["titularIdentidade","titularCpfDoc","titularFoto","titularTituloEleitor","titularResidencia","titularDeclaracao"]) {
            const arquivo = formData.get(campo) as File | null;
            if (arquivo && arquivo.size > 0) {
              const salvo = await salvarArquivo(arquivo, dir);
              await tx.arquivo.create({ data: { ...salvo, candidatoId: titular.id, categoria: CATEGORIA_MAP[campo] } });
            }
          }

          const suplente = await tx.candidato.create({
            data: { ...suplenteData, tipoCandidato: "SUPLENTE", candidaturaId: candidatura.id },
          });
          for (const campo of ["suplenteIdentidade","suplenteCpfDoc","suplenteFoto","suplenteTituloEleitor","suplenteResidencia","suplenteDeclaracao"]) {
            const arquivo = formData.get(campo) as File | null;
            if (arquivo && arquivo.size > 0) {
              const salvo = await salvarArquivo(arquivo, dir);
              await tx.arquivo.create({ data: { ...salvo, candidatoId: suplente.id, categoria: CATEGORIA_MAP[campo] } });
            }
          }

          return { candidatura, org };
        });

        // Envia credenciais para o e-mail informado na nova inscrição
        await sendEmail({
          to: emailEntidade,
          subject: "AIU-VL 2026 — Reabertura: nova inscrição de candidatura recebida",
          ...emailBoasVindasEntidade({
            razaoSocial,
            cnpj,
            emailEntidade: usuarioExistente.email,
            senha: senhaPlana,
            tipoInscricao: "CANDIDATO",
            sistemaLabel: "AIU-VL 2026 (Reabertura)",
          }),
        }).catch(console.error);

        return NextResponse.json({
          success: true,
          message: "Nova inscrição de candidatura na reabertura realizada com sucesso! Verifique o e-mail cadastrado para as novas credenciais de acesso ao portal.",
          candidaturaId: resultado.candidatura.id,
        });
      }

      // CNPJ existe mas não está com status INDEFERIDO — bloqueia
      if (orgAnterior) {
        const statusAtual = orgAnterior.candidatura.status;
        if (statusAtual === "DEFERIDO") {
          return NextResponse.json(
            { error: "CNPJ já possui inscrição deferida. Acesse o portal para acompanhar." },
            { status: 400 },
          );
        }
        if (statusAtual === "EM_ANALISE") {
          return NextResponse.json(
            { error: "CNPJ já possui inscrição em análise. Acesse o portal para acompanhar." },
            { status: 400 },
          );
        }
      }

      // -----------------------------------------------------------------------
      // NOVA INSCRIÇÃO (período original ou reabertura)
      // -----------------------------------------------------------------------
      if (!inscricaoOriginalAberta && !reinscricaoAberta) {
        return NextResponse.json({ error: "Inscrições de candidatos fora do período permitido." }, { status: 400 });
      }

      const titularData = parseCandidato("titular");
      const suplenteData = parseCandidato("suplente");

      const senhaPlana = gerarSenha();
      const senhaHash = await hashSenha(senhaPlana);

      const resultado = await db.$transaction(async (tx) => {
        const usuario = await tx.usuario.create({
          data: { tipo: "EXTERNO", nome: razaoSocial, email: emailEntidade, senha: senhaHash, primeiroAcesso: true },
        });

        const candidatura = await tx.candidatura.create({
          data: { tipoInscricao: "CANDIDATO", rodada: AIUVL_RODADA_CANDIDATOS, usuarioId: usuario.id },
        });

        const org = await tx.organizacaoCandidata.create({
          data: {
            razaoSocial, cnpj, segmento, dataAbertura, sede,
            repNome, repCpf, repTituloEleitor, repDomicilio,
            emailEntidade, telefone, candidaturaId: candidatura.id,
          },
        });

        const dir = join(uploadsBase, `candidatura-${candidatura.id}`);
        await garantirDiretorio(dir);

        for (const campo of ["candEntRequerimento","candEntDeclaracaoAtuacao","candEntEstatuto","candEntAtaEleicao","candEntCnpj","candEntDeclaracaoIdoneidade"]) {
          const arquivo = formData.get(campo) as File | null;
          if (arquivo && arquivo.size > 0) {
            const salvo = await salvarArquivo(arquivo, dir);
            await tx.arquivo.create({ data: { ...salvo, orgCandidataId: org.id, categoria: CATEGORIA_MAP[campo] } });
          }
        }

        for (const campo of ["repIdentidade","repCpfDoc","repTituloEleitor","repComprovanteResidencia"]) {
          const arquivo = formData.get(campo) as File | null;
          if (arquivo && arquivo.size > 0) {
            const salvo = await salvarArquivo(arquivo, dir);
            await tx.arquivo.create({ data: { ...salvo, candidaturaId: candidatura.id, categoria: CATEGORIA_MAP[campo] } });
          }
        }

        const titular = await tx.candidato.create({
          data: { ...titularData, tipoCandidato: "TITULAR", candidaturaId: candidatura.id },
        });
        for (const campo of ["titularIdentidade","titularCpfDoc","titularFoto","titularTituloEleitor","titularResidencia","titularDeclaracao"]) {
          const arquivo = formData.get(campo) as File | null;
          if (arquivo && arquivo.size > 0) {
            const salvo = await salvarArquivo(arquivo, dir);
            await tx.arquivo.create({ data: { ...salvo, candidatoId: titular.id, categoria: CATEGORIA_MAP[campo] } });
          }
        }

        const suplente = await tx.candidato.create({
          data: { ...suplenteData, tipoCandidato: "SUPLENTE", candidaturaId: candidatura.id },
        });
        for (const campo of ["suplenteIdentidade","suplenteCpfDoc","suplenteFoto","suplenteTituloEleitor","suplenteResidencia","suplenteDeclaracao"]) {
          const arquivo = formData.get(campo) as File | null;
          if (arquivo && arquivo.size > 0) {
            const salvo = await salvarArquivo(arquivo, dir);
            await tx.arquivo.create({ data: { ...salvo, candidatoId: suplente.id, categoria: CATEGORIA_MAP[campo] } });
          }
        }

        return { candidatura, org, usuario };
      });

      await sendEmail({
        to: emailEntidade,
        subject: "AIU-VL 2026 — Inscrição de Candidatura recebida",
        ...emailBoasVindasEntidade({ razaoSocial, cnpj, emailEntidade, senha: senhaPlana, tipoInscricao: "CANDIDATO", sistemaLabel: "AIU-VL 2026" }),
      }).catch(console.error);

      return NextResponse.json({
        success: true,
        message: "Inscrição de candidatura realizada com sucesso! Verifique o e-mail cadastrado para as credenciais de acesso ao portal.",
        candidaturaId: resultado.candidatura.id,
      });
    }

    // -------------------------------------------------------------------------
    // ELEITOR (período: 15/06 a 24/06/2026)
    // -------------------------------------------------------------------------
    if (tipoInscricao === "ELEITOR") {
      if (!periodoInscricaoEleitoresAiuvlAberto()) {
        return NextResponse.json({ error: "Inscrições de eleitores fora do período permitido." }, { status: 400 });
      }

      const cnpj = cleanCNPJ(formData.get("entidadeEleitora.cnpj") as string);
      const razaoSocial = formData.get("entidadeEleitora.razaoSocial") as string;
      const segmento = formData.get("entidadeEleitora.segmento") as Segmento;
      const segmentoVotacao = formData.get("entidadeEleitora.segmentoVotacao") as Segmento;
      const dataAbertura = parseDateBR(formData.get("entidadeEleitora.dataAbertura") as string);
      const sede = formData.get("entidadeEleitora.sede") as string;
      const repNome = formData.get("entidadeEleitora.repNome") as string;
      const repCpf = cleanCPF(formData.get("entidadeEleitora.repCpf") as string);
      const repTituloEleitor = (formData.get("entidadeEleitora.repTituloEleitor") as string) || null;
      const repDomicilio = (formData.get("entidadeEleitora.repDomicilio") as string) || null;
      const emailEntidade = (formData.get("entidadeEleitora.emailEntidade") as string).toLowerCase();
      const telefone = (formData.get("entidadeEleitora.telefone") as string) || null;

      const orgExistente = await db.organizacaoEleitora.findUnique({ where: { cnpj } });
      if (orgExistente) {
        return NextResponse.json(
          { error: "CNPJ já cadastrado. Para atualizar a inscrição, acesse o portal." },
          { status: 400 },
        );
      }

      const senhaPlana = gerarSenha();
      const senhaHash = await hashSenha(senhaPlana);

      const resultado = await db.$transaction(async (tx) => {
        const usuario = await tx.usuario.create({
          data: { tipo: "EXTERNO", nome: razaoSocial, email: emailEntidade, senha: senhaHash, primeiroAcesso: true },
        });

        const eleitor = await tx.eleitor.create({ data: { usuarioId: usuario.id } });

        const org = await tx.organizacaoEleitora.create({
          data: {
            razaoSocial, cnpj, segmento, segmentoVotacao, dataAbertura,
            sede, repNome, repCpf, repTituloEleitor, repDomicilio,
            emailEntidade, telefone, eleitorId: eleitor.id,
          },
        });

        const dir = join(uploadsBase, `eleitor-${eleitor.id}`);
        await garantirDiretorio(dir);

        // Documentos da entidade
        for (const campo of ["eleitEntRequerimento","eleitEntDeclaracaoAtuacao","eleitEntEstatuto","eleitEntAtaEleicao","eleitEntCnpj","eleitEntDeclaracaoIdoneidade"]) {
          const arquivo = formData.get(campo) as File | null;
          if (arquivo && arquivo.size > 0) {
            const salvo = await salvarArquivo(arquivo, dir);
            await tx.arquivo.create({ data: { ...salvo, orgEleitoraId: org.id, categoria: CATEGORIA_MAP[campo] } });
          }
        }

        // Documentos do representante legal
        for (const campo of ["eleitRepIdentidade","eleitRepCpfDoc","eleitRepTituloEleitor","eleitRepResidencia"]) {
          const arquivo = formData.get(campo) as File | null;
          if (arquivo && arquivo.size > 0) {
            const salvo = await salvarArquivo(arquivo, dir);
            await tx.arquivo.create({ data: { ...salvo, eleitorId: eleitor.id, categoria: CATEGORIA_MAP[campo] } });
          }
        }

        return { eleitor, org, usuario };
      });

      await sendEmail({
        to: emailEntidade,
        subject: "AIU-VL 2026 — Inscrição de Eleitor recebida",
        ...emailBoasVindasEntidade({ razaoSocial, cnpj, emailEntidade, senha: senhaPlana, tipoInscricao: "ELEITOR", sistemaLabel: "AIU-VL 2026" }),
      }).catch(console.error);

      return NextResponse.json({
        success: true,
        message: "Inscrição de eleitor realizada com sucesso! Verifique o e-mail cadastrado para as credenciais de acesso ao portal.",
        eleitorId: resultado.eleitor.id,
      });
    }

    return NextResponse.json({ error: "Tipo de inscrição inválido." }, { status: 400 });
  } catch (error: any) {
    console.error("[AIUVL] Erro na inscrição:", error);
    if (error?.code === "P2002") {
      const campo = error?.meta?.target?.[0];
      const labels: Record<string, string> = { cpf: "CPF", cnpj: "CNPJ", email: "e-mail", login: "login" };
      return NextResponse.json({ error: `${labels[campo] ?? campo} já cadastrado.` }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro interno ao processar inscrição." }, { status: 500 });
  }
}
