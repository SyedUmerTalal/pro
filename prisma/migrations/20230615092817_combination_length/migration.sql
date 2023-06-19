/*
  Warnings:

  - You are about to alter the column `combination` on the `plates` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(4)`.

*/
-- AlterTable
ALTER TABLE `plates` MODIFY `combination` VARCHAR(4) NOT NULL;
