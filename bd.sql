# ************************************************************
# Sequel Pro SQL dump
# Version 5438
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 8.0.16)
# Database: ED
# Generation Time: 2019-09-29 14:16:03 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table projects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `projects`;

CREATE TABLE `projects` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;

INSERT INTO `projects` (`id`, `name`)
VALUES
	(1,'Project 01'),
	(2,'Project 02'),
	(3,'Project 03'),
	(21,'delete test');

/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table projects_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `projects_users`;

CREATE TABLE `projects_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `projects_users` WRITE;
/*!40000 ALTER TABLE `projects_users` DISABLE KEYS */;

INSERT INTO `projects_users` (`id`, `project_id`, `user_id`)
VALUES
	(1,1,1),
	(2,2,1),
	(3,3,2),
	(7,21,1);

/*!40000 ALTER TABLE `projects_users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tasks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `descricao` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;

INSERT INTO `tasks` (`id`, `project_id`, `descricao`, `created_at`, `updated_at`, `status`)
VALUES
	(1,'1','Lorem Ipsum is simply dummy text','2019-09-24 00:10:00','2019-09-27 00:10:00',1),
	(2,'1','Contrary to popular belief.','2019-09-24 00:10:00','2019-09-27 00:10:00',0),
	(3,'2','There are many variations of passages there are many variations of passages, there are many variations of passages.','2019-09-24 00:10:00','2019-09-27 00:10:00',0),
	(6,'21','hello','2019-09-29 13:54:38','2019-09-29 13:54:38',0),
	(7,'21','ola','2019-09-29 14:18:51','2019-09-29 14:18:51',0),
	(8,'21','There are many variations of passages there are many variations of passages, there are many variations of passages.','2019-09-29 14:18:55','2019-09-29 14:18:55',0),
	(9,'21','ola3','2019-09-28 14:18:59','2019-09-29 15:00:46',1),
	(10,'21','ola4','2019-09-29 14:19:02','2019-09-29 15:02:48',1),
	(11,'21','There are many variations of passages there are many variations of passages, there are many variations of passages.','2019-09-29 14:19:06','2019-09-29 14:19:06',0);

/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `passwordHash` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `passwordHash`)
VALUES
	(1,'raquelvieiraph@gmail.com','$2b$10$NEeZRbjl.QvtK.HcSt/dzOQii5.AjAnl3aziRCCz/eQNcK20VMiIy'),
	(2,'raquelvieiraph1@gmail.com','$2b$10$NEeZRbjl.QvtK.HcSt/dzOQii5.AjAnl3aziRCCz/eQNcK20VMiIy'),
	(3,'admin','$2b$10$NEeZRbjl.QvtK.HcSt/dzOQii5.AjAnl3aziRCCz/eQNcK20VMiIy');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
