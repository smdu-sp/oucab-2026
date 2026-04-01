# Fluxo de Inscrição — OUCAB 2026

## Tipos de Participação

Antes de tudo, o usuário escolhe como quer participar:

| Tipo de Cadastro | Descrição |
|---|---|
| **ELEITOR** | Participa apenas da votação. Tipos disponíveis: Morador, Trabalhador. |
| **CANDIDATO** | Concorre a uma vaga no conselho. Tipos disponíveis: todos os 6 tipos. |

---

## Fluxos por tipo de inscrição

---

### 1. Eleitor Morador / Eleitor Trabalhador
*(tipoCadastro = ELEITOR, tipoInscricao = MORADOR ou TRABALHADOR)*

| # | Etapa | Dados coletados |
|---|---|---|
| 1 | Tipo de Participação | ELEITOR |
| 2 | Tipo de Inscrição | MORADOR ou TRABALHADOR |
| 3 | Dados Pessoais | Nome, nome social, CPF, data nasc., telefone, gênero, e-mail, título de eleitor, empresa (só TRABALHADOR) |
| 4 | Endereço | Endereço completo com validação de geolocalização dentro do **perímetro da OUCAB** |
| 5 | Documento de Identidade | **Obrigatório** |
| 6 | CPF | **Opcional** |
| 7 | Comprovante de Residência (MORADOR) ou Comprovante de Trabalho (TRABALHADOR) | **Obrigatório** |
| 8 | Revisão de Dados | Conferência de todos os dados |
| 9 | Revisão de Dados | Conferência de todos os dados |

**O que é salvo no banco:**
- `Usuario` (tipo EXTERNO, sem senha — eleitor não tem acesso ao portal)
- `Candidatura` (tipoCadastro=ELEITOR, tipoInscricao=MORADOR/TRABALHADOR)
- `Endereco` vinculado à candidatura
- `Eleitor` com CPF, dados pessoais, vinculado ao usuário
- `Arquivo`s vinculados ao Eleitor

> Eleitor **não** recebe senha nem acesso ao portal.

---

### 2. Candidato Morador / Candidato Trabalhador
*(tipoCadastro = CANDIDATO, tipoInscricao = MORADOR ou TRABALHADOR)*

| # | Etapa | Dados coletados |
|---|---|---|
| 1 | Tipo de Participação | CANDIDATO |
| 2 | Tipo de Inscrição | MORADOR ou TRABALHADOR |
| 3 | Dados Pessoais | Idem ao eleitor + título de eleitor **obrigatório** |
| 4 | Endereço | Validação dentro do **perímetro da OUCAB** |
| 5 | Requerimento de Inscrição | **Obrigatório** |
| 6 | Documento de Identidade | **Obrigatório** |
| 7 | CPF | **Opcional** |
| 8 | Título de Eleitor | **Obrigatório** |
| 9 | Comprovante de Residência ou Trabalho | **Obrigatório** |
| 10 | Foto 3×4 | **Obrigatório** |
| 11 | Declaração de Não Impedimento | **Obrigatório** |
| 12 | Revisão de Dados | Conferência |
| 13 | Revisão de Dados | Conferência de todos os dados |

**O que é salvo no banco:**
- `Usuario` (tipo EXTERNO, **com senha gerada automaticamente**)
- `Candidatura` (tipoCadastro=CANDIDATO, tipoInscricao=MORADOR/TRABALHADOR)
- `Endereco` vinculado à candidatura
- `Eleitor` vinculado ao usuário
- `Candidato` (tipoCandidato=INDIVIDUAL) vinculado à candidatura
- `Arquivo`s vinculados ao Candidato

> Recebe e-mail com senha para acessar o portal e acompanhar o status.

---

### 3. Candidato Representante de Movimento de Moradia
*(tipoCadastro = CANDIDATO, tipoInscricao = REP_MORADIA)*

| # | Etapa | Dados coletados |
|---|---|---|
| 1 | Tipo de Participação | CANDIDATO |
| 2 | Tipo de Inscrição | REP_MORADIA |
| 3 | Dados da Organização | CNPJ, razão social, e-mail da entidade |
| 4 | Requerimento da Entidade | **Obrigatório** |
| 5 | Declaração de Atuação | **Obrigatório** |
| 6 | Estatuto Social | **Obrigatório** |
| 7 | Ata da Última Eleição | **Obrigatório** |
| 8 | Certidão CNPJ | **Obrigatório** |
| 9 | Comprovante CNPJ | **Opcional** |
| 10 | Endereço da Organização | Validação: **Município de São Paulo** (sem exigência de perímetro) |
| 11 | Dados do Titular | Nome, CPF, data nasc., telefone, gênero, e-mail, título de eleitor |
| 12 | Requerimento — Titular | **Obrigatório** |
| 13 | Identidade — Titular | **Obrigatório** |
| 14 | CPF — Titular | **Opcional** |
| 15 | Título de Eleitor — Titular | **Obrigatório** |
| 16 | Foto 3×4 — Titular | **Obrigatório** |
| 17 | Declaração — Titular | **Obrigatório** |
| 18 | Dados do Suplente | Mesmos campos do titular |
| 19 | Requerimento — Suplente | **Obrigatório** |
| 20 | Identidade — Suplente | **Obrigatório** |
| 21 | CPF — Suplente | **Opcional** |
| 22 | Título de Eleitor — Suplente | **Obrigatório** |
| 23 | Foto 3×4 — Suplente | **Obrigatório** |
| 24 | Declaração — Suplente | **Obrigatório** |
| 25 | Revisão de Dados | Conferência |
| 26 | Revisão de Dados | Conferência de todos os dados |

