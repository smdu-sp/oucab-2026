-- DropForeignKey
ALTER TABLE `votantes` DROP FOREIGN KEY `votantes_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `votantes` ADD COLUMN `nome` VARCHAR(191) NULL,
    ADD COLUMN `organizacaoId` VARCHAR(191) NULL,
    ADD COLUMN `vaga` ENUM('TITULAR', 'SUPLENTE') NULL,
    MODIFY `areaPerimetro` ENUM('ADESAO', 'EXPANDIDO') NULL,
    MODIFY `usuarioId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `organizacoes_movimentos` (
    `id` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `razaoSocial` VARCHAR(191) NOT NULL,
    `status` ENUM('EM_ANALISE', 'DEFERIDO', 'INDEFERIDO') NOT NULL DEFAULT 'EM_ANALISE',
    `usuarioId` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `organizacoes_movimentos_cnpj_key`(`cnpj`),
    UNIQUE INDEX `organizacoes_movimentos_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enderecos_organizacoes` (
    `id` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NULL,
    `complemento` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `organizacaoId` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `enderecos_organizacoes_organizacaoId_key`(`organizacaoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `arquivos_organizacoes` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `tamanho` INTEGER NOT NULL,
    `caminho` VARCHAR(191) NOT NULL,
    `organizacaoId` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `votantes` ADD CONSTRAINT `votantes_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `votantes` ADD CONSTRAINT `votantes_organizacaoId_fkey` FOREIGN KEY (`organizacaoId`) REFERENCES `organizacoes_movimentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `organizacoes_movimentos` ADD CONSTRAINT `organizacoes_movimentos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enderecos_organizacoes` ADD CONSTRAINT `enderecos_organizacoes_organizacaoId_fkey` FOREIGN KEY (`organizacaoId`) REFERENCES `organizacoes_movimentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `arquivos_organizacoes` ADD CONSTRAINT `arquivos_organizacoes_organizacaoId_fkey` FOREIGN KEY (`organizacaoId`) REFERENCES `organizacoes_movimentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
