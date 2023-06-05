/*
  Warnings:

  - You are about to drop the `headersiteidentity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `headersiteidentity` DROP FOREIGN KEY `HeaderSiteIdentity_id_fkey`;

-- DropTable
DROP TABLE `headersiteidentity`;

-- CreateTable
CREATE TABLE `header_site_identity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `header_site_identity_title_key`(`title`),
    UNIQUE INDEX `header_site_identity_tag_key`(`tag`),
    UNIQUE INDEX `header_site_identity_logo_key`(`logo`),
    UNIQUE INDEX `header_site_identity_icon_key`(`icon`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `header_menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `navigations` (
    `name` ENUM('HOME', 'SELL', 'AUCTIONS', 'ABOUT', 'FAQS', 'RESULTS', 'CONTACT_US') NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `headerMenuId` INTEGER NOT NULL,

    UNIQUE INDEX `navigations_name_key`(`name`),
    UNIQUE INDEX `navigations_label_key`(`label`),
    UNIQUE INDEX `navigations_url_key`(`url`),
    UNIQUE INDEX `navigations_headerMenuId_key`(`headerMenuId`),
    PRIMARY KEY (`name`, `label`, `url`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `header_site_identity` ADD CONSTRAINT `header_site_identity_id_fkey` FOREIGN KEY (`id`) REFERENCES `Header`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `header_menu` ADD CONSTRAINT `header_menu_id_fkey` FOREIGN KEY (`id`) REFERENCES `Header`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `navigations` ADD CONSTRAINT `navigations_headerMenuId_fkey` FOREIGN KEY (`headerMenuId`) REFERENCES `header_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
