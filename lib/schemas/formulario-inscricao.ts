import { z } from "zod";

// Função para validar Título de Eleitor
function validarTituloEleitor(titulo: string): boolean {
  const t = titulo.replace(/\D/g, "");
  if (t.length !== 12) return false;

  const digits = t.split("").map(Number);
  const state = digits[8] * 10 + digits[9];

  // Estado inválido
  if (state === 0 || state > 28) return false;

  // Primeiro dígito verificador — pesos aplicados do maior para o menor (9..2)
  const weights1 = [9, 8, 7, 6, 5, 4, 3, 2];
  const sum1 = digits.slice(0, 8).reduce((acc, d, i) => acc + d * weights1[i], 0);
  const r1 = sum1 % 11;
  let d1: number;
  if (state === 1 || state === 2) {
    // SP e MG: resto 0→0, resto 1→1, senão 11-r
    d1 = r1 === 0 ? 0 : r1 === 1 ? 1 : 11 - r1;
  } else {
    d1 = r1 < 2 ? 0 : 11 - r1;
  }
  if (d1 !== digits[10]) return false;

  // Segundo dígito verificador — pesos 7,8,9 sobre os dois dígitos de estado e d1
  const sum2 = digits[8] * 7 + digits[9] * 8 + d1 * 9;
  const r2 = sum2 % 11;
  // Todos os estados: resto < 2 → 1, senão 11-r
  const d2 = r2 < 2 ? 1 : 11 - r2;
  if (d2 !== digits[11]) return false;

  return true;
}

// Função para validar CPF
function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;
  
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
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
  tipoInscricao: z.enum(["MORADOR", "TRABALHADOR", "REP_MOVIMENTOS_MORADIA"], {
    required_error: "Selecione o tipo de inscrição",
    invalid_type_error: "Tipo de inscrição inválido"
  }),
  vaga: z.enum(["TITULAR", "SUPLENTE"]).optional(),
});

// Schema para Etapa 2: Dados do Votante
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
    invalid_type_error: "Gênero inválido"
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
    .min(1, "Título de eleitor é obrigatório")
    .length(12, "Título de eleitor deve conter 12 dígitos")
    .regex(/^\d{12}$/, "Título de eleitor deve conter apenas números")
    .refine(validarTituloEleitor, "Título de eleitor inválido"),
});

// Schema para Etapa 2: Endereço
export const enderecoSchema = z.object({
  logradouro: z
    .string()
    .min(5, "Logradouro deve ter pelo menos 5 caracteres")
    .max(200, "Logradouro deve ter no máximo 200 caracteres"),
  
  numero: z
    .string()
    .optional()
    .nullable(),
  
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
  
  cep: z
    .string()
    .regex(/^\d{5}-?\d{3}$/, "CEP deve ter o formato 00000-000"),
  
  latitude: z
    .number()
    .min(-90, "Latitude inválida")
    .max(90, "Latitude inválida")
    .optional()
    .nullable(),

  longitude: z
    .number()
    .min(-180, "Longitude inválida")
    .max(180, "Longitude inválida")
    .optional()
    .nullable(),

  areaPerimetro: z
    .enum(["ADESAO", "EXPANDIDO"])
    .optional()
    .nullable(),
});

// Schema para Etapa 4: Arquivos
export const arquivosSchema = z.object({
  arquivos: z
    .array(z.instanceof(File))
    .min(1, "Selecione pelo menos um arquivo")
    .max(10, "Máximo de 10 arquivos permitidos")
    .refine((files) => {
      const tamanhoTotal = files.reduce((total, file) => total + file.size, 0);
      return tamanhoTotal <= 250 * 1024 * 1024; // 250MB
    }, "O tamanho total dos arquivos não pode exceder 250MB")
    .refine((files) => {
      const tiposPermitidos = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf',
        'application/zip', 'application/x-zip-compressed'
      ];
      return files.every(file =>
        tiposPermitidos.includes(file.type) ||
        file.name.toLowerCase().endsWith('.pdf') ||
        file.name.toLowerCase().endsWith('.zip') ||
        file.name.toLowerCase().endsWith('.jpg') ||
        file.name.toLowerCase().endsWith('.jpeg') ||
        file.name.toLowerCase().endsWith('.png') ||
        file.name.toLowerCase().endsWith('.gif') ||
        file.name.toLowerCase().endsWith('.webp')
      );
    }, "Apenas arquivos de imagem (JPG, PNG, GIF, WebP), PDF e ZIP são permitidos")
});

