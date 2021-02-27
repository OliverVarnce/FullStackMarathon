CREATE TABLE IF NOT EXISTS `ucode_web`.`teams`
(
    id INT NOT NULL,
    hero_id INT NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (hero_id) REFERENCES heroes(id)
);

CREATE TABLE IF NOT EXISTS `ucode_web`.`races`
(
    id INT NOT NULL,
    hero_id INT NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (hero_id) REFERENCES heroes(id)
);

CREATE TABLE IF NOT EXISTS `ucode_web`.`powers`
(
    id INT NOT NULL,
    hero_id INT NOT NULL,
    name TEXT NOT NULL,
    points INT NOT NULL,
    type ENUM('attack','defense') NOT NULL,
    FOREIGN KEY (hero_id) REFERENCES heroes(id)
);