USE `ucode_web`;

CREATE TABLE IF NOT EXISTS `ucode_web`.`users` (
 id int(10) unsigned NOT NULL AUTO_INCREMENT,
 login varchar(50) NOT NULL UNIQUE,
 full_name varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
 email varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
 password varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
 PRIMARY KEY (id),
 UNIQUE KEY email (email)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;