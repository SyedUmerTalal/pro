/*
  Warnings:

  - You are about to drop the `auction_plates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `listing_plates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `auction_plates` DROP FOREIGN KEY `auction_plates_id_fkey`;

-- DropForeignKey
ALTER TABLE `auctions` DROP FOREIGN KEY `auctions_plate_id_fkey`;

-- DropForeignKey
ALTER TABLE `listing_plates` DROP FOREIGN KEY `listing_plates_id_fkey`;

-- DropTable
DROP TABLE `auction_plates`;

-- DropTable
DROP TABLE `listing_plates`;

-- CreateTable
CREATE TABLE `plates_listings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `open_for_price` BOOLEAN NOT NULL DEFAULT false,
    `settle_price` DECIMAL(18, 2) NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plates_auctions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_reserve` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `plates_listings` ADD CONSTRAINT `plates_listings_id_fkey` FOREIGN KEY (`id`) REFERENCES `plates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plates_auctions` ADD CONSTRAINT `plates_auctions_id_fkey` FOREIGN KEY (`id`) REFERENCES `plates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auctions` ADD CONSTRAINT `auctions_plate_id_fkey` FOREIGN KEY (`plate_id`) REFERENCES `plates_auctions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
