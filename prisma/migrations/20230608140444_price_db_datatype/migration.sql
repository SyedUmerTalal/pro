/*
  Warnings:

  - You are about to alter the column `settlePrice` on the `listing_plates` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `askingPrice` on the `plates` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.

*/
-- AlterTable
ALTER TABLE `listing_plates` MODIFY `settlePrice` DECIMAL(18, 2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `plates` MODIFY `askingPrice` DECIMAL(18, 2) NOT NULL DEFAULT 0;
