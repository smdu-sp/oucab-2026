-- AlterTable: adiciona campos de chapa à tabela organizacoes
ALTER TABLE `organizacoes`
  ADD COLUMN `formaChapa`       BOOLEAN      NOT NULL DEFAULT false,
  ADD COLUMN `chapaRazaoSocial` VARCHAR(200) NULL,
  ADD COLUMN `chapaCNPJ`        VARCHAR(14)  NULL;
