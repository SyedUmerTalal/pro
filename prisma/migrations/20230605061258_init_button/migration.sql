-- CreateTable
CREATE TABLE `buttons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('SIGN_UP', 'LOGIN') NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `isEnable` BOOLEAN NOT NULL DEFAULT false,
    `headerMenuId` INTEGER NOT NULL,

    UNIQUE INDEX `buttons_name_key`(`name`),
    UNIQUE INDEX `buttons_text_key`(`text`),
    UNIQUE INDEX `buttons_url_key`(`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `buttons` ADD CONSTRAINT `buttons_headerMenuId_fkey` FOREIGN KEY (`headerMenuId`) REFERENCES `header_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
