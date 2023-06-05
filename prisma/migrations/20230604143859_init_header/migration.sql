/*
  Warnings:

  - You are about to drop the `configurations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `header_configuration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `headerbutton` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `home_configuration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `navigations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `configurations` DROP FOREIGN KEY `configurations_configuration_id_fkey`;

-- DropForeignKey
ALTER TABLE `header_configuration` DROP FOREIGN KEY `header_configuration_configuration_id_fkey`;

-- DropForeignKey
ALTER TABLE `headerbutton` DROP FOREIGN KEY `HeaderButton_headerConfigurationId_fkey`;

-- DropForeignKey
ALTER TABLE `home_configuration` DROP FOREIGN KEY `home_configuration_configuration_id_fkey`;

-- DropForeignKey
ALTER TABLE `navigations` DROP FOREIGN KEY `navigations_headerConfigurationId_fkey`;

-- DropTable
DROP TABLE `configurations`;

-- DropTable
DROP TABLE `header_configuration`;

-- DropTable
DROP TABLE `headerbutton`;

-- DropTable
DROP TABLE `home_configuration`;

-- DropTable
DROP TABLE `navigations`;

-- DropTable
DROP TABLE `pages`;

-- CreateTable
CREATE TABLE `Header` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeaderSiteIdentity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `HeaderSiteIdentity_title_key`(`title`),
    UNIQUE INDEX `HeaderSiteIdentity_tag_key`(`tag`),
    UNIQUE INDEX `HeaderSiteIdentity_logo_key`(`logo`),
    UNIQUE INDEX `HeaderSiteIdentity_icon_key`(`icon`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HeaderSiteIdentity` ADD CONSTRAINT `HeaderSiteIdentity_id_fkey` FOREIGN KEY (`id`) REFERENCES `Header`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
