-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` ENUM('INTERNO', 'EXTERNO') NOT NULL DEFAULT 'INTERNO',
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NULL,
    `permissao` ENUM('DEV', 'ADM', 'USR') NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `senha` VARCHAR(191) NULL,
    `primeiroAcesso` BOOLEAN NOT NULL DEFAULT true,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuarios_email_key`(`email`),
    UNIQUE INDEX `usuarios_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `candidaturas` (
    `id` VARCHAR(191) NOT NULL,
    `tipoInscricao` ENUM('CANDIDATO', 'ELEITOR') NOT NULL,
    `status` ENUM('EM_ANALISE', 'DEFERIDO', 'INDEFERIDO') NOT NULL DEFAULT 'EM_ANALISE',
    `usuarioId` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `candidaturas_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organizacoes_candidatas` (
    `id` VARCHAR(191) NOT NULL,
    `razaoSocial` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `segmento` ENUM('ONG_CULTURAL', 'ENTIDADE_URB_AMB') NOT NULL,
    `dataAbertura` DATE NOT NULL,
    `sede` VARCHAR(191) NOT NULL,
    `repNome` VARCHAR(191) NOT NULL,
    `repCpf` VARCHAR(191) NOT NULL,
    `emailEntidade` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `formaChapa` BOOLEAN NOT NULL DEFAULT false,
    `cnpjChapa` VARCHAR(191) NULL,
    `candidaturaId` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `organizacoes_candidatas_cnpj_key`(`cnpj`),
    UNIQUE INDEX `organizacoes_candidatas_candidaturaId_key`(`candidaturaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `candidatos` (
    `id` VARCHAR(191) NOT NULL,
    `tipoCandidato` ENUM('TITULAR', 'SUPLENTE') NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `nomeSocial` VARCHAR(191) NULL,
    `nomeEmpresa` VARCHAR(191) NULL,
    `genero` ENUM('MASCULINO', 'FEMININO', 'OUTRO') NOT NULL,
    `dataNascimento` DATE NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `tituloEleitor` VARCHAR(191) NULL,
    `domicilioEleitoral` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `aceiteImagem` BOOLEAN NOT NULL DEFAULT false,
    `candidaturaId` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `candidatos_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eleitores` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('EM_ANALISE', 'DEFERIDO', 'INDEFERIDO') NOT NULL DEFAULT 'EM_ANALISE',
    `usuarioId` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `eleitores_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organizacoes_eleitoras` (
    `id` VARCHAR(191) NOT NULL,
    `razaoSocial` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `segmento` ENUM('ONG_CULTURAL', 'ENTIDADE_URB_AMB') NOT NULL,
    `dataAbertura` DATE NOT NULL,
    `sede` VARCHAR(191) NOT NULL,
    `repNome` VARCHAR(191) NOT NULL,
    `repCpf` VARCHAR(191) NOT NULL,
    `repTituloEleitor` VARCHAR(191) NULL,
    `repDomicilio` VARCHAR(191) NULL,
    `emailEntidade` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `eleitorId` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `organizacoes_eleitoras_cnpj_key`(`cnpj`),
    UNIQUE INDEX `organizacoes_eleitoras_eleitorId_key`(`eleitorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procuradores` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `eleitorId` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `procuradores_cpf_key`(`cpf`),
    UNIQUE INDEX `procuradores_eleitorId_key`(`eleitorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `arquivos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `tamanho` INTEGER NOT NULL,
    `caminho` VARCHAR(191) NOT NULL,
    `categoria` ENUM('CAND_ENT_REQUERIMENTO', 'CAND_ENT_DECLARACAO_ATUACAO', 'CAND_ENT_ESTATUTO', 'CAND_ENT_ATA_ELEICAO', 'CAND_ENT_CNPJ', 'CAND_ENT_DECLARACAO_IDONEIDADE', 'CAND_REP_IDENTIDADE', 'CAND_REP_TITULO_ELEITOR', 'CAND_REP_CPF', 'CAND_REP_FOTO', 'CAND_REP_NAO_IMPEDIMENTO', 'CAND_CHAPA_REQUERIMENTO', 'ELEIT_ENT_REQUERIMENTO', 'ELEIT_ENT_DECLARACAO_ATUACAO', 'ELEIT_ENT_ESTATUTO', 'ELEIT_ENT_ATA_ELEICAO', 'ELEIT_ENT_CNPJ', 'ELEIT_ENT_DECLARACAO_IDONEIDADE', 'ELEIT_REP_IDENTIDADE', 'ELEIT_REP_TITULO_ELEITOR', 'ELEIT_REP_CPF', 'ELEIT_PROC_PROCURACAO', 'ELEIT_PROC_REQUERIMENTO') NOT NULL,
    `candidaturaId` VARCHAR(191) NULL,
    `candidatoId` VARCHAR(191) NULL,
    `orgCandidataId` VARCHAR(191) NULL,
    `eleitorId` VARCHAR(191) NULL,
    `orgEleitoraId` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `candidaturas` ADD CONSTRAINT `candidaturas_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `organizacoes_candidatas` ADD CONSTRAINT `organizacoes_candidatas_candidaturaId_fkey` FOREIGN KEY (`candidaturaId`) REFERENCES `candidaturas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `candidatos` ADD CONSTRAINT `candidatos_candidaturaId_fkey` FOREIGN KEY (`candidaturaId`) REFERENCES `candidaturas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eleitores` ADD CONSTRAINT `eleitores_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `organizacoes_eleitoras` ADD CONSTRAINT `organizacoes_eleitoras_eleitorId_fkey` FOREIGN KEY (`eleitorId`) REFERENCES `eleitores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procuradores` ADD CONSTRAINT `procuradores_eleitorId_fkey` FOREIGN KEY (`eleitorId`) REFERENCES `eleitores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_candidaturaId_fkey` FOREIGN KEY (`candidaturaId`) REFERENCES `candidaturas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_candidatoId_fkey` FOREIGN KEY (`candidatoId`) REFERENCES `candidatos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_orgCandidataId_fkey` FOREIGN KEY (`orgCandidataId`) REFERENCES `organizacoes_candidatas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_eleitorId_fkey` FOREIGN KEY (`eleitorId`) REFERENCES `eleitores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_orgEleitoraId_fkey` FOREIGN KEY (`orgEleitoraId`) REFERENCES `organizacoes_eleitoras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
