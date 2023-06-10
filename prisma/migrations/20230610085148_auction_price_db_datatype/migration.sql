/*
  Warnings:

  - You are about to drop the `Auction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Auction` DROP FOREIGN KEY `Auction_plate_id_fkey`;

-- DropForeignKey
ALTER TABLE `bids` DROP FOREIGN KEY `bids_auctionId_fkey`;

-- DropTable
DROP TABLE `Auction`;

-- CreateTable
CREATE TABLE `auctions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plate_id` INTEGER NOT NULL,
    `starting_price` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `end_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `auctions_plate_id_key`(`plate_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auctions` ADD CONSTRAINT `auctions_plate_id_fkey` FOREIGN KEY (`plate_id`) REFERENCES `auction_plates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bids` ADD CONSTRAINT `bids_auctionId_fkey` FOREIGN KEY (`auctionId`) REFERENCES `auctions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
