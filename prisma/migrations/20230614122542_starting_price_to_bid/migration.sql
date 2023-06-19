/*
  Warnings:

  - You are about to drop the column `starting_price` on the `auctions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `auctions` DROP COLUMN `starting_price`,
    ADD COLUMN `starting_bid` DECIMAL(18, 2) NOT NULL DEFAULT 0;
