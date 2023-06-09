/*
  Warnings:

  - Added the required column `userId` to the `plates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `plates` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `comments` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `plates` ADD CONSTRAINT `plates_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
