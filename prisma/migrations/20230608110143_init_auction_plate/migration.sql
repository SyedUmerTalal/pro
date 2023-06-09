-- CreateTable
CREATE TABLE `auction_plates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_reserve` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auction_plates` ADD CONSTRAINT `auction_plates_id_fkey` FOREIGN KEY (`id`) REFERENCES `plates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
