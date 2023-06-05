/*
  Warnings:

  - You are about to drop the column `label` on the `pages` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `pages` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `pages_label_key` ON `pages`;

-- DropIndex
DROP INDEX `pages_url_key` ON `pages`;

-- AlterTable
ALTER TABLE `pages` DROP COLUMN `label`,
    DROP COLUMN `url`,
    MODIFY `name` ENUM('HEADER', 'FOOTER', 'HOME', 'BUY', 'SELL', 'AUCTIONS', 'ABOUT', 'FAQS', 'RESULTS', 'CONTACT_US') NOT NULL;

-- CreateTable
CREATE TABLE `header_configuration` (
    `configuration_id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`configuration_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `navigations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `page` ENUM('HEADER', 'FOOTER', 'HOME', 'BUY', 'SELL', 'AUCTIONS', 'ABOUT', 'FAQS', 'RESULTS', 'CONTACT_US') NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `headerConfigurationId` INTEGER NULL,

    UNIQUE INDEX `navigations_page_key`(`page`),
    UNIQUE INDEX `navigations_text_key`(`text`),
    UNIQUE INDEX `navigations_url_key`(`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeaderButton` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `button` ENUM('LOGIN', 'SIGN_UP') NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `headerConfigurationId` INTEGER NULL,

    UNIQUE INDEX `HeaderButton_button_key`(`button`),
    UNIQUE INDEX `HeaderButton_text_key`(`text`),
    UNIQUE INDEX `HeaderButton_url_key`(`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `header_configuration` ADD CONSTRAINT `header_configuration_configuration_id_fkey` FOREIGN KEY (`configuration_id`) REFERENCES `pages`(`page_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `navigations` ADD CONSTRAINT `navigations_headerConfigurationId_fkey` FOREIGN KEY (`headerConfigurationId`) REFERENCES `header_configuration`(`configuration_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderButton` ADD CONSTRAINT `HeaderButton_headerConfigurationId_fkey` FOREIGN KEY (`headerConfigurationId`) REFERENCES `header_configuration`(`configuration_id`) ON DELETE SET NULL ON UPDATE CASCADE;
