CREATE TABLE IF NOT EXISTS `ucode_web`.`heroes`
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    description TEXT NOT NULL,
    race VARCHAR(255) NOT NULL DEFAULT 'human',
    class_role ENUM('tankman','healer','dps') NOT NULL,
    PRIMARY KEY (`id`), UNIQUE (`name`)
);