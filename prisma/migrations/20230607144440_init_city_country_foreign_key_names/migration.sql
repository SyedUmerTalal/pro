/*
  Warnings:

  - You are about to drop the column `userId` on the `cities` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `countries` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `cities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `countries` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `cities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `countries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cities` DROP FOREIGN KEY `cities_userId_fkey`;

-- DropForeignKey
ALTER TABLE `countries` DROP FOREIGN KEY `countries_userId_fkey`;

-- AlterTable
ALTER TABLE `cities` DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `countries` DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `cities_user_id_key` ON `cities`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `countries_user_id_key` ON `countries`(`user_id`);

-- AddForeignKey
ALTER TABLE `countries` ADD CONSTRAINT `countries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cities` ADD CONSTRAINT `cities_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