// Schema para Etapa 6: Declarações
export const declaracoesSchema = z.object({
  declaracaoIdentidade: z.boolean().refine(val => val === true, "Você deve aceitar esta declaração"),
  declaracaoVotacao: z.boolean().refine(val => val === true, "Você deve aceitar esta declaração"),
  declaracaoDocumento: z.boolean().refine(val => val === true, "Você deve aceitar esta declaração"),
  declaracaoAutorizacao: z.boolean().refine(val => val === true, "Você deve aceitar esta declaração"),
  declaracaoVeracidade: z.boolean().refine(val => val === true, "Você deve aceitar esta declaração"),
  declaracaoNaoCargoPublico: z.boolean().optional(),
});

// Schema completo do formulário
export const formularioInscricaoSchema = z.object({
  tipoCadastro: z.enum(["ELEITOR", "CANDIDATO"]),
  tipoInscricao: z.enum(["MORADOR", "TRABALHADOR", "REP_MOVIMENTOS_MORADIA"]),
  vaga: z.enum(["TITULAR", "SUPLENTE"]).optional(),
  votante: votanteSchema,
  endereco: enderecoSchema,
  arquivos: arquivosSchema,
  declaracoes: declaracoesSchema
}).refine((data) => {
  // Se for TRABALHADOR, empresa é obrigatória
  if (data.tipoInscricao === "TRABALHADOR") {
    return data.votante.empresa && data.votante.empresa.trim().length > 0;
  }
  return true;
}, {
  message: "Nome da empresa é obrigatório para trabalhadores",
  path: ["votante", "empresa"]
}).refine((data) => {
  // REP_MOVIMENTOS_MORADIA só pode estar no perímetro de adesão
  if (data.tipoInscricao === "REP_MOVIMENTOS_MORADIA") {
    return data.endereco.areaPerimetro === "ADESAO";
  }
  return true;
}, {
  message: "Representantes de movimentos de moradia devem ter endereço dentro do perímetro de adesão",
  path: ["endereco", "areaPerimetro"]
}).refine((data) => {
  // CANDIDATO deve ter pelo menos 18 anos
  if (data.tipoCadastro === "CANDIDATO" && data.votante?.dataNascimento) {
    const parts = data.votante.dataNascimento.split("/");
    if (parts.length === 3) {
      const [dia, mes, ano] = parts.map(Number);
      const hoje = new Date();
      let idade = hoje.getFullYear() - ano;
      if (hoje.getMonth() < mes - 1 || (hoje.getMonth() === mes - 1 && hoje.getDate() < dia)) idade--;
      return idade >= 18;
    }
  }
  return true;
}, {
  message: "Candidatos devem ter pelo menos 18 anos",
  path: ["votante", "dataNascimento"]
}).refine((data) => {
  // CANDIDATO deve selecionar vaga (titular ou suplente)
  if (data.tipoCadastro === "CANDIDATO") {
    return !!data.vaga;
  }
  return true;
}, {
  message: "Selecione a vaga pretendida (titular ou suplente)",
  path: ["vaga"]
}).refine((data) => {
  // CANDIDATO deve aceitar declaração de não cargo público
  if (data.tipoCadastro === "CANDIDATO") {
    return data.declaracoes?.declaracaoNaoCargoPublico === true;
  }
  return true;
}, {
  message: "Você deve aceitar esta declaração",
  path: ["declaracoes", "declaracaoNaoCargoPublico"]
});

// Tipos TypeScript derivados dos schemas
export type TipoCadastroFormData = z.infer<typeof tipoCadastroSchema>;
export type TipoInscricaoFormData = z.infer<typeof tipoInscricaoSchema>;
export type VotanteFormData = z.infer<typeof votanteSchema>;
export type EnderecoFormData = z.infer<typeof enderecoSchema>;
export type ArquivosFormData = z.infer<typeof arquivosSchema>;
export type DeclaracoesFormData = z.infer<typeof declaracoesSchema>;
export type FormularioInscricaoData = z.infer<typeof formularioInscricaoSchema>;

// Schemas individuais para cada etapa (para validação parcial)
export const etapaSchemas = {
  1: tipoCadastroSchema,
  2: tipoInscricaoSchema,
  3: enderecoSchema,
  4: votanteSchema,
  5: arquivosSchema,
  6: z.object({}), // Etapa de revisão não precisa de validação
  7: declaracoesSchema,
} as const;