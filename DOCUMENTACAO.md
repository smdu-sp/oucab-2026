# OUCAB-2026 — Documentação Técnica Detalhada

---

## Visão Geral

Sistema web para gestão de cadastros de votantes da **Operação Urbana Consorciada Água Branca** (Prefeitura de São Paulo). Possui três áreas distintas: uma **pública** (inscrição e consulta), uma **administrativa** (análise e gestão) e um **portal do inscrito** (área restrita para Candidatos gerenciarem seus documentos).

**Stack:** Next.js 15 · TypeScript · MySQL + Prisma · NextAuth.js · Tailwind CSS · Shadcn/ui

---

## Índice

1. [Área Pública](#1-área-pública)
   - [1.1 Formulário de Inscrição](#11-formulário-de-inscrição)
   - [1.2 Consulta de Cadastro](#12-consulta-de-cadastro)
   - [1.3 Página de Agradecimento](#13-página-de-agradecimento)
2. [Portal do Inscrito](#2-portal-do-inscrito)
   - [2.1 Login](#21-login)
   - [2.2 Minha Inscrição](#22-minha-inscrição)
   - [2.3 Meus Arquivos](#23-meus-arquivos)
   - [2.4 Alterar Senha](#24-alterar-senha)
3. [Área Administrativa](#3-área-administrativa)
   - [3.1 Listagem de Eleitores](#31-listagem-de-eleitores)
   - [3.2 Detalhe do Votante](#32-detalhe-do-votante)
   - [3.3 Gestão de Usuários](#33-gestão-de-usuários)
   - [3.4 Perfil do Usuário](#34-perfil-do-usuário)
4. [API Endpoints](#4-api-endpoints)
5. [Autenticação e Autorização](#5-autenticação-e-autorização)
6. [Banco de Dados](#6-banco-de-dados)
7. [Serviços e Utilitários](#7-serviços-e-utilitários)
8. [Integrações Externas](#8-integrações-externas)
9. [Regras de Negócio](#9-regras-de-negócio)
10. [Arquivos de Perímetro](#10-arquivos-de-perímetro)

---

## 1. Área Pública

### 1.1 Formulário de Inscrição

**Rota:** `/inscricao`
**Arquivos principais:**
- `app/(rotas-livres)/inscricao/page.tsx` — wrapper com verificação de prazo
- `app/(rotas-livres)/inscricao/_components/formulario-inscricao.tsx` — orquestrador do formulário multi-etapa

O formulário é dividido em **7 etapas sequenciais**, validadas individualmente com Zod + React Hook Form. O cidadão só avança quando a etapa atual está válida.

---

#### Etapa 1 — Tipo de Cadastro *(novo)*

**Arquivo:** `app/(rotas-livres)/inscricao/_components/etapas/etapa-tipo-cadastro.tsx`

| Campo | Tipo | Valores | Obrigatório |
|-------|------|---------|-------------|
| `tipoCadastro` | Radio (cards visuais) | `ELEITOR` / `CANDIDATO` | Sim |

**Comportamento:**
- Visual diferenciado: azul para ELEITOR (ícone UserCheck), roxo para CANDIDATO (ícone Award)
- Nota de rodapé: Candidatos receberão login e senha por e-mail após o cadastro

---

#### Etapa 2 — Tipo de Inscrição

**Arquivo:** `app/(rotas-livres)/inscricao/_components/etapas/etapa-tipo-inscricao.tsx`

| Campo | Tipo | Valores | Obrigatório |
|-------|------|---------|-------------|
| `tipoInscricao` | Radio (cards visuais) | `MORADOR` / `TRABALHADOR` | Sim |

**Comportamento:**
- Ao selecionar `MORADOR`, o campo `empresa` é limpo automaticamente
- Visual diferenciado: azul para MORADOR (ícone de casa), verde para TRABALHADOR (ícone de prédio)

---

#### Etapa 3 — Endereço

**Arquivo:** `app/(rotas-livres)/inscricao/_components/etapas/etapa-endereco.tsx`

| Campo | Tipo | Validação |
|-------|------|-----------|
| `cep` | Text (máscara `00000-000`) | Regex `^\d{5}-?\d{3}$` |
| `logradouro` | Text | 5–200 caracteres |
| `numero` | Text | Opcional |
| `complemento` | Text | Opcional, máx. 100 chars |
| `bairro` | Text | 2–100 caracteres |
| `cidade` | Text | 2–100 caracteres |
| `estado` | Text | 2 letras maiúsculas |
| `latitude` | Hidden | -90 a 90 |
| `longitude` | Hidden | -180 a 180 |

**Fluxo de busca de endereço:**
1. Usuário digita o CEP e clica em "Buscar"
2. Chamada para a API ViaCEP → preenchimento automático dos campos
3. Chamada para a API Nominatim → geocodificação do endereço
4. `GET /api/validacao/perimetro?lat=&lng=` → verifica se as coordenadas estão dentro do **perímetro de adesão** ou do **perímetro expandido** da OUCAB
5. Se fora das áreas: campos limpos + toast de erro
6. Se dentro de qualquer área: toast de sucesso, coordenadas salvas

**Mapa Interativo** (`mapa-endereco-simples.tsx`):
- Tecnologia: **OpenLayers** com base OSM
- Duas camadas KMZ carregadas via `/api/shapes/`:
  - `perimetro_adesao` — preenchimento roxo (`rgba(128, 71, 155, 0.35)`) com borda roxa
  - `perimetro_expandido` — preenchimento azul (`rgba(59, 130, 246, 0.2)`) com borda azul
- Legenda visual no canto inferior esquerdo do mapa
- Clique no mapa → validação de perímetro (async) → geocodificação reversa se válido
- Feedback de status no canto superior esquerdo (✓ Dentro / ✗ Fora)
- Controles de zoom customizados

---

#### Etapa 4 — Dados Pessoais

**Arquivo:** `app/(rotas-livres)/inscricao/_components/etapas/etapa-dados-votante.tsx`

| Campo | Tipo | Validação |
|-------|------|-----------|
| `nome` | Text | 2–100 chars, letras + espaços + acentos |
| `nomeSocial` | Text | Opcional, máx. 100 chars |
| `telefone` | Text (máscara) | Formato `(XX) XXXXX-XXXX` ou `(XX) XXXX-XXXX` |
| `genero` | Select | `MASCULINO` / `FEMININO` / `OUTRO` |
| `email` | Email | Válido, máx. 100 chars |
| `cpf` | Text (máscara `000.000.000-00`) | Algoritmo de validação + unicidade |
| `dataNascimento` | Date | Idade entre 16 e 120 anos |
| `empresa` | Text | Obrigatório se TRABALHADOR, máx. 200 chars |

**Validações em tempo real:**

- **CPF** (debounce 500ms):
  1. Validação do algoritmo (dígitos verificadores)
  2. `GET /api/validacao/cpf/{cpf}` → verifica se já existe registro com status `DEFERIDO` ou `EM_ANALISE`
  3. Feedback visual: ✅ verde (disponível) / ⚠ vermelho (já cadastrado)

- **E-mail** (on blur):
  1. Validação de formato
  2. `GET /api/validacao/email/{email}` → verifica unicidade
  3. CPFs com status `INDEFERIDO` **não** são considerados duplicatas (permite reenvio)

---

#### Etapa 5 — Documentos

**Arquivo:** `app/(rotas-livres)/inscricao/_components/etapas/etapa-arquivo.tsx`

| Restrição | Valor |
|-----------|-------|
| Tipos aceitos | JPG, PNG, GIF, WebP, ZIP |
| Máximo de arquivos | 5 |
| Tamanho total máximo | 30 MB |

**Componente `DragDropInput`:** suporta arrastar-e-soltar ou clique para selecionar. Link para o Edital (PDF) explicitando quais documentos são necessários por tipo de inscrição.

---

#### Etapa 6 — Revisão de Dados

**Arquivo:** `app/(rotas-livres)/inscricao/_components/etapas/etapa-revisao-dados.tsx`

Exibição somente-leitura de todos os dados inseridos:
- Dados pessoais (com CPF e data formatados)
- Endereço completo
- Lista de arquivos com tamanhos (formato MB)
- Badge indicando `MORADOR` ou `TRABALHADOR`
- Aviso de imutabilidade após aceite das declarações

Esta etapa **não possui validação** — sempre permite avançar.

---

#### Etapa 7 — Declarações

**Arquivo:** `app/(rotas-livres)/inscricao/_components/etapas/etapa-declaracoes.tsx`

Cinco declarações obrigatórias (todas devem ser aceitas):

| # | Declaração | Conteúdo |
|---|-----------|---------|
| 1 | Identidade e Participação | Texto dinâmico com dados do formulário + referências ao Decreto 63.840/2024 e Lei 18.079/2024 |
| 2 | Processo de Votação | Cada votante pode votar em 1 rep. morador e 1 rep. trabalhador |
| 3 | Apresentação de Documento | Votação exige documento de identidade original com foto |
| 4 | Autorização de Imagem | Autoriza uso de imagem nos materiais eleitorais |
| 5 | Veracidade das Informações | Responsabilidade civil/criminal conforme Lei 7.115/1983 e CP art. 299 |

**Submissão do formulário:**
1. Dados convertidos em `FormData` (incluindo arquivos e `tipoCadastro`)
2. `POST /api/inscricao` com `multipart/form-data`
3. Sucesso → redirect para `/agradecimento`
4. Se `tipoCadastro === "CANDIDATO"`: sistema gera senha automática, faz hash e envia e-mail de boas-vindas com credenciais
5. Erro/duplicata → toast com mensagem

---

### 1.2 Consulta de Cadastro

**Rota:** `/consulta-cadastro`
**Arquivo:** `app/(rotas-livres)/consulta-cadastro/page.tsx`
**Acesso:** Público, sem autenticação

Permite que o cidadão consulte o status da sua inscrição informando apenas o CPF.

**Fluxo:**
1. Digita CPF (com máscara automática `000.000.000-00`)
2. Clique em "Consultar"
3. Validação local (formato + algoritmo)
4. `GET /api/consulta-cadastro/{cpf}`
5. Exibe resultado

**Respostas possíveis:**

| Status | Badge | Cor |
|--------|-------|-----|
| `EM_ANALISE` | "Em análise" | Amarelo |
| `DEFERIDO` | "Deferido" | Verde |
| `INDEFERIDO` | "Indeferido" | Vermelho |
| Não encontrado | "Não encontrado" | Cinza |

**Erros tratados:**
- CPF inválido → "CPF inválido. Verifique e tente novamente."
- Falha na API → "Erro ao consultar. Tente novamente em instantes."

---

### 1.3 Página de Agradecimento

**Rota:** `/agradecimento`
**Arquivo:** `app/(rotas-livres)/agradecimento/page.tsx`

Exibida após inscrição bem-sucedida.

- Ícone `CheckCircle` com tema verde
- Mensagem de confirmação + próximos passos
- Botão "Voltar ao Início"
- **Auto-redirecionamento para `/` após 30 segundos** (via `useEffect`)

---

---

## 2. Portal do Inscrito

Área restrita exclusiva para **Candidatos** (tipo de cadastro `CANDIDATO`). Permite visualizar os dados da inscrição e gerenciar os arquivos enviados até o prazo limite.

**Layout:** `app/(portal)/layout.tsx`
- Verifica sessão com `auth()` — redireciona para `/portal/login` se não for `votante`
- Header com branding OUCAB, nome do usuário e botão de logout
- Navegação: Minha Inscrição · Meus Arquivos · Alterar Senha

**Middleware de proteção:** `middleware.ts`
- Todas as rotas `/portal/*` (exceto `/portal/login`) exigem sessão do tipo `votante`
- Se `primeiroAcesso === true` e o usuário não está em `/portal/alterar-senha`, redireciona para lá automaticamente

---

### 2.1 Login

**Rota:** `/portal/login`
**Arquivo:** `app/(rotas-livres)/portal/login/page.tsx`

Formulário de autenticação com CPF (com máscara) e senha.

**Fluxo:**
1. Usuário informa CPF e senha
2. `signIn("votante", { cpf, senha })` via NextAuth
3. Sucesso → redirect para `/portal/minha-inscricao`
4. Falha → toast com mensagem de erro
5. Link para `/inscricao` para quem ainda não tem cadastro

---

### 2.2 Minha Inscrição

**Rota:** `/portal/minha-inscricao`
**Arquivo:** `app/(portal)/minha-inscricao/page.tsx`

Componente servidor que exibe um resumo completo da inscrição.

**Informações exibidas:**
- Badges de tipo: `CANDIDATO/ELEITOR` · `MORADOR/TRABALHADOR` · status `EM_ANALISE/DEFERIDO/INDEFERIDO`
- Data de inscrição (formatada com `date-fns`)
- Card de Dados Pessoais: nome, nome social, CPF (formatado), data de nascimento, gênero, e-mail, telefone, empresa
- Card de Endereço: logradouro, complemento, bairro, cidade/UF, CEP
- Card de Documentos: lista com nome e tamanho (MB) de cada arquivo enviado

---

### 2.3 Meus Arquivos

**Rota:** `/portal/meus-arquivos`
**Arquivo:** `app/(portal)/meus-arquivos/page.tsx`

Componente cliente para gerenciamento dos documentos enviados.

**Alertas condicionais:**
- Prazo encerrado (`> 30/11/2025`): alerta destrutivo, sem possibilidade de alteração
- Inscrição `DEFERIDO`: alerta informativo, bloqueio de alteração

**Fluxo de atualização:**
1. Usuário seleciona novos arquivos via `DragDropInput`
2. Clique em "Salvar Novos Arquivos"
3. `PUT /api/portal/arquivos` — substitui **todos** os arquivos anteriores
4. Lista de arquivos atuais é atualizada na tela

---

### 2.4 Alterar Senha

**Rota:** `/portal/alterar-senha`
**Arquivo:** `app/(portal)/alterar-senha/page.tsx`

**Detecção de primeiro acesso:** usa `useSession()` para verificar `primeiroAcesso`. Se `true`, exibe alerta pedindo ao usuário para criar uma nova senha antes de continuar.

**Campos:**
- Senha Atual (verificada contra hash no banco)
- Nova Senha (mínimo 8 caracteres)
- Confirmar Nova Senha

**Fluxo:**
1. `POST /api/portal/alterar-senha`
2. Sucesso → `update({ primeiroAcesso: false })` na sessão + redirect para Minha Inscrição

---

## 3. Área Administrativa

Todas as rotas abaixo exigem sessão autenticada (gerenciada pelo NextAuth). Usuários sem sessão são redirecionados para `/login`.

---

### 3.1 Listagem de Eleitores

**Rota:** `/eleitores`
**Arquivos:**
- `app/(rotas-auth)/eleitores/page.tsx`
- `app/(rotas-auth)/eleitores/_components/columns.tsx`

Tabela paginada com todos os votantes cadastrados.

**Colunas da tabela:**

| Coluna | Conteúdo |
|--------|----------|
| Ações | Botão (olho) → link para detalhe do votante |
| Inscrito em | Data formatada `DD/MM/YYYY` |
| Tipo / Status | Badges `MORADOR/TRABALHADOR` + `EM_ANALISE/DEFERIDO/INDEFERIDO` |
| Nome | Nome completo |
| E-mail | Endereço de e-mail |
| Dt. Nascimento | `DD/MM/YYYY (XX anos)` |
| Endereço | `logradouro, numero - bairro` |
| Arquivos | Badge com contagem de documentos enviados |

**Filtros disponíveis:**
- **Busca:** texto livre por nome ou e-mail
- **Status:** dropdown (Em análise / Deferido / Indeferido)

**Paginação:** componente `Pagination` — atualiza parâmetros de URL (`?page=&limit=`)

**Exportação:**
- Botão "Exportar DEFERIDOS (.txt)"
- `GET /api/votantes/export`
- Gera arquivo `deferidos.txt` com formato pipe-delimited:
  ```
  IDENTIFICACAO|NOME|DATA_NASCIMENTO|CPF
  00000000000|João Silva|1985-06-15|00000000000
  ```

---

### 3.2 Detalhe do Votante

**Rota:** `/eleitores/[id]`
**Arquivos:**
- `app/(rotas-auth)/eleitores/[id]/page.tsx` — componente servidor (exibição)
- `app/(rotas-auth)/eleitores/[id]/status-actions.tsx` — componente cliente (ações)

**Dados exibidos:**

**Card — Dados Pessoais:**
- Nome, Nome Social, CPF (formatado), Data de Nascimento, Gênero, E-mail, Telefone, Empresa (se TRABALHADOR)

**Card — Endereço:**
- Logradouro, Número, Complemento, Bairro, Cidade, Estado, CEP (formatado)

**Card — Documentos:**
- Lista com: ícone, nome do arquivo, tamanho (MB), tipo MIME
- Botão "Baixar" → `GET /api/arquivos/{id}`

**Ações de Status** (`status-actions.tsx`):
- Botão **"Deferir cadastro"** → `PUT /api/votantes/{id}/status` com `{ status: "DEFERIDO" }`
- Botão **"Indeferir cadastro"** → `PUT /api/votantes/{id}/status` com `{ status: "INDEFERIDO" }`
- Estado de carregamento: "Deferindo..." / "Indeferindo..."
- Botões desabilitados durante a chamada API
- Toast de sucesso ou erro
- `router.refresh()` ao finalizar para atualizar os dados da página

---

### 3.3 Gestão de Usuários

**Rota:** `/usuarios` (apenas ADM/DEV)
**Arquivos:**
- `app/(rotas-auth)/(rotas-adm)/usuarios/page.tsx`
- `app/(rotas-auth)/(rotas-adm)/usuarios/_components/columns.tsx`
- `app/(rotas-auth)/(rotas-adm)/usuarios/_components/form-usuario.tsx`
- `app/(rotas-auth)/(rotas-adm)/usuarios/_components/modal-update-create.tsx`
- `app/(rotas-auth)/(rotas-adm)/usuarios/_components/modal-delete.tsx`

**Tabela de usuários:**

| Coluna | Conteúdo |
|--------|----------|
| Nome | Nome completo |
| Login | Username |
| E-mail | Endereço de e-mail |
| Status | Badge (Ativo / Inativo) |
| Ações | Editar + Desativar |

**Filtros:** busca por nome/e-mail/login, status (Ativo/Inativo), permissão (DEV/ADM)

**Criação de usuário:**
1. Clique no botão flutuante (FAB)
2. Modal abre com formulário
3. Digita o `login` → clica "Buscar"
4. `GET /api/usuarios/buscar-por-login/{login}` → retorna dados do LDAP/BD
5. Campos nome e e-mail preenchidos automaticamente (somente-leitura)
6. Seleciona a permissão: `DEV` / `ADM` / `TEC` / `USR`
7. Clique "Adicionar" → `POST /api/usuarios`
8. Toast de sucesso + reload da página

**Desativação de usuário:**
- Modal de confirmação
- `PUT /api/usuarios/{id}` com `{ status: false }` (desativa sem excluir)

---

### 3.4 Perfil do Usuário

**Rota:** `/perfil`
**Arquivos:**
- `app/(rotas-auth)/perfil/page.tsx`
- `app/(rotas-auth)/perfil/components/form-profile.tsx`

**Seções:**
- **Avatar:** Componente `AvatarUploader` para alteração de foto
- **Dados pessoais:** Nome, E-mail, Login, Permissão (campos desabilitados para edição)
- **Atividade recente:** Datas de criação e última atualização

---

## 5. API Endpoints

### `POST /api/inscricao`

Submissão da inscrição completa. Aceita `multipart/form-data`.

**Validações e processamento:**

| Etapa | Verificação | Resposta em caso de falha |
|-------|-------------|--------------------------|
| 1 | Prazo: deve ser antes de `2025-11-30T23:59:59Z` | `400` "Não é possível se inscrever fora do prazo." |
| 2 | Schema Zod completo (`formularioInscricaoSchema`) | `400` com detalhes de validação |
| 3 | CPF/e-mail já existente com status `DEFERIDO` ou `EM_ANALISE` | `400` "Cadastro já existente" |
| 4 | Status `INDEFERIDO` → permite reenvio | Remove arquivos antigos, recria registro |

**Salvamento de arquivos:** `uploads/{votanteId}/{timestamp}-{random}-{nomeOriginal}`

**Resposta de sucesso:**
```json
{ "success": true, "message": "...", "votanteId": "uuid" }
```

---

### `GET /api/consulta-cadastro/[cpf]`

Consulta pública de status por CPF. Sem autenticação.

**Resposta:**
```json
{
  "found": true,
  "cpf": "00000000000",
  "nome": "João Silva",
  "status": "EM_ANALISE",
  "criadoEm": "2026-01-15T10:00:00Z",
  "atualizadoEm": "2026-01-15T10:00:00Z"
}
```

---

### `GET /api/validacao/cpf/[cpf]`

Verifica se o CPF já está cadastrado (apenas statuses `DEFERIDO` ou `EM_ANALISE`).

```json
{ "disponivel": true, "message": "CPF disponível" }
```

---

### `GET /api/validacao/email/[email]`

Verifica disponibilidade do e-mail. Mesma lógica do CPF.

---

### `GET /api/validacao/perimetro`

Valida se um par de coordenadas está dentro das áreas de abrangência da OUCAB. Chamado pelo cliente durante o preenchimento do endereço.

**Query params:** `lat` (latitude) e `lng` (longitude)

**Processamento (server-side):**
1. Lê os dois arquivos KMZ de `public/shapes/` usando JSZip
2. Extrai o KML interno de cada arquivo
3. Parseia as tags `<coordinates>` para obter os polígonos
4. Executa o algoritmo **ray casting** contra todos os polígonos
5. Retorna `true` se o ponto estiver dentro de qualquer área

**Resposta:**
```json
{ "valid": true }
```

---

### `GET /api/shapes/[name]`

Serve o conteúdo KML extraído de um arquivo KMZ, para uso pelo OpenLayers no mapa.

**Parâmetros permitidos:** `perimetro_adesao` · `perimetro_expandido`

**Processamento:**
1. Lê o arquivo `public/shapes/{name}.kmz`
2. Descompacta com JSZip
3. Retorna o primeiro `.kml` encontrado como `application/vnd.google-earth.kml+xml`
4. Cache de 1 hora (`Cache-Control: public, max-age=3600`)

**Resposta:** Conteúdo KML como texto XML

---

### `PUT /api/votantes/[id]/status`

Atualiza o status de um votante. Requer autenticação com permissão `DEV` ou `ADM`.

**Body:** `{ "status": "DEFERIDO" | "INDEFERIDO" }`
**Resposta:** `{ "id": "uuid", "status": "DEFERIDO" }`

---

### `GET /api/votantes/export`

Exporta todos os votantes com status `DEFERIDO` em formato `.txt` pipe-delimited.

**Headers de resposta:**
```
Content-Type: text/plain; charset=utf-8
Content-Disposition: attachment; filename=deferidos.txt
```

---

### `GET /api/arquivos/[id]`

Download de documento enviado pelo votante.

- Busca o arquivo no banco por ID
- Lê do disco em `uploads/{votanteId}/`
- Retorna com `Content-Type` e `Content-Disposition` corretos

---

### `POST /api/usuarios`

Cria ou atualiza (upsert por `login`) um usuário do sistema. Requer autenticação.

**Body:** `{ email, login, nome, permissao }`
**Resposta:** `201` com o objeto do usuário criado

---

### `PUT /api/usuarios/[id]`

Atualiza dados de um usuário. Usuário só pode alterar o próprio perfil, exceto DEV/ADM (podem alterar qualquer um).

---

### `GET /api/usuarios/buscar-por-login/[login]`

Busca usuário pelo login (integração com LDAP). Usado no formulário de criação de usuários.

---

### `GET /api/portal/arquivos`

Retorna os arquivos enviados e o status de inscrição do votante autenticado.

**Auth:** sessão `votante` obrigatória

**Resposta:**
```json
{ "arquivos": [{ "id": "uuid", "nome": "doc.pdf", "tamanho": 102400 }], "status": "EM_ANALISE" }
```

---

### `PUT /api/portal/arquivos`

Substitui **todos** os arquivos do votante por novos envios. Aceita `multipart/form-data`.

**Auth:** sessão `votante` obrigatória

**Validações:**
- Prazo (`30/11/2025 23:59:59`) não encerrado
- Status não pode ser `DEFERIDO`
- Máximo 5 arquivos
- Tamanho total ≤ 30 MB

**Comportamento:** remove diretório antigo do disco e todos os registros do banco, recria com os novos arquivos.

---

### `POST /api/portal/alterar-senha`

Altera a senha do votante autenticado.

**Auth:** sessão `votante` obrigatória

**Body:** `{ "senhaAtual": "...", "novaSenha": "..." }`

**Validações:**
- `senhaAtual` deve bater com o hash armazenado (`bcryptjs.compare`)
- `novaSenha` ≥ 8 caracteres

**Efeito:** atualiza `senha` (novo hash) e `primeiroAcesso: false` no banco.

---

## 6. Autenticação e Autorização

**Arquivo:** `auth/config.ts`

**Provedor:** NextAuth.js com estratégia **Credentials + JWT** — dois providers independentes

---

#### Provider `admin` — Usuários Administrativos

**Fluxo de login:**
1. Usuário envia login + senha
2. Busca usuário no banco de dados
3. Se `ENVIRONMENT !== "local"`:
   - `POST {AUTH_SERVER}ldap/autenticar` com `{ login, senha }`
   - Resposta diferente de `200` → autenticação falha
4. Sucesso → JWT enriquecido com `{ id, email, nome, login, permissao, avatar, status, tipo: "admin" }`

**Redirecionamentos:**
- Não autenticado → `/login`
- Erro de auth → `/login`

**Níveis de permissão:**

| Permissão | Acesso |
|-----------|--------|
| `DEV` | Total (inclui gestão de usuários) |
| `ADM` | Gestão de votantes (deferir/indeferir) |
| `TEC` | Técnico (definido, uso parcial) |
| `USR` | Usuário básico (definido, uso parcial) |

---

#### Provider `votante` — Candidatos do Portal

**Fluxo de login:**
1. Usuário envia CPF + senha em `/portal/login`
2. Busca `votante` por CPF no banco
3. `bcryptjs.compare(senha, votante.senha)` — falha se hash não bater
4. Sucesso → JWT com `{ id, email, nome, cpf, tipoCadastro, tipoInscricao, primeiroAcesso, status, tipo: "votante" }`

**Middleware de proteção** (`middleware.ts`):
- Rotas `/portal/*` (exceto `/portal/login`) exigem `tipo === "votante"` na sessão
- Se `primeiroAcesso === true` e rota ≠ `/portal/alterar-senha` → redireciona para alteração de senha
- Votante já autenticado em `/portal/login` → redireciona para `/portal/minha-inscricao` ou `/portal/alterar-senha`

**Campo `tipo` na sessão:** distingue `"admin"` de `"votante"` em todas as APIs do portal.

---

## 7. Banco de Dados

**Arquivo:** `prisma/schema.prisma`
**SGBD:** MySQL

### Modelo `usuarios`

| Campo | Tipo | Detalhe |
|-------|------|---------|
| `id` | String UUID | PK |
| `nome` | String | |
| `email` | String | Unique |
| `login` | String | Unique |
| `permissao` | Enum | `DEV` / `ADM`, default `ADM` |
| `avatar` | String? | Opcional |
| `status` | Boolean | Default `true` (ativo) |
| `criadoEm` | DateTime | Auto |
| `atualizadoEm` | DateTime | Auto |

### Modelo `votantes`

| Campo | Tipo | Detalhe |
|-------|------|---------|
| `id` | String UUID | PK |
| `tipoCadastro` | Enum | `ELEITOR` / `CANDIDATO` — default `ELEITOR` |
| `tipoInscricao` | Enum | `MORADOR` / `TRABALHADOR` |
| `nome` | String | |
| `nomeSocial` | String? | |
| `telefone` | String? | |
| `genero` | Enum | `MASCULINO` / `FEMININO` / `OUTRO` |
| `email` | String | Unique |
| `cpf` | String | Unique |
| `dataNascimento` | DateTime | `@db.Date` |
| `empresa` | String? | Para TRABALHADOR |
| `status` | Enum | `EM_ANALISE` / `DEFERIDO` / `INDEFERIDO` |
| `senha` | String? | Hash bcrypt — apenas para CANDIDATO |
| `primeiroAcesso` | Boolean | Default `true` — resetado ao alterar senha |
| `criadoEm` | DateTime | Auto |
| `atualizadoEm` | DateTime | Auto |

### Modelo `enderecos`

| Campo | Tipo | Detalhe |
|-------|------|---------|
| `id` | String UUID | PK |
| `logradouro` | String | |
| `numero` | String? | |
| `complemento` | String? | |
| `bairro` | String | |
| `cidade` | String | |
| `estado` | String | |
| `cep` | String | |
| `latitude` | Float? | |
| `longitude` | Float? | |
| `votanteId` | String | FK Unique (1:1) |

### Modelo `arquivos`

| Campo | Tipo | Detalhe |
|-------|------|---------|
| `id` | String UUID | PK |
| `nome` | String | Nome original |
| `tipo` | String | MIME type |
| `tamanho` | Int | Bytes |
| `caminho` | String | Caminho no disco |
| `votanteId` | String | FK (1:N) |

**Relações:**
```
Votante 1──1 Endereco
Votante 1──N Arquivo
```

---

## 8. Serviços e Utilitários

### `services/votantes.ts`

| Função | Descrição |
|--------|-----------|
| `buscarVotantes(pagina, limite, busca?, status?)` | Lista paginada com filtros por nome/e-mail/status |
| `buscarVotantePorId(id)` | Detalhe completo com endereço e arquivos |
| `atualizarStatusVotante(id, novoStatus, usuarioId)` | Valida permissão DEV/ADM antes de atualizar |

### `services/usuario.ts`

| Função | Descrição |
|--------|-----------|
| `buscarUsuarios(pagina, limite, busca?, status?, permissao?)` | Lista paginada com filtros |
| `criarUsuario(data)` | Cria novo usuário do sistema |
| `atualizarUsuario(id, data)` | Valida permissão antes de atualizar |
| `meuUsuario(id)` | Busca usuário por ID |
| `validaUsuario()` | Retorna usuário autenticado da sessão |
| `retornaPermissao(id)` | Retorna nível de permissão do usuário |

### `lib/utils/polygon-validation.ts`

Validação geoespacial do endereço do votante. Funções async que delegam ao endpoint server-side `/api/validacao/perimetro`.

| Função | Descrição |
|--------|-----------|
| `isWithinOUCABPerimeter(lat, lng)` | Chama `GET /api/validacao/perimetro` e retorna `Promise<boolean>` |
| `validateAddressInPerimeter(endereco)` | Wrapper async com mensagem de erro amigável; retorna `{ isValid, message }` |

### `lib/password.ts`

Utilitários de senha para o portal do candidato.

| Função | Descrição |
|--------|-----------|
| `gerarSenha(tamanho?)` | Gera senha aleatória de 10 chars (charset sem ambíguos) |
| `hashSenha(senha)` | Hash bcrypt com 10 rounds (`bcryptjs`) — `Promise<string>` |
| `verificarSenha(senha, hash)` | Compara senha com hash — `Promise<boolean>` |

### `lib/email.ts`

Integração com o serviço de e-mail (`mail-api` em `localhost:3501`).

| Função | Descrição |
|--------|-----------|
| `sendEmail({ to, subject, html, text, bcc? })` | POST `{MAIL_SERVER}/send-email` — sem autenticação |
| `emailBoasVindas({ nome, cpf, senha, tipoCadastro })` | Monta template HTML/texto com credenciais de acesso ao portal |

**Variáveis de ambiente:**
- `MAIL_SERVER` — URL base do serviço (ex: `http://localhost:3501`)
- `MAIL_FROM` — endereço do remetente

### `lib/utils.ts`

| Função | Descrição |
|--------|-----------|
| `cn(...inputs)` | Merge de classes Tailwind (`clsx` + `twMerge`) |
| `verificaPagina(pagina, limite)` | Normaliza parâmetros de paginação |
| `verificaData(dataInicio, dataFim)` | Converte `DD-MM-YYYY` para `Date` |

---

## 9. Integrações Externas

| Serviço | Endpoint | Uso |
|---------|----------|-----|
| **ViaCEP** | `https://viacep.com.br/ws/{cep}/json/` | Preenchimento automático de endereço por CEP |
| **Nominatim (geocode)** | `https://nominatim.openstreetmap.org/search` | Converter endereço em coordenadas |
| **Nominatim (reverse)** | `https://nominatim.openstreetmap.org/reverse` | Converter coordenadas em endereço |
| **LDAP** | `{AUTH_SERVER}ldap/autenticar` | Autenticação de usuários administrativos |
| **OpenStreetMap** | (tile server padrão OSM) | Mapa base no OpenLayers |
| **mail-api** | `{MAIL_SERVER}/send-email` | Envio de e-mails transacionais (NestJS, porta 3501) |

---

## 10. Regras de Negócio

### Inscrição

- **Prazo:** `30/11/2025 23:59:59` — após essa data, formulário retorna erro 400
- **Idade mínima:** 16 anos; **máxima:** 120 anos
- **CPF único** entre registros com status `DEFERIDO` ou `EM_ANALISE`
- **E-mail único** com a mesma regra do CPF
- **Reinscrição** permitida apenas se status anterior for `INDEFERIDO` (arquivos antigos são removidos)
- **Endereço** deve estar dentro do **perímetro de adesão** ou do **perímetro expandido** da OUCAB (São Paulo)
- **TRABALHADOR** deve preencher o campo `empresa`
- **5 declarações** devem ser aceitas para submeter

### Tipo de Cadastro (ELEITOR × CANDIDATO)

- **ELEITOR:** cadastro simples, sem acesso ao portal. Apenas consulta pública por CPF.
- **CANDIDATO:** recebe login e senha gerada automaticamente por e-mail ao concluir a inscrição. Tem acesso ao Portal do Inscrito.
- Na **reinscrição** de um CANDIDATO `INDEFERIDO`: nova senha é gerada e enviada por e-mail novamente.
- O envio de e-mail é não-bloqueante (falha silenciosa via `.catch`) — a inscrição não é cancelada se o e-mail falhar.

### Portal do Inscrito

- Acesso exclusivo para `tipoCadastro === "CANDIDATO"`
- **Primeiro acesso:** usuário é forçado a alterar a senha antes de acessar qualquer outra página
- **Atualização de arquivos:** permitida somente se o prazo não tiver encerrado E status ≠ `DEFERIDO`
- Substituição de arquivos é **integral** — todos os arquivos anteriores são removidos antes do novo upload
- Limites de arquivos: máximo 5, tamanho total ≤ 30 MB (mesmas regras da inscrição inicial)

### Gestão de Votantes

- Status só pode transitar: `EM_ANALISE → DEFERIDO` ou `EM_ANALISE → INDEFERIDO`
- Apenas usuários com permissão `DEV` ou `ADM` podem alterar status
- Exportação inclui **apenas** votantes com status `DEFERIDO`

### Gestão de Usuários

- Criação de usuários: requer sessão autenticada
- Atualização de outros usuários: requer `DEV` ou `ADM`
- Usuário padrão pode atualizar apenas o próprio perfil
- Desativação é lógica (`status: false`), sem exclusão do banco

---

## 11. Arquivos de Perímetro

Os arquivos de perímetro ficam em `public/shapes/` e são consumidos exclusivamente via API server-side (nunca servidos diretamente ao browser):

| Arquivo | Tipo | Uso |
|---------|------|-----|
| `perimetro_adesao.kmz` | KMZ (ZIP + KML) | Área principal de inscrição — exibida em roxo no mapa |
| `perimetro_expandido.kmz` | KMZ (ZIP + KML) | Área expandida — exibida em azul no mapa |

**Fluxo de leitura:**
```
Browser (mapa)           → GET /api/shapes/{name}        → lê .kmz → extrai KML → retorna XML
Browser (form endereço)  → GET /api/validacao/perimetro  → lê .kmz → parseia polígonos → ray casting → { valid }
```

**Para atualizar os perímetros:** substituir os arquivos `.kmz` em `public/shapes/` — nenhuma alteração de código é necessária.

---

*Documentação atualizada em 29/03/2026. Revisar ao adicionar novas funcionalidades.*
