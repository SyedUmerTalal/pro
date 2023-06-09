/*
  Warnings:

  - You are about to drop the column `driving_license_uri` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `driving_license_uri`,
    ADD COLUMN `status` ENUM('PENDING', 'APPROVED') NOT NULL DEFAULT 'PENDING';
