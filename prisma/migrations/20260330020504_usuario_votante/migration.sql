/*
  Warnings:

  - You are about to drop the column `email` on the `votantes` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `votantes` table. All the data in the column will be lost.
  - You are about to drop the column `primeiroAcesso` on the `votantes` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `votantes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `votantes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `votantes` table without a default value. This is not possible if the table is not empty.
  - Made the column `areaPerimetro` on table `votantes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `votantes_email_key` ON `votantes`;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `primeiroAcesso` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `senha` VARCHAR(191) NULL,
    ADD COLUMN `tipo` ENUM('INTERNO', 'EXTERNO') NOT NULL DEFAULT 'INTERNO',
    MODIFY `login` VARCHAR(191) NULL,
    MODIFY `permissao` ENUM('DEV', 'ADM') NULL;

-- AlterTable
ALTER TABLE `votantes` DROP COLUMN `email`,
    DROP COLUMN `nome`,
    DROP COLUMN `primeiroAcesso`,
    DROP COLUMN `senha`,
    ADD COLUMN `usuarioId` VARCHAR(191) NOT NULL,
    MODIFY `areaPerimetro` ENUM('ADESAO', 'EXPANDIDO') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `votantes_usuarioId_key` ON `votantes`(`usuarioId`);

-- AddForeignKey
ALTER TABLE `votantes` ADD CONSTRAINT `votantes_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
