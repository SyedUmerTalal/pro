-- AlterTable
ALTER TABLE `plates` MODIFY `status` ENUM('PENDING', 'APPROVED', 'DECLINE') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `users` MODIFY `status` ENUM('PENDING', 'APPROVED', 'DECLINE') NOT NULL DEFAULT 'PENDING';