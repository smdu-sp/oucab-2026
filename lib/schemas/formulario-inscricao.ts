import { z } from "zod";

// Função para validar CNPJ
function validarCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]/g, '');
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  const calcDigit = (str: string, len: number) => {
    let sum = 0, pos = len - 7;
    for (let i = len; i >= 1; i--) {
      sum += parseInt(str.charAt(len - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  if (calcDigit(cnpj, 12) !== parseInt(cnpj.charAt(12))) return false;
  if (calcDigit(cnpj, 13) !== parseInt(cnpj.charAt(13))) return false;
  return true;
}

// Função para validar CPF
function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;
  return true;
}

// Schema para Etapa 1: Tipo de Cadastro
export const tipoCadastroSchema = z.object({
  tipoCadastro: z.enum(["ELEITOR", "CANDIDATO"], {
    required_error: "Selecione o tipo de cadastro",
    invalid_type_error: "Tipo de cadastro inválido",
  }),
});

// Schema para Etapa 2: Tipo de Inscrição
export const tipoInscricaoSchema = z.object({
  tipoInscricao: z.enum(["MORADOR", "TRABALHADOR", "REP_MORADIA", "REP_ONGS", "REP_PROFISSIONAIS", "REP_EMPRESARIAIS"], {
    required_error: "Selecione o tipo de inscrição",
    invalid_type_error: "Tipo de inscrição inválido",
  }),
});

// Schema para dados pessoais (individual — eleitor ou candidato)
export const votanteSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),
  nomeSocial: z
    .string()
    .max(100, "Nome social deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]*$/, "Nome social deve conter apenas letras e espaços")
    .optional()
    .or(z.literal("")),
  telefone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone deve ter o formato (00) 00000-0000"),
  genero: z.enum(["MASCULINO", "FEMININO", "OUTRO"], {
    required_error: "Selecione o gênero",
    invalid_type_error: "Gênero inválido",
  }),
  email: z
    .string()
    .email("Email inválido")
    .max(100, "Email deve ter no máximo 100 caracteres"),
  cpf: z
    .string()
    .min(11, "CPF deve ter 11 dígitos")
    .max(14, "CPF inválido")
    .refine((cpf) => validarCPF(cpf), "CPF inválido"),
  dataNascimento: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/AAAA")
    .refine((data) => {
      const [dia, mes, ano] = data.split("/").map(Number);
      const date = new Date(ano, mes - 1, dia);
      if (date.getFullYear() !== ano || date.getMonth() !== mes - 1 || date.getDate() !== dia) return false;
      const hoje = new Date();
      let idade = hoje.getFullYear() - ano;
      if (hoje.getMonth() < mes - 1 || (hoje.getMonth() === mes - 1 && hoje.getDate() < dia)) idade--;
      return idade >= 16 && idade <= 120;
    }, "Você deve ter pelo menos 16 anos para se inscrever"),
  empresa: z
    .string()
    .max(200, "Nome da empresa deve ter no máximo 200 caracteres")
    .optional(),
  tituloEleitor: z
    .string({ required_error: "Título de eleitor é obrigatório" })
    .min(1, "Título de eleitor é obrigatório"),
});

// Schema para organização (REP_*)
export const organizacaoSchema = z.object({
  cnpj: z
    .string()
    .min(1, "CNPJ é obrigatório")
    .refine((v) => v.replace(/[^\d]/g, "").length === 14, "CNPJ deve conter 14 dígitos")
    .refine(validarCNPJ, "CNPJ inválido"),
  razaoSocial: z
    .string()
    .min(3, "Razão social deve ter pelo menos 3 caracteres")
    .max(200, "Razão social deve ter no máximo 200 caracteres"),
  email: z
    .string()
    .email("E-mail inválido")
    .max(100, "E-mail deve ter no máximo 100 caracteres"),
  formaChapa: z.boolean().optional(),
  chapaRazaoSocial: z
    .string()
    .max(200, "Razão social deve ter no máximo 200 caracteres")
    .optional()
    .or(z.literal("")),
  chapaCNPJ: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => !v || v.replace(/[^\d]/g, "").length === 14,
      "CNPJ da segunda entidade deve conter 14 dígitos",
    )
    .refine(
      (v) => !v || validarCNPJ(v),
      "CNPJ da segunda entidade inválido",
    ),
});

