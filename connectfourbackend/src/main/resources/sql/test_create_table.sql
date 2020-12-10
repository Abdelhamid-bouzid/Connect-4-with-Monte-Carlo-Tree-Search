DROP TABLE IF EXISTS games;
CREATE TABLE IF NOT EXISTS games (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstPlayer_nickname VARCHAR(20),
    firstPlayer_color VARCHAR(5),
    firstPlayer_avatar VARCHAR(20),
    firstPlayer_difficulty VARCHAR(10),
    secondPlayer_nickname VARCHAR(20),
    secondPlayer_color VARCHAR(5),
    secondPlayer_avatar VARCHAR(20),
    secondPlayer_difficulty VARCHAR(10),
    moves TEXT,
    `timestamp` TIMESTAMP,
    inProgress BIT
);
