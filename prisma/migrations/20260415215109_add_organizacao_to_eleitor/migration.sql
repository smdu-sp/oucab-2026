-- AlterTable
ALTER TABLE `eleitores` ADD COLUMN `organizacaoId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `eleitores` ADD CONSTRAINT `eleitores_organizacaoId_fkey` FOREIGN KEY (`organizacaoId`) REFERENCES `organizacoes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
