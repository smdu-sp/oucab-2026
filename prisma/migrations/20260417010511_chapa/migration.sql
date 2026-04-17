/*
  Warnings:

  - You are about to alter the column `chapaRazaoSocial` on the `organizacoes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `organizacoes` MODIFY `chapaRazaoSocial` VARCHAR(191) NULL,
    MODIFY `chapaCNPJ` VARCHAR(191) NULL;
