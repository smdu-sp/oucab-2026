-- AlterTable
ALTER TABLE `votantes` ADD COLUMN `areaPerimetro` ENUM('ADESAO', 'EXPANDIDO') NULL,
    ADD COLUMN `tituloEleitor` VARCHAR(191) NULL;
