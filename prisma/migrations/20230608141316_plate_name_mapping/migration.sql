/*
  Warnings:

  - You are about to drop the column `settlePrice` on the `listing_plates` table. All the data in the column will be lost.
  - You are about to drop the column `askingPrice` on the `plates` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `plates` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `plates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `plates` DROP FOREIGN KEY `plates_userId_fkey`;

-- AlterTable
ALTER TABLE `listing_plates` DROP COLUMN `settlePrice`,
    ADD COLUMN `settle_price` DECIMAL(18, 2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `plates` DROP COLUMN `askingPrice`,
    DROP COLUMN `userId`,
    ADD COLUMN `asking_price` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `plates` ADD CONSTRAINT `plates_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
