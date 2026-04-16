import { NextRequest, NextResponse } from "next/server";
import { dbAiusce as db } from "@/lib/prisma-aiusce";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { gerarSenha, hashSenha } from "@/lib/password";
import { sendEmail } from "@/lib/email";
import { PRAZO_INSCRICAO_AIUSCE } from "@/lib/config";
import type { CategoriaArquivo, Segmento, Genero } from "@/lib/generated/aiusce";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

// Mapeia campos do FormData para CategoriaArquivo do Prisma
const CATEGORIA_MAP: Record<string, CategoriaArquivo> = {
  candEntRequerimento:         "CAND_ENT_REQUERIMENTO",
  candEntDeclaracaoAtuacao:    "CAND_ENT_DECLARACAO_ATUACAO",
  candEntEstatuto:             "CAND_ENT_ESTATUTO",
  candEntAtaEleicao:           "CAND_ENT_ATA_ELEICAO",
  candEntCnpj:                 "CAND_ENT_CNPJ",
  candEntDeclaracaoIdoneidade: "CAND_ENT_DECLARACAO_IDONEIDADE",
  titularIdentidade:           "CAND_REP_IDENTIDADE",
  titularTituloEleitor:        "CAND_REP_TITULO_ELEITOR",
  titularCpf:                  "CAND_REP_CPF",
  titularFoto:                 "CAND_REP_FOTO",
  titularNaoImpedimento:       "CAND_REP_NAO_IMPEDIMENTO",
  suplenteIdentidade:          "CAND_REP_IDENTIDADE",
  suplenteTituloEleitor:       "CAND_REP_TITULO_ELEITOR",
  suplenteCpf:                 "CAND_REP_CPF",
  suplenteFoto:                "CAND_REP_FOTO",
  suplenteNaoImpedimento:      "CAND_REP_NAO_IMPEDIMENTO",
  chapaRequerimento:           "CAND_CHAPA_REQUERIMENTO",
  eleitEntRequerimento:        "ELEIT_ENT_REQUERIMENTO",
  eleitEntDeclaracaoAtuacao:   "ELEIT_ENT_DECLARACAO_ATUACAO",
  eleitEntEstatuto:            "ELEIT_ENT_ESTATUTO",
  eleitEntAtaEleicao:          "ELEIT_ENT_ATA_ELEICAO",
  eleitEntCnpj:                "ELEIT_ENT_CNPJ",
  eleitEntDeclaracaoIdoneidade:"ELEIT_ENT_DECLARACAO_IDONEIDADE",
  eleitRepIdentidade:          "ELEIT_REP_IDENTIDADE",
  eleitRepTituloEleitor:       "ELEIT_REP_TITULO_ELEITOR",
  eleitRepCpf:                 "ELEIT_REP_CPF",
  eleitProcProcuracao:         "ELEIT_PROC_PROCURACAO",
  eleitProcRequerimento:       "ELEIT_PROC_REQUERIMENTO",
};

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  if (new Date() > PRAZO_INSCRICAO_AIUSCE) {
    return NextResponse.json({ error: "Prazo de inscrições encerrado." }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    const tipoInscricao = formData.get("tipoInscricao") as "CANDIDATO" | "ELEITOR";
    const uploadsBase = join(process.cwd(), "uploads", "aiusce");
    await garantirDiretorio(uploadsBase);

    // -----------------------------------------------------------------------
    // CANDIDATO
    // -----------------------------------------------------------------------
    if (tipoInscricao === "CANDIDATO") {
      const cnpj = cleanCNPJ(formData.get("entidadeCandidata.cnpj") as string);
      const razaoSocial = formData.get("entidadeCandidata.razaoSocial") as string;
      const segmento = formData.get("entidadeCandidata.segmento") as Segmento;
      const dataAbertura = parseDateBR(formData.get("entidadeCandidata.dataAbertura") as string);
      const sede = formData.get("entidadeCandidata.sede") as string;
      const repNome = formData.get("entidadeCandidata.repNome") as string;
      const repCpf = cleanCPF(formData.get("entidadeCandidata.repCpf") as string);
      const emailEntidade = (formData.get("entidadeCandidata.emailEntidade") as string).toLowerCase();
      const telefone = (formData.get("entidadeCandidata.telefone") as string) || null;
      const formaChapa = formData.get("entidadeCandidata.formaChapa") === "true";
      const cnpjChapa = formData.get("entidadeCandidata.cnpjChapa") as string || null;

      // Impedir duplicata de CNPJ
      const orgExistente = await db.organizacaoCandidata.findUnique({ where: { cnpj } });
      if (orgExistente) {
        return NextResponse.json(
          { error: "CNPJ já cadastrado. Para atualizar a inscrição, acesse o portal." },
          { status: 400 },
        );
      }

      const parseCandidato = (prefix: string) => ({
        nome: formData.get(`${prefix}.nome`) as string,
        nomeSocial: (formData.get(`${prefix}.nomeSocial`) as string) || null,
        nomeEmpresa: (formData.get(`${prefix}.nomeEmpresa`) as string) || null,
        genero: formData.get(`${prefix}.genero`) as Genero,
        dataNascimento: parseDateBR(formData.get(`${prefix}.dataNascimento`) as string),
        cpf: cleanCPF(formData.get(`${prefix}.cpf`) as string),
        tituloEleitor: (formData.get(`${prefix}.tituloEleitor`) as string) || null,
        domicilioEleitoral: (formData.get(`${prefix}.domicilioEleitoral`) as string) || null,
        email: (formData.get(`${prefix}.email`) as string).toLowerCase(),
        telefone: (formData.get(`${prefix}.telefone`) as string) || null,
      });

      const titularData = parseCandidato("titular");
      const suplenteData = parseCandidato("suplente");

      const senhaPlana = gerarSenha();
      const senhaHash = await hashSenha(senhaPlana);

      const resultado = await db.$transaction(async (tx) => {
        const usuario = await tx.usuario.create({
          data: {
            tipo: "EXTERNO",
            nome: razaoSocial,
            email: emailEntidade,
            senha: senhaHash,
            primeiroAcesso: true,
          },
        });

        const candidatura = await tx.candidatura.create({
          data: { tipoInscricao: "CANDIDATO", usuarioId: usuario.id },
        });

        const org = await tx.organizacaoCandidata.create({
          data: {
            razaoSocial, cnpj, segmento, dataAbertura, sede,
            repNome, repCpf, emailEntidade, telefone, formaChapa,
            cnpjChapa: formaChapa ? cnpjChapa : null,
            candidaturaId: candidatura.id,
          },
        });

        const dir = join(uploadsBase, `candidatura-${candidatura.id}`);
        await garantirDiretorio(dir);

        // Arquivos da organização
        const camposOrg = [
          "candEntRequerimento", "candEntDeclaracaoAtuacao", "candEntEstatuto",
          "candEntAtaEleicao", "candEntCnpj", "candEntDeclaracaoIdoneidade",
        ];
        for (const campo of camposOrg) {
          const arquivo = formData.get(campo) as File | null;
          if (arquivo && arquivo.size > 0) {
            const salvo = await salvarArquivo(arquivo, dir);
            await tx.arquivo.create({
              data: { ...salvo, orgCandidataId: org.id, categoria: CATEGORIA_MAP[campo] },
            });
          }
        }
        if (formaChapa) {
          const chapaArq = formData.get("chapaRequerimento") as File | null;
          if (chapaArq && chapaArq.size > 0) {
            const salvo = await salvarArquivo(chapaArq, dir);
            await tx.arquivo.create({
              data: { ...salvo, candidaturaId: candidatura.id, categoria: "CAND_CHAPA_REQUERIMENTO" },
            });
          }
        }

        // Titular
        const titular = await tx.candidato.create({
          data: { ...titularData, tipoCandidato: "TITULAR", candidaturaId: candidatura.id },
        });
        const camposTitular = [
          "titularIdentidade", "titularTituloEleitor", "titularCpf", "titularFoto", "titularNaoImpedimento",
        ];
        for (const campo of camposTitular) {
          const arquivo = formData.get(campo) as File | null;
          if (arquivo && arquivo.size > 0) {
            const salvo = await salvarArquivo(arquivo, dir);
            await tx.arquivo.create({
              data: { ...salvo, candidatoId: titular.id, categoria: CATEGORIA_MAP[campo] },
            });
          }
        }

        // Suplente
        const suplente = await tx.candidato.create({
          data: { ...suplenteData, tipoCandidato: "SUPLENTE", candidaturaId: candidatura.id },
        });
        const camposSuplente = [
          "suplenteIdentidade", "suplenteTituloEleitor", "suplenteCpf", "suplenteFoto", "suplenteNaoImpedimento",
        ];
        for (const campo of camposSuplente) {
          const arquivo = formData.get(campo) as File | null;
          if (arquivo && arquivo.size > 0) {
            const salvo = await salvarArquivo(arquivo, dir);
            await tx.arquivo.create({
              data: { ...salvo, candidatoId: suplente.id, categoria: CATEGORIA_MAP[campo] },
            });
          }
        }

        // Candidatas são automaticamente eleitoras (Art. 3°, §3°)
        // Cria o Eleitor da organização, espelhando os dados da candidata
        const eleitorOrg = await tx.eleitor.create({
          data: { usuarioId: usuario.id },
        });

        const orgEleitora = await tx.organizacaoEleitora.create({
          data: {
            razaoSocial,
            cnpj,
            segmento,
            dataAbertura,
            sede,
            repNome: titularData.nome,
            repCpf: titularData.cpf,
            repTituloEleitor: titularData.tituloEleitor ?? null,
            repDomicilio: titularData.domicilioEleitoral ?? null,
            emailEntidade,
            telefone,
            eleitorId: eleitorOrg.id,
          },
        });

        // Requerimento de inscrição eleitora (Anexo V) — vinculado à org eleitora
        const eleitEntRequerimento = formData.get("eleitEntRequerimento") as File | null;
        if (eleitEntRequerimento && eleitEntRequerimento.size > 0) {
          const salvo = await salvarArquivo(eleitEntRequerimento, dir);
          await tx.arquivo.create({
            data: { ...salvo, orgEleitoraId: orgEleitora.id, categoria: CATEGORIA_MAP["eleitEntRequerimento"] },
          });
        }

        // Registra o titular e suplente como eleitores individuais, vinculados à org eleitora
        await tx.eleitor.create({ data: { candidatoId: titular.id, eleitorPaiId: eleitorOrg.id } });
        await tx.eleitor.create({ data: { candidatoId: suplente.id, eleitorPaiId: eleitorOrg.id } });

        // Procurador — vinculado ao eleitor da organização
        const temProcurador = formData.get("temProcurador") === "true";
        if (temProcurador) {
          const procNome = formData.get("procurador.nome") as string;
          const procCpf = cleanCPF(formData.get("procurador.cpf") as string);
          const procTituloEleitor = (formData.get("procurador.tituloEleitor") as string) || null;

          await tx.procurador.create({
            data: { nome: procNome, cpf: procCpf, tituloEleitor: procTituloEleitor, eleitorId: eleitorOrg.id },
          });

          const camposProc = ["eleitProcProcuracao"];
          for (const campo of camposProc) {
            const arquivo = formData.get(campo) as File | null;
            if (arquivo && arquivo.size > 0) {
              const salvo = await salvarArquivo(arquivo, dir);
              await tx.arquivo.create({
                data: { ...salvo, eleitorId: eleitorOrg.id, categoria: CATEGORIA_MAP[campo] },
              });
            }
          }
        }

        return { candidatura, org, usuario };
      });

      await sendEmail({
        to: emailEntidade,
        subject: "AIUSCE 2026 — Inscrição de Candidato recebida",
        html: `<p>Olá, <strong>${razaoSocial}</strong>!</p>
               <p>A inscrição de candidato da sua entidade foi recebida com sucesso e será analisada pela equipe da SMUL/SPURBANISMO.</p>
               <p><strong>CNPJ:</strong> ${cnpj}</p>
               <p><strong>Acesso ao portal</strong> — E-mail: <strong>${emailEntidade}</strong> | Senha: <strong>${senhaPlana}</strong></p>
               <p>Guarde a senha com segurança. Você poderá acompanhar o status da inscrição pelo portal.</p>`,
        text: `Inscrição de candidatura recebida. CNPJ: ${cnpj}. Email: ${emailEntidade}. Senha: ${senhaPlana}`,
      }).catch(console.error);

      return NextResponse.json({
        success: true,
        message: "Inscrição de candidatura realizada com sucesso! Verifique o e-mail cadastrado para as credenciais de acesso ao portal.",
        candidaturaId: resultado.candidatura.id,
      });
    }

    // -----------------------------------------------------------------------
    // ELEITOR
    // -----------------------------------------------------------------------
    if (tipoInscricao === "ELEITOR") {
      const cnpj = cleanCNPJ(formData.get("entidadeEleitora.cnpj") as string);
      const razaoSocial = formData.get("entidadeEleitora.razaoSocial") as string;
      const segmento = formData.get("entidadeEleitora.segmento") as Segmento;
      const dataAbertura = parseDateBR(formData.get("entidadeEleitora.dataAbertura") as string);
      const sede = formData.get("entidadeEleitora.sede") as string;
      const repNome = formData.get("entidadeEleitora.repNome") as string;
      const repCpf = cleanCPF(formData.get("entidadeEleitora.repCpf") as string);
      const repTituloEleitor = (formData.get("entidadeEleitora.repTituloEleitor") as string) || null;
      const repDomicilio = (formData.get("entidadeEleitora.repDomicilio") as string) || null;
      const emailEntidade = (formData.get("entidadeEleitora.emailEntidade") as string).toLowerCase();
      const telefone = (formData.get("entidadeEleitora.telefone") as string) || null;
      const temProcurador = formData.get("temProcurador") === "true";

      // Impedir duplicata de CNPJ
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
          data: {
            tipo: "EXTERNO",
            nome: razaoSocial,
            email: emailEntidade,
            senha: senhaHash,
            primeiroAcesso: true,
          },
        });

        const eleitor = await tx.eleitor.create({
          data: { usuarioId: usuario.id },
        });

        const org = await tx.organizacaoEleitora.create({
          data: {
            razaoSocial, cnpj, segmento, dataAbertura, sede,
            repNome, repCpf, repTituloEleitor, repDomicilio,
            emailEntidade, telefone, eleitorId: eleitor.id,
          },
        });

        const dir = join(uploadsBase, `eleitor-${eleitor.id}`);
        await garantirDiretorio(dir);

        // Arquivos da entidade eleitora
        const camposEntidade = [
          "eleitEntRequerimento", "eleitEntDeclaracaoAtuacao", "eleitEntEstatuto",
          "eleitEntAtaEleicao", "eleitEntCnpj", "eleitEntDeclaracaoIdoneidade",
        ];
        for (const campo of camposEntidade) {
          const arquivo = formData.get(campo) as File | null;
          if (arquivo && arquivo.size > 0) {
            const salvo = await salvarArquivo(arquivo, dir);
            await tx.arquivo.create({
              data: { ...salvo, orgEleitoraId: org.id, categoria: CATEGORIA_MAP[campo] },
            });
          }
        }

        // Arquivos do representante
        const camposRep = ["eleitRepIdentidade", "eleitRepTituloEleitor", "eleitRepCpf"];
        for (const campo of camposRep) {
          const arquivo = formData.get(campo) as File | null;
          if (arquivo && arquivo.size > 0) {
            const salvo = await salvarArquivo(arquivo, dir);
            await tx.arquivo.create({
              data: { ...salvo, eleitorId: eleitor.id, categoria: CATEGORIA_MAP[campo] },
            });
          }
        }

        // Procurador
        let procurador = null;
        if (temProcurador) {
          const procNome = formData.get("procurador.nome") as string;
          const procCpf = cleanCPF(formData.get("procurador.cpf") as string);
          const procTituloEleitor = (formData.get("procurador.tituloEleitor") as string) || null;
          procurador = await tx.procurador.create({
            data: { nome: procNome, cpf: procCpf, tituloEleitor: procTituloEleitor, eleitorId: eleitor.id },
          });

          const camposProc = ["eleitProcProcuracao"];
          for (const campo of camposProc) {
            const arquivo = formData.get(campo) as File | null;
            if (arquivo && arquivo.size > 0) {
              const salvo = await salvarArquivo(arquivo, dir);
              await tx.arquivo.create({
                data: { ...salvo, eleitorId: eleitor.id, categoria: CATEGORIA_MAP[campo] },
              });
            }
          }
        }

        return { eleitor, org, usuario, procurador };
      });

      await sendEmail({
        to: emailEntidade,
        subject: "AIUSCE 2026 — Inscrição de Eleitor recebida",
        html: `<p>Olá, <strong>${razaoSocial}</strong>!</p>
               <p>A inscrição de habilitação como eleitor da sua entidade foi recebida com sucesso e será analisada pela equipe da SMUL/SPURBANISMO.</p>
               <p><strong>CNPJ:</strong> ${cnpj}</p>
               <p><strong>Acesso ao portal</strong> — E-mail: <strong>${emailEntidade}</strong> | Senha: <strong>${senhaPlana}</strong></p>
               <p>Guarde a senha com segurança. Você poderá acompanhar o status da inscrição pelo portal.</p>`,
        text: `Inscrição de eleitor recebida. CNPJ: ${cnpj}. Email: ${emailEntidade}. Senha: ${senhaPlana}`,
      }).catch(console.error);

      return NextResponse.json({
        success: true,
        message: "Inscrição de eleitora realizada com sucesso! Verifique o e-mail cadastrado para as credenciais de acesso ao portal.",
        eleitorId: resultado.eleitor.id,
      });
    }

    return NextResponse.json({ error: "Tipo de inscrição inválido." }, { status: 400 });

  } catch (error) {
    console.error("[API /aiusce/inscricao]", error);

    if (error instanceof Error && "code" in error && (error as any).code === "P2002") {
      const campo = (error as any).meta?.target?.join(", ") ?? "campo";
      return NextResponse.json({ error: `Já existe um cadastro com este ${campo}.` }, { status: 400 });
    }

    const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: `Erro interno: ${mensagem}` }, { status: 500 });
  }
}
