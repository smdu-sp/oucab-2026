import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { gerarSenha, hashSenha } from "@/lib/password";
import { sendEmail, emailBoasVindas } from "@/lib/email";
import { PRAZO_INSCRICAO } from "@/lib/config";
import type { CategoriaArquivo } from "@prisma/client";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseDateBR(dateStr: string): Date {
  const [dia, mes, ano] = dateStr.split("/").map(Number);
  return new Date(ano, mes - 1, dia);
}

async function salvarArquivo(
  arquivo: File,
  dir: string,
): Promise<{ nome: string; tipo: string; tamanho: number; caminho: string }> {
  const nomeArquivo = `${Date.now()}-${Math.random().toString(36).substring(2)}-${arquivo.name}`;
  const caminho = join(dir, nomeArquivo);
  await writeFile(caminho, Buffer.from(await arquivo.arrayBuffer()));
  return { nome: arquivo.name, tipo: arquivo.type, tamanho: arquivo.size, caminho };
}

async function garantirDiretorio(dir: string): Promise<void> {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

// Mapeia nome do campo de arquivo para CategoriaArquivo do Prisma
const CATEGORIA_MAP: Record<string, CategoriaArquivo> = {
  docRequerimento: "REQUERIMENTO",
  docIdentidade: "DOCUMENTO_IDENTIDADE",
  docCPF: "CPF",
  docTituloEleitor: "TITULO_ELEITOR",
  docFoto3x4: "FOTO",
  docDeclaracao: "DECLARACAO",
  orgDocRequerimento: "REQUERIMENTO",
  orgDocDeclaracaoAtuacao: "DECLARACAO_ATUACAO",
  orgDocEstatutoSocial: "ESTATUTO_SOCIAL",
  orgDocAtaEleicao: "ATA_ELEICAO",
  orgDocCertidaoCNPJ: "CERTIDAO_CNPJ",
  orgDocComprovanteCNPJ: "CERTIDAO_CNPJ",
  titularDocRequerimento: "REQUERIMENTO",
  titularDocIdentidade: "DOCUMENTO_IDENTIDADE",
  titularDocCPF: "CPF",
  titularDocTituloEleitor: "TITULO_ELEITOR",
  titularDocComprovante: "COMPROVANTE_RESIDENCIA",
  titularDocFoto3x4: "FOTO",
  titularDocDeclaracao: "DECLARACAO",
  suplenteDocRequerimento: "REQUERIMENTO",
  suplenteDocIdentidade: "DOCUMENTO_IDENTIDADE",
  suplenteDocCPF: "CPF",
  suplenteDocTituloEleitor: "TITULO_ELEITOR",
  suplenteDocComprovante: "COMPROVANTE_RESIDENCIA",
  suplenteDocFoto3x4: "FOTO",
  suplenteDocDeclaracao: "DECLARACAO",
};

const CAMPOS_ARQUIVO_INDIVIDUAL = [
  "docRequerimento", "docIdentidade", "docCPF", "docTituloEleitor",
  "docFoto3x4", "docDeclaracao",
] as const;

const CAMPOS_ARQUIVO_COMPROVANTE = ["docComprovante"] as const;

const CAMPOS_ARQUIVO_ORG = [
  "orgDocRequerimento", "orgDocDeclaracaoAtuacao", "orgDocEstatutoSocial",
  "orgDocAtaEleicao", "orgDocCertidaoCNPJ", "orgDocComprovanteCNPJ",
] as const;

const CAMPOS_ARQUIVO_TITULAR = [
  "titularDocRequerimento", "titularDocIdentidade", "titularDocCPF",
  "titularDocTituloEleitor", "titularDocComprovante", "titularDocFoto3x4", "titularDocDeclaracao",
] as const;

const CAMPOS_ARQUIVO_SUPLENTE = [
  "suplenteDocRequerimento", "suplenteDocIdentidade", "suplenteDocCPF",
  "suplenteDocTituloEleitor", "suplenteDocComprovante", "suplenteDocFoto3x4", "suplenteDocDeclaracao",
] as const;

// ---------------------------------------------------------------------------
// Handler principal
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  if (new Date() > PRAZO_INSCRICAO) {
    return NextResponse.json({ error: "Não é possível se inscrever fora do prazo." }, { status: 400 });
  }

  try {
    const formData = await request.formData();

    const tipoCadastro = formData.get("tipoCadastro") as "ELEITOR" | "CANDIDATO";
    console.log("[API /inscricao] recebido tipoCadastro:", tipoCadastro, "tipoInscricao:", formData.get("tipoInscricao"));
    const tipoInscricao = formData.get("tipoInscricao") as
      | "MORADOR" | "TRABALHADOR" | "REP_MORADIA" | "REP_ONGS" | "REP_PROFISSIONAIS" | "REP_EMPRESARIAIS";
    const vaga = formData.get("vaga") as "TITULAR" | "SUPLENTE" | null;

    const isRep = ["REP_MORADIA", "REP_ONGS", "REP_PROFISSIONAIS", "REP_EMPRESARIAIS"].includes(tipoInscricao);
    const isRepMoradia = tipoInscricao === "REP_MORADIA";

    const areaPerimetroRaw = formData.get("endereco.areaPerimetro") as "ADESAO" | "EXPANDIDO" | null;
    const endereco = {
      logradouro: formData.get("endereco.logradouro") as string,
      numero: (formData.get("endereco.numero") as string) || undefined,
      complemento: (formData.get("endereco.complemento") as string) || undefined,
      bairro: formData.get("endereco.bairro") as string,
      cidade: formData.get("endereco.cidade") as string,
      estado: formData.get("endereco.estado") as string,
      cep: formData.get("endereco.cep") as string,
      latitude: formData.get("endereco.latitude") ? parseFloat(formData.get("endereco.latitude") as string) : undefined,
      longitude: formData.get("endereco.longitude") ? parseFloat(formData.get("endereco.longitude") as string) : undefined,
      ...(areaPerimetroRaw ? { areaPerimetro: areaPerimetroRaw } : {}),
    };

    const uploadsBase = join(process.cwd(), "uploads");
    await garantirDiretorio(uploadsBase);

    // -----------------------------------------------------------------------
    // Fluxo REP_* (organização)
    // -----------------------------------------------------------------------
    if (isRep) {
      const cnpjRaw = formData.get("organizacao.cnpj") as string;
      const cnpj = cnpjRaw.replace(/[^\d]/g, "");
      const razaoSocial = formData.get("organizacao.razaoSocial") as string;
      const emailOrg = (formData.get("organizacao.email") as string).toLowerCase();

      // Impedir duplicata por CNPJ
      const orgExistente = await db.organizacao.findUnique({ where: { cnpj } });
      if (orgExistente) {
        return NextResponse.json(
          { error: "CNPJ já cadastrado. Para atualizar a inscrição, acesse o portal com suas credenciais." },
          { status: 400 },
        );
      }

      const titular = {
        nome: formData.get("titular.nome") as string,
        nomeSocial: (formData.get("titular.nomeSocial") as string) || null,
        cpf: (formData.get("titular.cpf") as string).replace(/[^\d]/g, ""),
        dataNascimento: formData.get("titular.dataNascimento") as string,
        telefone: formData.get("titular.telefone") as string,
        genero: formData.get("titular.genero") as "MASCULINO" | "FEMININO" | "OUTRO",
        email: formData.get("titular.email") as string,
        tituloEleitor: (formData.get("titular.tituloEleitor") as string) || null,
      };

      const suplente = {
        nome: formData.get("suplente.nome") as string,
        nomeSocial: (formData.get("suplente.nomeSocial") as string) || null,
        cpf: (formData.get("suplente.cpf") as string).replace(/[^\d]/g, ""),
        dataNascimento: formData.get("suplente.dataNascimento") as string,
        telefone: formData.get("suplente.telefone") as string,
        genero: formData.get("suplente.genero") as "MASCULINO" | "FEMININO" | "OUTRO",
        email: formData.get("suplente.email") as string,
        tituloEleitor: (formData.get("suplente.tituloEleitor") as string) || null,
      };

      // Senhas para org
      const senhaPlana = gerarSenha();
      const senhaHash = await hashSenha(senhaPlana);

      const resultado = await db.$transaction(async (tx) => {
        // Usuário da organização
        const usuario = await tx.usuario.create({
          data: {
            tipo: "EXTERNO",
            nome: razaoSocial,
            email: emailOrg,
            senha: senhaHash,
            primeiroAcesso: true,
          },
        });

        // Candidatura
        const candidatura = await tx.candidatura.create({
          data: {
            tipoCadastro: "CANDIDATO",
            tipoInscricao,
            usuarioId: usuario.id,
          },
        });

        // Organização
        const org = await tx.organizacao.create({
          data: { cnpj, razaoSocial, candidaturaId: candidatura.id },
        });

        // Endereço
        await tx.endereco.create({
          data: { ...endereco, candidaturaId: candidatura.id },
        });

        // Diretório de uploads
        const orgDir = join(uploadsBase, `candidatura-${candidatura.id}`);
        await garantirDiretorio(orgDir);

        // Arquivos da organização
        for (const campo of CAMPOS_ARQUIVO_ORG) {
          const arquivo = formData.get(campo) as File | null;
          if (arquivo && arquivo.size > 0) {
            const salvo = await salvarArquivo(arquivo, orgDir);
            await tx.arquivo.create({
              data: { ...salvo, organizacaoId: org.id, categoria: CATEGORIA_MAP[campo] ?? "OUTRO" },
            });
          }
        }

        // Candidato titular
        const candidatoTitular = await tx.candidato.create({
          data: {
            nome: titular.nome,
            email: titular.email,
            telefone: titular.telefone,
            cpf: titular.cpf,
            dataNascimento: parseDateBR(titular.dataNascimento),
            genero: titular.genero,
            tipoCandidato: "TITULAR",
            candidaturaId: candidatura.id,
          },
        });

        // Eleitor titular
        await tx.eleitor.create({
          data: {
            nome: titular.nome,
            email: titular.email,
            telefone: titular.telefone,
            cpf: titular.cpf,
            dataNascimento: parseDateBR(titular.dataNascimento),
            genero: titular.genero,
            tituloEleitor: titular.tituloEleitor,
          },
        });

        // Documentos do titular
        for (const campo of CAMPOS_ARQUIVO_TITULAR) {
          const arquivo = formData.get(campo) as File | null;
          // Pular campos exclusivos do REP_MORADIA para outros tipos
          if (!isRepMoradia && (campo === "titularDocRequerimento" || campo === "titularDocComprovante")) continue;
          if (arquivo && arquivo.size > 0) {
            const salvo = await salvarArquivo(arquivo, orgDir);
            await tx.arquivo.create({
              data: { ...salvo, candidatoId: candidatoTitular.id, categoria: CATEGORIA_MAP[campo] ?? "OUTRO" },
            });
          }
        }

        // Candidato suplente
        const candidatoSuplente = await tx.candidato.create({
          data: {
            nome: suplente.nome,
            email: suplente.email,
            telefone: suplente.telefone,
            cpf: suplente.cpf,
            dataNascimento: parseDateBR(suplente.dataNascimento),
            genero: suplente.genero,
            tipoCandidato: "SUPLENTE",
            candidaturaId: candidatura.id,
          },
        });

        // Eleitor suplente
        await tx.eleitor.create({
          data: {
            nome: suplente.nome,
            email: suplente.email,
            telefone: suplente.telefone,
            cpf: suplente.cpf,
            dataNascimento: parseDateBR(suplente.dataNascimento),
            genero: suplente.genero,
            tituloEleitor: suplente.tituloEleitor,
          },
        });

        // Documentos do suplente
        for (const campo of CAMPOS_ARQUIVO_SUPLENTE) {
          const arquivo = formData.get(campo) as File | null;
          // Pular campos exclusivos do REP_MORADIA para outros tipos
          if (!isRepMoradia && (campo === "suplenteDocRequerimento" || campo === "suplenteDocComprovante")) continue;
          if (arquivo && arquivo.size > 0) {
            const salvo = await salvarArquivo(arquivo, orgDir);
            await tx.arquivo.create({
              data: { ...salvo, candidatoId: candidatoSuplente.id, categoria: CATEGORIA_MAP[campo] ?? "OUTRO" },
            });
          }
        }

        return { candidatura, org };
      });

      await sendEmail({
        to: emailOrg,
        subject: "OUCAB 2026 — Inscrição recebida",
        html: `<p>Olá, <strong>${razaoSocial}</strong>!</p>
               <p>Sua inscrição foi recebida com sucesso e será analisada pela equipe da SMUL.</p>
               <p>CNPJ: <strong>${cnpj}</strong><br>
               Acesso ao portal — E-mail: <strong>${emailOrg}</strong> | Senha: <strong>${senhaPlana}</strong></p>
               <p>Guarde a senha com segurança. Você poderá acompanhar o status da inscrição pelo portal.</p>`,
        text: `Inscrição recebida. CNPJ: ${cnpj}. Email: ${emailOrg}. Senha: ${senhaPlana}`,
      }).catch(console.error);

      return NextResponse.json({
        success: true,
        message: "Inscrição da organização realizada com sucesso! Verifique o e-mail cadastrado para as credenciais de acesso ao portal.",
        candidaturaId: resultado.candidatura.id,
      });
    }

    // -----------------------------------------------------------------------
    // Fluxo individual (MORADOR / TRABALHADOR)
    // -----------------------------------------------------------------------

    const nome = formData.get("votante.nome") as string;
    const nomeSocial = (formData.get("votante.nomeSocial") as string) || null;
    const telefone = formData.get("votante.telefone") as string;
    const genero = formData.get("votante.genero") as "MASCULINO" | "FEMININO" | "OUTRO";
    const email = (formData.get("votante.email") as string).toLowerCase();
    const cpf = (formData.get("votante.cpf") as string).replace(/[^\d]/g, "");
    const dataNascimento = formData.get("votante.dataNascimento") as string;
    const empresa = (formData.get("votante.empresa") as string) || null;
    const tituloEleitor = (formData.get("votante.tituloEleitor") as string) || null;

    // Verificar duplicata por email ou CPF
    const [existenteEmail, existenteCPF] = await Promise.all([
      db.usuario.findUnique({ where: { email } }),
      db.eleitor.findUnique({ where: { cpf } }),
    ]);

    if (existenteEmail || existenteCPF) {
      return NextResponse.json(
        { error: "Já existe um cadastro com este e-mail ou CPF. Acesse o portal para verificar sua inscrição." },
        { status: 400 },
      );
    }

    // Senha para candidatos
    let senhaPlana: string | null = null;
    let senhaHash: string | null = null;
    if (tipoCadastro === "CANDIDATO") {
      senhaPlana = gerarSenha();
      senhaHash = await hashSenha(senhaPlana);
    }

    const resultado = await db.$transaction(async (tx) => {
      // Usuário
      const usuario = await tx.usuario.create({
        data: {
          tipo: "EXTERNO",
          nome,
          email,
          ...(senhaHash ? { senha: senhaHash, primeiroAcesso: true } : {}),
        },
      });

      // Candidatura
      const candidatura = await tx.candidatura.create({
        data: {
          tipoCadastro,
          tipoInscricao,
          usuarioId: usuario.id,
        },
      });

      // Endereço
      await tx.endereco.create({
        data: { ...endereco, candidaturaId: candidatura.id },
      });

      // Eleitor (sempre criado, independente de ser ELEITOR ou CANDIDATO)
      const eleitor = await tx.eleitor.create({
        data: {
          nome,
          email,
          telefone,
          cpf,
          dataNascimento: parseDateBR(dataNascimento),
          genero,
          tituloEleitor,
          usuarioId: usuario.id,
        },
      });

      // Candidato (apenas para CANDIDATO)
      let candidato = null;
      if (tipoCadastro === "CANDIDATO") {
        candidato = await tx.candidato.create({
          data: {
            nome,
            email,
            telefone,
            cpf,
            dataNascimento: parseDateBR(dataNascimento),
            genero,
            tipoCandidato: "INDIVIDUAL",
            candidaturaId: candidatura.id,
          },
        });
      }

      // Diretório de uploads
      const dir = join(uploadsBase, `candidatura-${candidatura.id}`);
      await garantirDiretorio(dir);

      // Documentos individuais
      for (const campo of CAMPOS_ARQUIVO_INDIVIDUAL) {
        const arquivo = formData.get(campo) as File | null;
        if (arquivo && arquivo.size > 0) {
          const salvo = await salvarArquivo(arquivo, dir);
          const categoria = CATEGORIA_MAP[campo] ?? "OUTRO";
          if (candidato) {
            await tx.arquivo.create({
              data: { ...salvo, candidatoId: candidato.id, categoria },
            });
          } else {
            await tx.arquivo.create({
              data: { ...salvo, eleitorId: eleitor.id, categoria },
            });
          }
        }
      }

      // Comprovante (residência ou trabalho)
      const comprovanteArquivo = formData.get("docComprovante") as File | null;
      if (comprovanteArquivo && comprovanteArquivo.size > 0) {
        const salvo = await salvarArquivo(comprovanteArquivo, dir);
        const categoria = tipoInscricao === "TRABALHADOR" ? "COMPROVANTE_TRABALHO" : "COMPROVANTE_RESIDENCIA";
        if (candidato) {
          await tx.arquivo.create({ data: { ...salvo, candidatoId: candidato.id, categoria } });
        } else {
          await tx.arquivo.create({ data: { ...salvo, eleitorId: eleitor.id, categoria } });
        }
      }

      return { candidatura, eleitor, candidato, usuario };
    });

    if (tipoCadastro === "CANDIDATO" && senhaPlana) {
      const { html, text } = emailBoasVindas({
        nome,
        cpf,
        senha: senhaPlana,
        tipoCadastro,
      });
      await sendEmail({ to: email, subject: "OUCAB 2026 — Cadastro realizado", html, text }).catch(console.error);
    } else {
      await sendEmail({
        to: email,
        subject: "OUCAB 2026 — Cadastro de Eleitor recebido",
        html: `<p>Olá, <strong>${nome}</strong>!</p>
               <p>Seu cadastro de eleitor foi recebido e será analisado pela equipe da SMUL.</p>`,
        text: `Olá, ${nome}! Seu cadastro de eleitor foi recebido com sucesso.`,
      }).catch(console.error);
    }

    return NextResponse.json({
      success: true,
      message: tipoCadastro === "CANDIDATO"
        ? "Inscrição realizada com sucesso! Verifique seu e-mail para as credenciais de acesso ao portal."
        : "Cadastro de eleitor realizado com sucesso! Verifique seu e-mail para confirmação.",
      candidaturaId: resultado.candidatura.id,
    });

  } catch (error) {
    console.error("[API /inscricao] Erro ao processar inscrição:", error);

    if (error instanceof Error) {
      console.error("[API /inscricao] message:", error.message);
      console.error("[API /inscricao] stack:", error.stack);
    }

    if (error instanceof Error && "code" in error && (error as any).code === "P2002") {
      const campo = (error as any).meta?.target?.join(", ") ?? "CPF ou e-mail";
      return NextResponse.json(
        { error: `Já existe um cadastro com este ${campo}.` },
        { status: 400 },
      );
    }

    const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: `Erro interno do servidor: ${mensagem}` }, { status: 500 });
  }
}
