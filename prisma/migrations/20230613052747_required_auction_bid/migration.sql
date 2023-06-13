/*
  Warnings:

  - Made the column `auctionId` on table `bids` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `bids` DROP FOREIGN KEY `bids_auctionId_fkey`;

-- AlterTable
ALTER TABLE `bids` MODIFY `auctionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `bids` ADD CONSTRAINT `bids_auctionId_fkey` FOREIGN KEY (`auctionId`) REFERENCES `auctions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
