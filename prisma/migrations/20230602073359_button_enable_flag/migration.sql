/*
  Warnings:

  - Added the required column `is_enable` to the `HeaderButton` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `headerbutton` ADD COLUMN `is_enable` BOOLEAN NOT NULL;
