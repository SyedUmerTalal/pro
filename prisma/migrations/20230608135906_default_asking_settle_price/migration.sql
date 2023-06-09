-- AlterTable
ALTER TABLE `listing_plates` MODIFY `settlePrice` DECIMAL(65, 30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `plates` MODIFY `askingPrice` DECIMAL(65, 30) NOT NULL DEFAULT 0;
