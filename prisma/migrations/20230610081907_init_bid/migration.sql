/*
  Warnings:

  - A unique constraint covering the columns `[plateId]` on the table `auction_plates` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `auction_plates` DROP FOREIGN KEY `auction_plates_id_fkey`;

-- AlterTable
ALTER TABLE `auction_plates` ADD COLUMN `plateId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Auction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plate_id` INTEGER NOT NULL,
    `starting_price` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `end_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Auction_plate_id_key`(`plate_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bids` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DECIMAL(65, 30) NOT NULL,
    `userId` INTEGER NOT NULL,
    `auctionId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `auction_plates_plateId_key` ON `auction_plates`(`plateId`);

-- AddForeignKey
ALTER TABLE `auction_plates` ADD CONSTRAINT `auction_plates_plateId_fkey` FOREIGN KEY (`plateId`) REFERENCES `plates`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Auction` ADD CONSTRAINT `Auction_plate_id_fkey` FOREIGN KEY (`plate_id`) REFERENCES `auction_plates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bids` ADD CONSTRAINT `bids_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bids` ADD CONSTRAINT `bids_auctionId_fkey` FOREIGN KEY (`auctionId`) REFERENCES `Auction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
