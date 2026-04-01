/*
  Warnings:

  - You are about to drop the column `votanteId` on the `arquivos` table. All the data in the column will be lost.
  - You are about to drop the column `votanteId` on the `enderecos` table. All the data in the column will be lost.
  - You are about to drop the `arquivos_organizacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `enderecos_organizacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organizacoes_movimentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `votantes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[candidaturaId]` on the table `enderecos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoria` to the `arquivos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidaturaId` to the `enderecos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `arquivos` DROP FOREIGN KEY `arquivos_votanteId_fkey`;

-- DropForeignKey
ALTER TABLE `arquivos_organizacoes` DROP FOREIGN KEY `arquivos_organizacoes_organizacaoId_fkey`;

-- DropForeignKey
ALTER TABLE `enderecos` DROP FOREIGN KEY `enderecos_votanteId_fkey`;

-- DropForeignKey
ALTER TABLE `enderecos_organizacoes` DROP FOREIGN KEY `enderecos_organizacoes_organizacaoId_fkey`;

-- DropForeignKey
ALTER TABLE `organizacoes_movimentos` DROP FOREIGN KEY `organizacoes_movimentos_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `votantes` DROP FOREIGN KEY `votantes_organizacaoId_fkey`;

-- DropForeignKey
ALTER TABLE `votantes` DROP FOREIGN KEY `votantes_usuarioId_fkey`;

-- DropIndex
DROP INDEX `arquivos_votanteId_fkey` ON `arquivos`;

-- DropIndex
DROP INDEX `enderecos_votanteId_key` ON `enderecos`;

-- AlterTable
ALTER TABLE `arquivos` DROP COLUMN `votanteId`,
    ADD COLUMN `candidatoId` VARCHAR(191) NULL,
    ADD COLUMN `candidaturaId` VARCHAR(191) NULL,
    ADD COLUMN `categoria` ENUM('REQUERIMENTO', 'DOCUMENTO_IDENTIDADE', 'CPF', 'TITULO_ELEITOR', 'COMPROVANTE_RESIDENCIA', 'COMPROVANTE_TRABALHO', 'FOTO', 'DECLARACAO', 'DECLARACAO_ATUACAO', 'ESTATUTO_SOCIAL', 'ATA_ELEICAO', 'CERTIDAO_CNPJ', 'OUTRO') NOT NULL,
    ADD COLUMN `eleitorId` VARCHAR(191) NULL,
    ADD COLUMN `organizacaoId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `enderecos` DROP COLUMN `votanteId`,
    ADD COLUMN `areaPerimetro` ENUM('ADESAO', 'EXPANDIDO', 'NAO_APLICA') NOT NULL DEFAULT 'NAO_APLICA',
    ADD COLUMN `candidaturaId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `permissao` ENUM('DEV', 'ADM', 'USR') NULL;

-- DropTable
DROP TABLE `arquivos_organizacoes`;

-- DropTable
DROP TABLE `enderecos_organizacoes`;

-- DropTable
DROP TABLE `organizacoes_movimentos`;

-- DropTable
DROP TABLE `votantes`;

-- CreateTable
CREATE TABLE `inscricoes` (
    `id` VARCHAR(191) NOT NULL,
    `tipoCadastro` ENUM('ELEITOR', 'CANDIDATO') NOT NULL DEFAULT 'ELEITOR',
    `tipoInscricao` ENUM('MORADOR', 'TRABALHADOR', 'REP_MORADIA', 'REP_ONGS', 'REP_PROFISSIONAIS', 'REP_EMPRESARIAIS') NOT NULL DEFAULT 'MORADOR',
    `usuarioId` VARCHAR(191) NOT NULL,
    `status` ENUM('EM_ANALISE', 'DEFERIDO', 'INDEFERIDO') NOT NULL DEFAULT 'EM_ANALISE',

    UNIQUE INDEX `inscricoes_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organizacoes` (
    `id` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `razaoSocial` VARCHAR(191) NOT NULL,
    `candidaturaId` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `organizacoes_cnpj_key`(`cnpj`),
    UNIQUE INDEX `organizacoes_candidaturaId_key`(`candidaturaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `representantes` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `dataNascimento` DATE NOT NULL,
    `genero` ENUM('MASCULINO', 'FEMININO', 'OUTRO') NOT NULL,
    `tipoCandidato` ENUM('INDIVIDUAL', 'TITULAR', 'SUPLENTE') NOT NULL DEFAULT 'INDIVIDUAL',
    `candidaturaId` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `representantes_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eleitores` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `dataNascimento` DATE NOT NULL,
    `genero` ENUM('MASCULINO', 'FEMININO', 'OUTRO') NOT NULL,
    `tituloEleitor` VARCHAR(191) NULL,
    `usuarioId` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `eleitores_cpf_key`(`cpf`),
    UNIQUE INDEX `eleitores_tituloEleitor_key`(`tituloEleitor`),
    UNIQUE INDEX `eleitores_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `enderecos_candidaturaId_key` ON `enderecos`(`candidaturaId`);

-- AddForeignKey
ALTER TABLE `inscricoes` ADD CONSTRAINT `inscricoes_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_candidaturaId_fkey` FOREIGN KEY (`candidaturaId`) REFERENCES `inscricoes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_candidatoId_fkey` FOREIGN KEY (`candidatoId`) REFERENCES `representantes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_organizacaoId_fkey` FOREIGN KEY (`organizacaoId`) REFERENCES `organizacoes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_eleitorId_fkey` FOREIGN KEY (`eleitorId`) REFERENCES `eleitores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enderecos` ADD CONSTRAINT `enderecos_candidaturaId_fkey` FOREIGN KEY (`candidaturaId`) REFERENCES `inscricoes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `organizacoes` ADD CONSTRAINT `organizacoes_candidaturaId_fkey` FOREIGN KEY (`candidaturaId`) REFERENCES `inscricoes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `representantes` ADD CONSTRAINT `representantes_candidaturaId_fkey` FOREIGN KEY (`candidaturaId`) REFERENCES `inscricoes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eleitores` ADD CONSTRAINT `eleitores_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
