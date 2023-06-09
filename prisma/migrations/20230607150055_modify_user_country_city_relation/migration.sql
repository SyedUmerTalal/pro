/*
  Warnings:

  - You are about to drop the column `user_id` on the `cities` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `countries` table. All the data in the column will be lost.
  - Added the required column `city_code` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_code` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cities` DROP FOREIGN KEY `cities_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `countries` DROP FOREIGN KEY `countries_user_id_fkey`;

-- AlterTable
ALTER TABLE `cities` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `countries` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `city_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `country_code` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_country_code_fkey` FOREIGN KEY (`country_code`) REFERENCES `countries`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_city_code_fkey` FOREIGN KEY (`city_code`) REFERENCES `cities`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
