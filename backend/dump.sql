-- bumtobundle.`user` definition

CREATE TABLE
    `user` (
        `id` int NOT NULL AUTO_INCREMENT,
        `firstname` varchar(100) NOT NULL,
        `lastname` varchar(100) NOT NULL,
        `email` varchar(100) NOT NULL,
        `password` varchar(100) NOT NULL,
        `user_type` varchar(100) NOT NULL DEFAULT 'visitor',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 32 DEFAULT CHARSET = utf8mb4;

-- bumtobundle.list definition

CREATE TABLE
    `list` (
        `id` int NOT NULL AUTO_INCREMENT,
        `listname` varchar(100) NOT NULL,
        `duedate` date NOT NULL,
        `sex` varchar(100) NOT NULL,
        `babysname` varchar(100) DEFAULT NULL,
        `user_ID` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `list_FK` (`user_ID`),
        CONSTRAINT `list_FK` FOREIGN KEY (`user_ID`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4;

-- bumtobundle.item definition

CREATE TABLE
    `item` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(100) NOT NULL,
        `quantity` int NOT NULL,
        `category` varchar(100) NOT NULL,
        `link` varchar(400) CHARACTER SET utf8mb4 DEFAULT NULL,
        `photo` varchar(200) DEFAULT NULL,
        `details` varchar(300) DEFAULT NULL,
        `status` tinyint(1) NOT NULL DEFAULT '1',
        `list_ID` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `item_FK` (`list_ID`),
        CONSTRAINT `item_FK` FOREIGN KEY (`list_ID`) REFERENCES `list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 18 DEFAULT CHARSET = utf8mb4;

-- bumtobundle.user_has_gift definition

CREATE TABLE
    `user_has_gift` (
        `ID` int NOT NULL AUTO_INCREMENT,
        `user_id` int NOT NULL,
        `gift_id` int NOT NULL,
        `quantity` int NOT NULL,
        PRIMARY KEY (`ID`),
        KEY `user_has_gift_FK` (`user_id`),
        KEY `user_has_gift_FK_1` (`gift_id`),
        CONSTRAINT `user_has_gift_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `user_has_gift_FK_1` FOREIGN KEY (`gift_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 20 DEFAULT CHARSET = utf8mb4;