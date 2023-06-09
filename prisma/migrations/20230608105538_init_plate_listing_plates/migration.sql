-- CreateTable
CREATE TABLE `plates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `combination` VARCHAR(191) NOT NULL,
    `askingPrice` DECIMAL(65, 30) NOT NULL,
    `comments` VARCHAR(191) NOT NULL,
    `purpose` ENUM('LISTING', 'AUCTION') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `plates_combination_key`(`combination`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `listing_plates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `open_for_price` BOOLEAN NOT NULL DEFAULT false,
    `settlePrice` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `listing_plates` ADD CONSTRAINT `listing_plates_id_fkey` FOREIGN KEY (`id`) REFERENCES `plates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