**O que é salvo no banco:**
- `Usuario` (e-mail da organização, com senha)
- `Candidatura` (tipoCadastro=CANDIDATO, tipoInscricao=REP_MORADIA)
- `Organizacao` (CNPJ, razão social) vinculada à candidatura
- `Endereco` vinculado à candidatura
- `Candidato` (tipoCandidato=TITULAR) + `Eleitor` para o titular
- `Candidato` (tipoCandidato=SUPLENTE) + `Eleitor` para o suplente
- `Arquivo`s da organização vinculados à `Organizacao`
- `Arquivo`s do titular vinculados ao `Candidato` titular
- `Arquivo`s do suplente vinculados ao `Candidato` suplente

> **Diferença de REP_MORADIA para os demais REP_*:** o titular e o suplente também entregam **Requerimento** e **Título de Eleitor**, que não são exigidos para ONGs/Profissionais/Empresariais.

---

### 4. Candidato Representante de ONG / Profissional / Empresarial
*(tipoCadastro = CANDIDATO, tipoInscricao = REP_ONGS | REP_PROFISSIONAIS | REP_EMPRESARIAIS)*

| # | Etapa | Dados coletados |
|---|---|---|
| 1 | Tipo de Participação | CANDIDATO |
| 2 | Tipo de Inscrição | REP_ONGS / REP_PROFISSIONAIS / REP_EMPRESARIAIS |
| 3 | Dados da Organização | CNPJ, razão social, e-mail da entidade |
| 4 | Requerimento da Entidade | **Obrigatório** |
| 5 | Declaração de Atuação | **Obrigatório** |
| 6 | Estatuto Social | **Obrigatório** |
| 7 | Ata da Última Eleição | **Obrigatório** |
| 8 | Certidão CNPJ | **Obrigatório** |
| 9 | Comprovante CNPJ | **Opcional** |
| 10 | Endereço da Organização | Validação: **Município de São Paulo** |
| 11 | Dados do Titular | Nome, CPF, data nasc., telefone, gênero, e-mail |
| 12 | Identidade — Titular | **Obrigatório** *(sem Requerimento e sem Título de Eleitor)* |
| 13 | CPF — Titular | **Opcional** |
| 14 | Foto 3×4 — Titular | **Obrigatório** |
| 15 | Declaração — Titular | **Obrigatório** |
| 16 | Dados do Suplente | Mesmos campos do titular |
| 17 | Identidade — Suplente | **Obrigatório** |
| 18 | CPF — Suplente | **Opcional** |
| 19 | Foto 3×4 — Suplente | **Obrigatório** |
| 20 | Declaração — Suplente | **Obrigatório** |
| 21 | Revisão de Dados | Conferência |
| 22 | Revisão de Dados | Conferência de todos os dados |

**O que é salvo no banco:** idêntico ao REP_MORADIA, porém sem os arquivos de Requerimento e Título de Eleitor para titular e suplente.

---

## Regras de negócio

| Regra | Detalhe |
|---|---|
| **Endereço MORADOR/TRABALHADOR** | Geolocalização verificada via API — deve estar dentro do perímetro de adesão ou expandido da OUCAB |
| **Endereço REP_*** | Apenas cidade = São Paulo, sem validação de perímetro |
| **Paridade de gênero** | Titular e suplente não podem ser ambos do gênero MASCULINO |
| **CNPJ único** | Sistema rejeita inscrição duplicada pelo CNPJ |
| **CPF único** | Sistema rejeita inscrição duplicada pelo CPF |
| **E-mail único** | Sistema rejeita inscrição duplicada pelo e-mail |
| **Prazo de inscrição** | Definido em `lib/config.ts` — API retorna erro 400 fora do prazo |
| **Atomicidade** | Tudo é criado em `db.$transaction` — se qualquer passo falhar, nada é salvo |
| **Senha** | Gerada automaticamente apenas para CANDIDATO e organização (REP_*); ELEITORs não têm acesso ao portal |

---

## Destino dos arquivos no servidor

Os arquivos são salvos em:

```
/uploads/candidatura-{id}/
```

O nome no disco é gerado como `{timestamp}-{random}-{nome-original}`.  
O campo `nome` no banco guarda o nome original do arquivo enviado pelo usuário.  
O campo `categoria` no banco classifica o documento pelo enum `CategoriaArquivo`.

> **Atenção:** o campo `caminho` no banco guarda o caminho absoluto do sistema de arquivos do servidor, não uma URL pública. Para exibir ou baixar os arquivos pela interface administrativa, é necessária uma rota de serving desses arquivos (ex: `GET /api/arquivos/[id]`).