// Schema para candidatos PF indicados por organização (titular ou suplente)
export const candidatoPJSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),
  nomeSocial: z
    .string()
    .max(100)
    .regex(/^[a-zA-ZÀ-ÿ\s]*$/)
    .optional()
    .or(z.literal("")),
  cpf: z
    .string()
    .min(11, "CPF deve ter 11 dígitos")
    .max(14, "CPF inválido")
    .refine((cpf) => validarCPF(cpf), "CPF inválido"),
  dataNascimento: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/AAAA")
    .refine((data) => {
      const [dia, mes, ano] = data.split("/").map(Number);
      const date = new Date(ano, mes - 1, dia);
      if (date.getFullYear() !== ano || date.getMonth() !== mes - 1 || date.getDate() !== dia) return false;
      const hoje = new Date();
      let idade = hoje.getFullYear() - ano;
      if (hoje.getMonth() < mes - 1 || (hoje.getMonth() === mes - 1 && hoje.getDate() < dia)) idade--;
      return idade >= 18 && idade <= 120;
    }, "Candidatos devem ter pelo menos 18 anos"),
  telefone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone deve ter o formato (00) 00000-0000"),
  genero: z.enum(["MASCULINO", "FEMININO", "OUTRO"], {
    required_error: "Selecione o gênero",
    invalid_type_error: "Gênero inválido",
  }),
  email: z
    .string()
    .email("E-mail inválido")
    .max(100, "E-mail deve ter no máximo 100 caracteres"),
  tituloEleitor: z
    .string()
    .optional()
    .or(z.literal("")),
});

// Schema para endereço
export const enderecoSchema = z.object({
  logradouro: z
    .string()
    .min(5, "Logradouro deve ter pelo menos 5 caracteres")
    .max(200, "Logradouro deve ter no máximo 200 caracteres"),
  numero: z.string().optional().nullable(),
  complemento: z
    .string()
    .max(100, "Complemento deve ter no máximo 100 caracteres")
    .optional()
    .nullable(),
  bairro: z
    .string()
    .min(2, "Bairro deve ter pelo menos 2 caracteres")
    .max(100, "Bairro deve ter no máximo 100 caracteres"),
  cidade: z
    .string()
    .min(2, "Cidade deve ter pelo menos 2 caracteres")
    .max(100, "Cidade deve ter no máximo 100 caracteres"),
  estado: z
    .string()
    .length(2, "Estado deve ter 2 caracteres")
    .regex(/^[A-Z]{2}$/, "Estado deve ser uma sigla válida (ex: SP)"),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, "CEP deve ter o formato 00000-000"),
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
  areaPerimetro: z.enum(["ADESAO", "EXPANDIDO"]).optional().nullable(),
});


// Todos os campos de arquivo são sempre opcionais no schema base —
// a obrigatoriedade é controlada pela navegação entre etapas no formulário.
const arquivoOpcional = z.instanceof(File).nullable().optional();

const TIPOS_REP = ["REP_MORADIA", "REP_ONGS", "REP_PROFISSIONAIS", "REP_EMPRESARIAIS"] as const;

