-- Reabertura de inscrições AIUVL: suporte a múltiplas rodadas por candidatura

-- Passo 1: Adiciona coluna rodada em candidaturas (padrão 1 = rodada original)
ALTER TABLE `candidaturas` ADD COLUMN `rodada` INTEGER NOT NULL DEFAULT 1;

-- Passo 2: Cria índice composto (usuarioId, rodada) ANTES de dropar o antigo
-- O MySQL exige que a coluna de FK (usuarioId) permaneça indexada.
-- Um índice composto com usuarioId como coluna mais à esquerda satisfaz essa exigência.
CREATE UNIQUE INDEX `candidaturas_usuarioId_rodada_key` ON `candidaturas`(`usuarioId`, `rodada`);

-- Passo 3: Agora o índice único simples pode ser removido com segurança
DROP INDEX `candidaturas_usuarioId_key` ON `candidaturas`;

-- Passo 4: Remove índice único de CNPJ em organizacoes_candidatas
-- (unicidade por rodada é controlada na aplicação)
DROP INDEX `organizacoes_candidatas_cnpj_key` ON `organizacoes_candidatas`;

-- Passo 5: Cria índice composto para candidatos ANTES de dropar o único por CPF
-- Garante que o mesmo CPF só aparece uma vez por candidatura
CREATE UNIQUE INDEX `candidatos_cpf_candidaturaId_key` ON `candidatos`(`cpf`, `candidaturaId`);

-- Passo 6: Remove índice único simples de CPF
DROP INDEX `candidatos_cpf_key` ON `candidatos`;
