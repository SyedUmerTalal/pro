/*
  Warnings:

  - Added the required column `headerMenuId` to the `navigations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `navigations` DROP FOREIGN KEY `navigations_id_fkey`;

-- AlterTable
ALTER TABLE `navigations` ADD COLUMN `headerMenuId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `navigations` ADD CONSTRAINT `navigations_headerMenuId_fkey` FOREIGN KEY (`headerMenuId`) REFERENCES `header_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
