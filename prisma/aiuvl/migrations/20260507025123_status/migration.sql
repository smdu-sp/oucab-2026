/*
  Warnings:

  - The values [AGUARDANDO_DOCUMENTACAO] on the enum `eleitores_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [AGUARDANDO_DOCUMENTACAO] on the enum `eleitores_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `candidaturas` MODIFY `status` ENUM('EM_ANALISE', 'DEFERIDO', 'INDEFERIDO') NOT NULL DEFAULT 'EM_ANALISE';

-- AlterTable
ALTER TABLE `eleitores` MODIFY `status` ENUM('EM_ANALISE', 'DEFERIDO', 'INDEFERIDO') NOT NULL DEFAULT 'EM_ANALISE';