// Schema completo do formulário — validação condicional via superRefine
export const formularioInscricaoSchema = z
  .object({
    tipoCadastro: z.enum(["ELEITOR", "CANDIDATO"]),
    tipoInscricao: z.enum(["MORADOR", "TRABALHADOR", "REP_MORADIA", "REP_ONGS", "REP_PROFISSIONAIS", "REP_EMPRESARIAIS"]),

    // Dados pessoais (individual) — validados só quando não é REP_*
    votante: votanteSchema.optional(),

    // Dados da organização — validados só quando é REP_*
    organizacao: organizacaoSchema.optional(),
    titular: candidatoPJSchema.optional(),
    suplente: candidatoPJSchema.optional(),

    endereco: enderecoSchema,
    enderecoChapa: enderecoSchema.optional(),

    // Arquivos — todos opcionais no schema; obrigatoriedade gerida pelas etapas
    docRequerimento: arquivoOpcional,
    docIdentidade: arquivoOpcional,
    docCPF: arquivoOpcional,
    docTituloEleitor: arquivoOpcional,
    docComprovante: arquivoOpcional,
    docFoto3x4: arquivoOpcional,
    docDeclaracao: arquivoOpcional,
    orgDocRequerimento: arquivoOpcional,
    orgDocDeclaracaoAtuacao: arquivoOpcional,
    orgDocEstatutoSocial: arquivoOpcional,
    orgDocAtaEleicao: arquivoOpcional,
    orgDocCertidaoCNPJ: arquivoOpcional,
    orgDocComprovanteCNPJ: arquivoOpcional,
    titularDocRequerimento: arquivoOpcional,
    titularDocIdentidade: arquivoOpcional,
    titularDocCPF: arquivoOpcional,
    titularDocTituloEleitor: arquivoOpcional,
    titularDocComprovante: arquivoOpcional,
    titularDocFoto3x4: arquivoOpcional,
    titularDocDeclaracao: arquivoOpcional,
    suplenteDocRequerimento: arquivoOpcional,
    suplenteDocIdentidade: arquivoOpcional,
    suplenteDocCPF: arquivoOpcional,
    suplenteDocTituloEleitor: arquivoOpcional,
    suplenteDocComprovante: arquivoOpcional,
    suplenteDocFoto3x4: arquivoOpcional,
    suplenteDocDeclaracao: arquivoOpcional,
    // Anexos opcionais exclusivos de REP_ONGS / REP_PROFISSIONAIS / REP_EMPRESARIAIS
    orgDocAnexoV: arquivoOpcional,
    orgDocAnexoVI: arquivoOpcional,
    orgDocAnexoVII: arquivoOpcional,
    // Documentos obrigatórios da segunda entidade (apenas quando formaChapa = true)
    chapa2DocDeclaracaoAtuacao: arquivoOpcional,
    chapa2DocEstatutoSocial: arquivoOpcional,
    chapa2DocAtaEleicao: arquivoOpcional,
    chapa2DocCertidaoCNPJ: arquivoOpcional,
    chapa2DocAnexoV: arquivoOpcional,
  })
  .superRefine((data, ctx) => {
    const isRep = (TIPOS_REP as readonly string[]).includes(data.tipoInscricao);
    const isIndividual = !isRep;

    // --- Validações para fluxo individual (MORADOR / TRABALHADOR) ---
    if (isIndividual) {
      if (!data.votante?.nome) ctx.addIssue({ code: "custom", path: ["votante", "nome"], message: "Nome é obrigatório" });
      if (!data.votante?.email) ctx.addIssue({ code: "custom", path: ["votante", "email"], message: "E-mail é obrigatório" });
      if (!data.votante?.cpf) ctx.addIssue({ code: "custom", path: ["votante", "cpf"], message: "CPF é obrigatório" });
      if (!data.votante?.telefone) ctx.addIssue({ code: "custom", path: ["votante", "telefone"], message: "Telefone é obrigatório" });
      if (!data.votante?.dataNascimento) ctx.addIssue({ code: "custom", path: ["votante", "dataNascimento"], message: "Data de nascimento é obrigatória" });
      if (!data.votante?.genero) ctx.addIssue({ code: "custom", path: ["votante", "genero"], message: "Gênero é obrigatório" });
      if (data.tipoCadastro === "CANDIDATO" && !data.votante?.tituloEleitor) {
        ctx.addIssue({ code: "custom", path: ["votante", "tituloEleitor"], message: "Título de eleitor é obrigatório para candidatos" });
      }
      if (data.tipoInscricao === "TRABALHADOR" && !data.votante?.empresa) {
        ctx.addIssue({ code: "custom", path: ["votante", "empresa"], message: "Nome da empresa é obrigatório para trabalhadores" });
      }
    }

    // --- Validações para fluxo REP_* ---
    if (isRep) {
      if (!data.organizacao?.cnpj) ctx.addIssue({ code: "custom", path: ["organizacao", "cnpj"], message: "CNPJ é obrigatório" });
      if (!data.organizacao?.razaoSocial) ctx.addIssue({ code: "custom", path: ["organizacao", "razaoSocial"], message: "Razão social é obrigatória" });
      if (!data.organizacao?.email) ctx.addIssue({ code: "custom", path: ["organizacao", "email"], message: "E-mail da organização é obrigatório" });
      if (!data.titular?.nome) ctx.addIssue({ code: "custom", path: ["titular", "nome"], message: "Nome do titular é obrigatório" });
      if (!data.titular?.cpf) ctx.addIssue({ code: "custom", path: ["titular", "cpf"], message: "CPF do titular é obrigatório" });
      if (!data.titular?.email) ctx.addIssue({ code: "custom", path: ["titular", "email"], message: "E-mail do titular é obrigatório" });
      if (!data.suplente?.nome) ctx.addIssue({ code: "custom", path: ["suplente", "nome"], message: "Nome do suplente é obrigatório" });
      if (!data.suplente?.cpf) ctx.addIssue({ code: "custom", path: ["suplente", "cpf"], message: "CPF do suplente é obrigatório" });
      if (!data.suplente?.email) ctx.addIssue({ code: "custom", path: ["suplente", "email"], message: "E-mail do suplente é obrigatório" });
    }

  });

// Tipos TypeScript derivados dos schemas
export type TipoCadastroFormData = z.infer<typeof tipoCadastroSchema>;
export type TipoInscricaoFormData = z.infer<typeof tipoInscricaoSchema>;
export type VotanteFormData = z.infer<typeof votanteSchema>;
export type EnderecoFormData = z.infer<typeof enderecoSchema>;
export type OrganizacaoFormData = z.infer<typeof organizacaoSchema>;
export type CandidatoPJFormData = z.infer<typeof candidatoPJSchema>;
export type FormularioInscricaoData = z.infer<typeof formularioInscricaoSchema>;
