import { z } from "zod";

function validarCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]/g, "");
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
  const calc = (str: string, len: number) => {
    let sum = 0, pos = len - 7;
    for (let i = len; i >= 1; i--) {
      sum += parseInt(str.charAt(len - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return calc(cnpj, 12) === parseInt(cnpj[12]) && calc(cnpj, 13) === parseInt(cnpj[13]);
}

function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let r = 11 - (soma % 11);
  if (r >= 10) r = 0;
  if (r !== parseInt(cpf[9])) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  r = 11 - (soma % 11);
  if (r >= 10) r = 0;
  return r === parseInt(cpf[10]);
}

function validarData(data: string): boolean {
  const [dia, mes, ano] = data.split("/").map(Number);
  if (!dia || !mes || !ano) return false;
  const d = new Date(ano, mes - 1, dia);
  return d.getFullYear() === ano && d.getMonth() === mes - 1 && d.getDate() === dia;
}

const cpfSchema = z
  .string()
  .min(1, "CPF é obrigatório")
  .refine((v) => validarCPF(v), "CPF inválido");

const cnpjSchema = z
  .string()
  .min(1, "CNPJ é obrigatório")
  .refine((v) => validarCNPJ(v), "CNPJ inválido");

const dataSchema = z
  .string()
  .min(1, "Data é obrigatória")
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/AAAA")
  .refine(validarData, "Data inválida");

const arquivoOpcional = z.instanceof(File).nullable().optional();

const segmentoAiuvl = z.enum(
  ["ONG", "ASSOCIACAO_BAIRRO", "ENTIDADE_ACADEMICA", "REP_EMPRESARIAL"],
  { required_error: "Selecione o segmento" },
);

// ---------------------------------------------------------------------------
// Sub-schemas
// ---------------------------------------------------------------------------

export const entidadeCandidataAiuvlSchema = z.object({
  razaoSocial:         z.string().min(3, "Razão social deve ter pelo menos 3 caracteres").max(200),
  cnpj:                cnpjSchema,
  segmento:            segmentoAiuvl,
  dataAbertura:        dataSchema,
  cep:                 z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido. Formato: 00000-000"),
  logradouro:          z.string().min(2, "Logradouro é obrigatório").max(200),
  numero:              z.string().min(1, "Número é obrigatório").max(20),
  complemento:         z.string().max(100).optional().or(z.literal("")),
  bairro:              z.string().min(2, "Bairro é obrigatório").max(100),
  cidade:              z.string().min(2, "Cidade é obrigatória").max(100),
  uf:                  z.string().length(2, "UF inválida"),
  repNome:             z.string().min(3, "Nome do representante deve ter pelo menos 3 caracteres").max(100),
  repCpf:              cpfSchema,
  repTituloEleitor:    z.string().max(20).optional().or(z.literal("")),
  repDomicilio:        z.string().max(200).optional().or(z.literal("")),
  emailEntidade:       z.string().email("E-mail inválido").max(100),
  confirmEmailEntidade:z.string().min(1, "Confirmação de e-mail é obrigatória"),
  telefone:            z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato: (00) 00000-0000").optional().or(z.literal("")),
});

export const entidadeEleitoraAiuvlSchema = z.object({
  razaoSocial:         z.string().min(3, "Razão social deve ter pelo menos 3 caracteres").max(200),
  cnpj:                cnpjSchema,
  segmento:            segmentoAiuvl,
  segmentoVotacao:     segmentoAiuvl.describe("Segmento em que a entidade votará"),
  dataAbertura:        dataSchema,
  cep:                 z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido. Formato: 00000-000"),
  logradouro:          z.string().min(2, "Logradouro é obrigatório").max(200),
  numero:              z.string().min(1, "Número é obrigatório").max(20),
  complemento:         z.string().max(100).optional().or(z.literal("")),
  bairro:              z.string().min(2, "Bairro é obrigatório").max(100),
  cidade:              z.string().min(2, "Cidade é obrigatória").max(100),
  uf:                  z.string().length(2, "UF inválida"),
  repNome:             z.string().min(3, "Nome do representante deve ter pelo menos 3 caracteres").max(100),
  repCpf:              cpfSchema,
  repTituloEleitor:    z.string().max(20).optional().or(z.literal("")),
  repDomicilio:        z.string().max(200).optional().or(z.literal("")),
  emailEntidade:       z.string().email("E-mail inválido").max(100),
  confirmEmailEntidade:z.string().min(1, "Confirmação de e-mail é obrigatória"),
  telefone:            z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato: (00) 00000-0000").optional().or(z.literal("")),
});

export const candidatoAiuvlSchema = z.object({
  nome:              z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  nomeSocial:        z.string().max(100).optional().or(z.literal("")),
  genero:            z.enum(["MASCULINO", "FEMININO"], { required_error: "Selecione o gênero" }),
  dataNascimento:    dataSchema.refine((data) => {
    const [dia, mes, ano] = data.split("/").map(Number);
    const hoje = new Date();
    let idade = hoje.getFullYear() - ano;
    if (hoje.getMonth() < mes - 1 || (hoje.getMonth() === mes - 1 && hoje.getDate() < dia)) idade--;
    return idade >= 18;
  }, "Candidatos devem ter pelo menos 18 anos"),
  cpf:               cpfSchema,
  tituloEleitor:     z.string().max(20).optional().or(z.literal("")),
  domicilioEleitoral:z.string().max(200).optional().or(z.literal("")),
  email:             z.string().email("E-mail inválido").max(100),
  telefone:          z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato: (00) 00000-0000").optional().or(z.literal("")),
});

// ---------------------------------------------------------------------------
// Schema principal
// ---------------------------------------------------------------------------

export const formularioAiuvlSchema = z.object({
  tipoInscricao: z.enum(["CANDIDATO", "ELEITOR"], { required_error: "Selecione o tipo de inscrição" }),

  entidadeCandidata: entidadeCandidataAiuvlSchema.partial().optional(),
  titular:           candidatoAiuvlSchema.partial().optional(),
  suplente:          candidatoAiuvlSchema.partial().optional(),

  entidadeEleitora:  entidadeEleitoraAiuvlSchema.partial().optional(),

  // Documentos — candidata (entidade)
  candEntRequerimento:         arquivoOpcional,
  candEntDeclaracaoAtuacao:    arquivoOpcional,
  candEntEstatuto:             arquivoOpcional,
  candEntAtaEleicao:           arquivoOpcional,
  candEntCnpj:                 arquivoOpcional,
  candEntDeclaracaoIdoneidade: arquivoOpcional,
  // Documentos — representante legal candidata (candidatura level)
  repIdentidade:               arquivoOpcional,
  repCpfDoc:                   arquivoOpcional,
  repTituloEleitorDoc:         arquivoOpcional,
  repComprovanteResidencia:    arquivoOpcional,
  // Documentos — titular
  titularIdentidade:           arquivoOpcional,
  titularCpfDoc:               arquivoOpcional,
  titularFoto:                 arquivoOpcional,
  titularTituloEleitor:        arquivoOpcional,
  titularResidencia:           arquivoOpcional,
  titularDeclaracao:           arquivoOpcional,
  // Documentos — suplente
  suplenteIdentidade:          arquivoOpcional,
  suplenteCpfDoc:              arquivoOpcional,
  suplenteFoto:                arquivoOpcional,
  suplenteTituloEleitor:       arquivoOpcional,
  suplenteResidencia:          arquivoOpcional,
  suplenteDeclaracao:          arquivoOpcional,
  // Documentos — eleitora (entidade)
  eleitEntRequerimento:         arquivoOpcional,
  eleitEntDeclaracaoAtuacao:    arquivoOpcional,
  eleitEntEstatuto:             arquivoOpcional,
  eleitEntAtaEleicao:           arquivoOpcional,
  eleitEntCnpj:                 arquivoOpcional,
  eleitEntDeclaracaoIdoneidade: arquivoOpcional,
  // Documentos — representante eleitora
  eleitRepIdentidade:           arquivoOpcional,
  eleitRepCpfDoc:               arquivoOpcional,
  eleitRepTituloEleitor:        arquivoOpcional,
  eleitRepResidencia:           arquivoOpcional,
}).superRefine((data, ctx) => {
  if (data.tipoInscricao === "CANDIDATO") {
    const ec = entidadeCandidataAiuvlSchema.safeParse(data.entidadeCandidata);
    if (!ec.success) {
      for (const issue of ec.error.issues) {
        ctx.addIssue({ ...issue, path: ["entidadeCandidata", ...issue.path] });
      }
    }
    // Email confirmation check
    if (
      data.entidadeCandidata?.emailEntidade &&
      data.entidadeCandidata?.confirmEmailEntidade &&
      data.entidadeCandidata.emailEntidade !== data.entidadeCandidata.confirmEmailEntidade
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Os e-mails não coincidem",
        path: ["entidadeCandidata", "confirmEmailEntidade"],
      });
    }
    const tit = candidatoAiuvlSchema.safeParse(data.titular);
    if (!tit.success) {
      for (const issue of tit.error.issues) {
        ctx.addIssue({ ...issue, path: ["titular", ...issue.path] });
      }
    }
    const sup = candidatoAiuvlSchema.safeParse(data.suplente);
    if (!sup.success) {
      for (const issue of sup.error.issues) {
        ctx.addIssue({ ...issue, path: ["suplente", ...issue.path] });
      }
    }
    const titularGenero = data.titular?.genero;
    const suplenteGenero = data.suplente?.genero;
    if (titularGenero && suplenteGenero && titularGenero !== "FEMININO" && suplenteGenero !== "FEMININO") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Paridade de gênero: ao menos um candidato (titular ou suplente) deve ser do gênero feminino",
        path: ["suplente", "genero"],
      });
    }
  }
  if (data.tipoInscricao === "ELEITOR") {
    const ee = entidadeEleitoraAiuvlSchema.safeParse(data.entidadeEleitora);
    if (!ee.success) {
      for (const issue of ee.error.issues) {
        ctx.addIssue({ ...issue, path: ["entidadeEleitora", ...issue.path] });
      }
    }
    if (
      data.entidadeEleitora?.emailEntidade &&
      data.entidadeEleitora?.confirmEmailEntidade &&
      data.entidadeEleitora.emailEntidade !== data.entidadeEleitora.confirmEmailEntidade
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Os e-mails não coincidem",
        path: ["entidadeEleitora", "confirmEmailEntidade"],
      });
    }
  }
});

export type EntidadeCandidataAiuvlData = z.infer<typeof entidadeCandidataAiuvlSchema>;
export type EntidadeEleitoraAiuvlData = z.infer<typeof entidadeEleitoraAiuvlSchema>;
export type CandidatoAiuvlData = z.infer<typeof candidatoAiuvlSchema>;
export type FormularioAiuvlData = z.infer<typeof formularioAiuvlSchema>;
