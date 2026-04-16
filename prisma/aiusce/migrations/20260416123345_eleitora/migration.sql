/*
  Warnings:

  - A unique constraint covering the columns `[candidatoId]` on the table `eleitores` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `eleitores` ADD COLUMN `candidatoId` VARCHAR(191) NULL,
    ADD COLUMN `eleitorPaiId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `eleitores_candidatoId_key` ON `eleitores`(`candidatoId`);

-- AddForeignKey
ALTER TABLE `eleitores` ADD CONSTRAINT `eleitores_candidatoId_fkey` FOREIGN KEY (`candidatoId`) REFERENCES `candidatos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eleitores` ADD CONSTRAINT `eleitores_eleitorPaiId_fkey` FOREIGN KEY (`eleitorPaiId`) REFERENCES `eleitores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
