-- AlterTable: adicionar campos de endereço da segunda entidade (chapa) em organizacoes
ALTER TABLE `organizacoes`
    ADD COLUMN `chapaLogradouro` VARCHAR(200) NULL,
    ADD COLUMN `chapaNumero`     VARCHAR(20)  NULL,
    ADD COLUMN `chapaComplemento` VARCHAR(100) NULL,
    ADD COLUMN `chapaBairro`    VARCHAR(100) NULL,
    ADD COLUMN `chapaCidade`    VARCHAR(100) NULL,
    ADD COLUMN `chapaEstado`    VARCHAR(2)   NULL,
    ADD COLUMN `chapaCep`       VARCHAR(9)   NULL;
