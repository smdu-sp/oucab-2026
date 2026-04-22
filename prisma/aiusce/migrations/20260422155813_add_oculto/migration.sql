-- AlterTable
ALTER TABLE `candidaturas` ADD COLUMN `oculto` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `eleitores` ADD COLUMN `oculto` BOOLEAN NOT NULL DEFAULT false;
