/*
  Warnings:

  - You are about to alter the column `chapaLogradouro` on the `organizacoes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `organizacoes` MODIFY `chapaLogradouro` VARCHAR(191) NULL,
    MODIFY `chapaNumero` VARCHAR(191) NULL,
    MODIFY `chapaComplemento` VARCHAR(191) NULL,
    MODIFY `chapaBairro` VARCHAR(191) NULL,
    MODIFY `chapaCidade` VARCHAR(191) NULL,
    MODIFY `chapaEstado` VARCHAR(191) NULL,
    MODIFY `chapaCep` VARCHAR(191) NULL;
