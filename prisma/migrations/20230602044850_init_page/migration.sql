-- CreateTable
CREATE TABLE `pages` (
    `page_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('HOME', 'SELL', 'AUCTIONS', 'ABOUT', 'FAQS', 'RESULTS', 'CONTACT_US') NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pages_name_key`(`name`),
    UNIQUE INDEX `pages_label_key`(`label`),
    UNIQUE INDEX `pages_url_key`(`url`),
    PRIMARY KEY (`page_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
