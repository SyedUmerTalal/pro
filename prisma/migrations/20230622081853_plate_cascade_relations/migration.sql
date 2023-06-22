/*
  Warnings:

  - You are about to alter the column `end_at` on the `auctions` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `plates_auctions` DROP FOREIGN KEY `plates_auctions_id_fkey`;

-- DropForeignKey
ALTER TABLE `plates_listings` DROP FOREIGN KEY `plates_listings_id_fkey`;

-- AlterTable
ALTER TABLE `auctions` MODIFY `end_at` TIMESTAMP NOT NULL;

-- AddForeignKey
ALTER TABLE `plates_listings` ADD CONSTRAINT `plates_listings_id_fkey` FOREIGN KEY (`id`) REFERENCES `plates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plates_auctions` ADD CONSTRAINT `plates_auctions_id_fkey` FOREIGN KEY (`id`) REFERENCES `plates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
