-- Altera caminho de VARCHAR(191) para TEXT para suportar caminhos de arquivo longos
ALTER TABLE `arquivos` MODIFY COLUMN `caminho` TEXT NOT NULL;
