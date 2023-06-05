/*
  Warnings:

  - The primary key for the `navigations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `headerMenuId` on the `navigations` table. All the data in the column will be lost.
  - Added the required column `id` to the `navigations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `navigations` DROP FOREIGN KEY `navigations_headerMenuId_fkey`;

-- AlterTable
ALTER TABLE `navigations` DROP PRIMARY KEY,
    DROP COLUMN `headerMenuId`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `navigations` ADD CONSTRAINT `navigations_id_fkey` FOREIGN KEY (`id`) REFERENCES `header_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
