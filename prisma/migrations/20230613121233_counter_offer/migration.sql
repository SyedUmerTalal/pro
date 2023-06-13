-- AlterTable
ALTER TABLE `offers` ADD COLUMN `counter` DECIMAL(18, 2) NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `offers_status_idx` ON `offers`(`status`);
