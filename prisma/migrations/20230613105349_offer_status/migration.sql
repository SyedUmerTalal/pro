-- AlterTable
ALTER TABLE `offers` ADD COLUMN `status` ENUM('PENDING', 'APPROVE', 'DECLINE', 'COUNTER') NOT NULL DEFAULT 'PENDING';
