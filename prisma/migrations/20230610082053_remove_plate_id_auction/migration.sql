/*
  Warnings:

  - You are about to drop the column `plateId` on the `auction_plates` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `auction_plates` DROP FOREIGN KEY `auction_plates_plateId_fkey`;

-- AlterTable
ALTER TABLE `auction_plates` DROP COLUMN `plateId`;

-- AddForeignKey
ALTER TABLE `auction_plates` ADD CONSTRAINT `auction_plates_id_fkey` FOREIGN KEY (`id`) REFERENCES `plates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
