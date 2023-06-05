-- DropForeignKey
ALTER TABLE `header_configuration` DROP FOREIGN KEY `header_configuration_configuration_id_fkey`;

-- CreateTable
CREATE TABLE `configurations` (
    `configuration_id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`configuration_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `home_configuration` (
    `configuration_id` INTEGER NOT NULL AUTO_INCREMENT,
    `heading` VARCHAR(191) NOT NULL,
    `paragraph` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `home_configuration_heading_key`(`heading`),
    UNIQUE INDEX `home_configuration_paragraph_key`(`paragraph`),
    PRIMARY KEY (`configuration_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `configurations` ADD CONSTRAINT `configurations_configuration_id_fkey` FOREIGN KEY (`configuration_id`) REFERENCES `pages`(`page_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `header_configuration` ADD CONSTRAINT `header_configuration_configuration_id_fkey` FOREIGN KEY (`configuration_id`) REFERENCES `configurations`(`configuration_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `home_configuration` ADD CONSTRAINT `home_configuration_configuration_id_fkey` FOREIGN KEY (`configuration_id`) REFERENCES `configurations`(`configuration_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
