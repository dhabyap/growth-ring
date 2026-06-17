-- CreateTable
CREATE TABLE `profiles` (
    `id` VARCHAR(191) NOT NULL,
    `x_username` VARCHAR(191) NOT NULL,
    `display_name` VARCHAR(191) NOT NULL,
    `bio` TEXT NULL,
    `avatar_url` VARCHAR(191) NULL,
    `niche` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `looking_for` JSON NOT NULL,
    `last_active` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `profiles_x_username_key`(`x_username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
