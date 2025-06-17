-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: rentohome
-- ------------------------------------------------------
-- Server version	8.0.39
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `home_id` int NOT NULL,
  `user_id` int NOT NULL,
  `text` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `home_id` (`home_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`home_id`) REFERENCES `homes` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (90,50,41,'╤ä╤ï╨▓╨░╤ï╨░╤ï╤ä╨▓','2025-05-27 09:36:51'),(92,43,41,'sadfasfasfas','2025-05-31 13:22:22');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `homes`
--

DROP TABLE IF EXISTS `homes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `homes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `price` int NOT NULL,
  `square` varchar(10) NOT NULL,
  `class` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `user` int NOT NULL,
  `likes` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `homes_ibfk_1` (`user`),
  CONSTRAINT `homes_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `homes`
--

LOCK TABLES `homes` WRITE;
/*!40000 ALTER TABLE `homes` DISABLE KEYS */;
INSERT INTO `homes` VALUES (40,'Cozy Apartament',125,'125','Budget','Apartament','Latvia','Very Good View',27,4),(41,'Dubai Beach',2500,'900','Premium','Apartament','Estonia','The best of the best',13,0),(43,'Chilly Place',1500,'400','Premium','Apartament','Estonia','Beautiful view and good friendly neighbours, Free parking',39,4),(44,'Big House',150,'50','Budget','House','Latvia','Very good',30,0),(49,'Dream House',1500,'800','Premium','House','Estonia','best of the best',42,1),(50,'Membero Pastarno',50,'39','Budget','Apartament','Estonia','Very good apartament',13,1),(52,'Gandabi Sukralozo',775,'250','Medium','Apartament','Estonia','Good view and free parking, friendly neighbours',48,2);
/*!40000 ALTER TABLE `homes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `originalName` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `home_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `position` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `home_id` (`home_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`home_id`) REFERENCES `homes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `images_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (26,'d1222e21-12de-49ec-8a5f-953a36f40173.png','india3.png','http://localhost:4000/images/d1222e21-12de-49ec-8a5f-953a36f40173.png',NULL,NULL,NULL),(27,'cfff54e0-979e-4e4c-8236-7d1d461894d3.jpeg','apart1.jpeg','http://localhost:4000/images/cfff54e0-979e-4e4c-8236-7d1d461894d3.jpeg',NULL,NULL,NULL),(28,'ca46933b-b97f-4093-92f9-0839bbc91311.jpg','india2.jpg','http://localhost:4000/images/ca46933b-b97f-4093-92f9-0839bbc91311.jpg',NULL,NULL,0),(29,'984903a7-80e2-4d91-9fab-0bac52c3f30e.jpg','luxuryapart3.jpg','http://localhost:4000/images/984903a7-80e2-4d91-9fab-0bac52c3f30e.jpg',NULL,NULL,0),(44,'446d8d1e-128b-4710-9e26-08ab1c417d4b.jpeg','apart1.jpeg','http://localhost:4000/images/446d8d1e-128b-4710-9e26-08ab1c417d4b.jpeg',40,NULL,0),(45,'370f6256-117e-4585-afbd-6c230037282f.jpg','apart2.jpg','http://localhost:4000/images/370f6256-117e-4585-afbd-6c230037282f.jpg',40,NULL,1),(47,'a83d6485-3960-4267-8199-6591de273460.jpg','apart3.jpg','http://localhost:4000/images/a83d6485-3960-4267-8199-6591de273460.jpg',40,NULL,2),(48,'47f612f0-3d79-4416-829b-a2f144418c11.jpg','india2.jpg','http://localhost:4000/images/47f612f0-3d79-4416-829b-a2f144418c11.jpg',NULL,NULL,0),(49,'14a195ca-a094-4321-a56c-d5ca25e6707b.jpg','luxuryapart1.jpg','http://localhost:4000/images/14a195ca-a094-4321-a56c-d5ca25e6707b.jpg',41,NULL,0),(50,'7b43a709-0e34-4d30-8917-abdef64475c0.jpeg','luxuryapart2.jpeg','http://localhost:4000/images/7b43a709-0e34-4d30-8917-abdef64475c0.jpeg',41,NULL,1),(51,'be0e85ee-4914-40af-bedf-fb814a69fe8e.jpg','luxuryapart3.jpg','http://localhost:4000/images/be0e85ee-4914-40af-bedf-fb814a69fe8e.jpg',41,NULL,2),(53,'22abe650-63ef-475a-babd-4aa9568c971e.png','guest.png','http://localhost:4000/images/22abe650-63ef-475a-babd-4aa9568c971e.png',NULL,NULL,0),(54,'0ddf2510-c63e-4d43-a06c-24a9b8bfccef.jpg','felix-2-5ac3.jpg','http://localhost:4000/images/0ddf2510-c63e-4d43-a06c-24a9b8bfccef.jpg',NULL,NULL,0),(55,'393301b8-1b58-4395-8910-8619903d57a6.jpg','felix-1-turkuaz_266385546.jpg','http://localhost:4000/images/393301b8-1b58-4395-8910-8619903d57a6.jpg',NULL,NULL,0),(56,'048d5203-b8d2-4965-9280-c36194aa4d63.jpg','felix-2-5ac3.jpg','http://localhost:4000/images/048d5203-b8d2-4965-9280-c36194aa4d63.jpg',NULL,NULL,0),(57,'502db1a5-8b8a-4b13-8c16-3157182cc6be.jpg','felix-1-turkuaz_266385546.jpg','http://localhost:4000/images/502db1a5-8b8a-4b13-8c16-3157182cc6be.jpg',NULL,NULL,0),(58,'fc8bdb7c-338c-452b-a4d6-d74ea264ffdc.jpg','felix-2-5ac3.jpg','http://localhost:4000/images/fc8bdb7c-338c-452b-a4d6-d74ea264ffdc.jpg',NULL,NULL,0),(59,'85259d60-8aae-487a-a729-8b8aed12b9c1.jpg','felix-2-5ac3.jpg','http://localhost:4000/images/85259d60-8aae-487a-a729-8b8aed12b9c1.jpg',NULL,NULL,0),(65,'774db8c9-53c9-4838-83d1-af9efcd1ac72.jpg','hero-slide@1x.jpg','http://localhost:4000/images/774db8c9-53c9-4838-83d1-af9efcd1ac72.jpg',43,NULL,0),(66,'43016c1c-3121-4103-b65c-8dfa91041512.jpeg','images (1).jpeg','http://localhost:4000/images/43016c1c-3121-4103-b65c-8dfa91041512.jpeg',43,NULL,1),(67,'ad1bd267-e0ef-4b43-8a19-66598924aa71.jpeg','images.jpeg','http://localhost:4000/images/ad1bd267-e0ef-4b43-8a19-66598924aa71.jpeg',43,NULL,3),(68,'6e6062d4-f65b-4578-8037-4f015031edbe.jpeg','images (2).jpeg','http://localhost:4000/images/6e6062d4-f65b-4578-8037-4f015031edbe.jpeg',43,NULL,2),(70,'601b77d2-f668-473d-afa6-4b55c3b36253.jpg','HouseTung1.jpg','http://localhost:4000/images/601b77d2-f668-473d-afa6-4b55c3b36253.jpg',44,NULL,0),(71,'197f8854-3ba8-4e59-afe6-4a21c889ce7c.jpg','india2.jpg','http://localhost:4000/images/197f8854-3ba8-4e59-afe6-4a21c889ce7c.jpg',44,NULL,1),(77,'928b1343-21cf-404a-98f1-ba7c67708b33.jpg','felix-2-5ac3.jpg','http://localhost:4000/images/928b1343-21cf-404a-98f1-ba7c67708b33.jpg',NULL,NULL,0),(85,'6b003743-f730-4a0c-8335-e77e9fddc297.jpg','Dream house3.jpg','http://localhost:4000/images/6b003743-f730-4a0c-8335-e77e9fddc297.jpg',49,NULL,2),(86,'9c2142cf-3305-440f-a5c3-73c6d8f4dfa7.jpg','Dream house1.jpg','http://localhost:4000/images/9c2142cf-3305-440f-a5c3-73c6d8f4dfa7.jpg',49,NULL,0),(87,'8470fe1d-752e-4ba1-a582-84ef70872218.jpg','Dream house2.jpg','http://localhost:4000/images/8470fe1d-752e-4ba1-a582-84ef70872218.jpg',49,NULL,1),(88,'7d317deb-339d-4a82-9a8b-c26063ab7c89.jpg','Dream house4.jpg','http://localhost:4000/images/7d317deb-339d-4a82-9a8b-c26063ab7c89.jpg',49,NULL,3),(89,'5a8c9b1a-27ec-4300-863f-19e5517e1db4.png','SpongeBob_SquarePants_character.svg.png','http://localhost:4000/images/5a8c9b1a-27ec-4300-863f-19e5517e1db4.png',NULL,NULL,0),(90,'f6417252-8975-41de-b280-28a4ffa13e39.jpg','Dream house4.jpg','http://localhost:4000/images/f6417252-8975-41de-b280-28a4ffa13e39.jpg',41,NULL,3),(91,'ab4a94f7-8eaa-48d2-bf79-f7a8d660f4c5.jpg','item_image.jpg','http://localhost:4000/images/ab4a94f7-8eaa-48d2-bf79-f7a8d660f4c5.jpg',NULL,NULL,0),(92,'c2aca36d-8880-40b6-ac66-5fafe67922e1.jpg','Bolderaj1.jpg','http://localhost:4000/images/c2aca36d-8880-40b6-ac66-5fafe67922e1.jpg',50,NULL,0),(93,'4ea074b1-ceb0-47d1-99db-e4e0d705066a.jpg','Bolderaj2.jpg','http://localhost:4000/images/4ea074b1-ceb0-47d1-99db-e4e0d705066a.jpg',50,NULL,1),(94,'d8d6f093-886c-4314-b996-bcb3205c1f4f.jpg','elektrinis-dviratis-brooklyn-urban-28-juodas-f2d23_reference.jpg','http://localhost:4000/images/d8d6f093-886c-4314-b996-bcb3205c1f4f.jpg',NULL,NULL,0),(95,'6f82d660-bc2d-4316-99f2-c39415456392.jpg','elektrinis-dviratis-brooklyn-urban-28-juodas-f2d23_reference.jpg','http://localhost:4000/images/6f82d660-bc2d-4316-99f2-c39415456392.jpg',NULL,NULL,0),(99,'6b5318cb-486b-417c-80ee-eeebce8f55bd.jpg','Sukraloza1.jpg','http://localhost:4000/images/6b5318cb-486b-417c-80ee-eeebce8f55bd.jpg',52,NULL,0),(100,'2ff1ceb3-043b-45c6-91db-f4ff3e3b03d7.jpg','Sukraloza2.jpg','http://localhost:4000/images/2ff1ceb3-043b-45c6-91db-f4ff3e3b03d7.jpg',52,NULL,1),(102,'a4892336-bc01-42f2-afa5-03e079e78d84.jpg','Sukraloza3.jpg','http://localhost:4000/images/a4892336-bc01-42f2-afa5-03e079e78d84.jpg',52,NULL,2),(108,'9d60ccca-b187-49dd-9810-e2becbfb251f.jpg','pol_pm_Kieszonka-na-sztucce-2szt-swiateczne-etui-skrzaty-czerwone-ozdoba-swiateczna-30047_1.jpg','http://localhost:4000/images/9d60ccca-b187-49dd-9810-e2becbfb251f.jpg',NULL,NULL,0);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `home_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_like` (`home_id`,`user_id`),
  KEY `likes_ibfk_2` (`user_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`home_id`) REFERENCES `homes` (`id`),
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (175,40,12),(178,40,27),(116,40,31),(190,40,39),(199,40,41),(176,43,12),(174,43,13),(179,43,27),(128,43,30),(125,43,39),(196,43,43),(181,50,41),(188,52,41),(187,52,48);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refreshtokens`
--

DROP TABLE IF EXISTS `refreshTokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refreshTokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` text NOT NULL,
  `user` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `refreshTokens_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=348 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refreshtokens`
--

LOCK TABLES `refreshTokens` WRITE;
/*!40000 ALTER TABLE `refreshTokens` DISABLE KEYS */;
INSERT INTO `refreshTokens` VALUES (347,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsInVzZXJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImF2YXRhciI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC9pbWFnZXMvZ3Vlc3QucG5nIiwicGFzc3dvcmQiOiIkMmIkMTAkbFguV3FWOVJkazVtS3JDeGJ3dmxSZU5WOXQuWWNBOWdkMWxIUGJPdHA4SnhQQTI2VFVObnkiLCJnb29nbGVfaWQiOm51bGwsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MDE1NzMwNSwiZXhwIjoxNzUwMjQzNzA1fQ.QceoBdtCWsynWkE-5reoxCzMa9EchEMWy8HMBsQIn0w',41);
/*!40000 ALTER TABLE `refreshTokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `google_id` (`google_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'Ksenija','ksenija@gmail.com','http://localhost:4000/images/37f281c2-8fd5-4a5f-b2ae-9fc631c01b1c.png','$2b$10$rdHCtHIqFCV2eKC.I3SLs.p/T8R70DZ8iKt95UmPlx/S9sCpzr/pW',NULL,'user'),(13,'Sssashka','sashka@gmail.com','http://localhost:4000/images/90a8172b-4280-4e65-a1af-86f820561e82.jpg','$2b$10$bpDKy7BtxpSAou1kLH8WCexONVGKZsGD77nR8Q.Ef06.fUQS29uXm',NULL,'user'),(16,'Gleb','gleb@gmail.com','http://localhost:4000/images/70078fcc-e71b-4b88-ac83-39c3a2c6ffb9.png','$2b$10$zCgfFbo4KifeMq.MH2itE.vxcN6nr4QzQDb1sefP1SO9eRzGcLN7C',NULL,'user'),(27,'Zhenja','zhenja@gmail.com','http://localhost:4000/images/22abe650-63ef-475a-babd-4aa9568c971e.png','$2b$10$by2uqejr.UkiaVqfqZ7GReKXYb/0xEQT9PohV3qAHe1urUTfbyTHy',NULL,'user'),(30,'Jevgenijs1','jevgenijs@gmail.com','http://localhost:4000/images/28e0d711-1368-42b7-a64a-27afdd528da3.jpg','$2b$10$VAvsfyo2bQIZzyMpMrbO9OgC50EXKSkBJ0ZwPKYfT8lTbm4KYiR1S',NULL,'user'),(31,'Jevgexa','asdfas@gmail.com','http://localhost:4000/images/guest.png','$2b$10$5rqdFqKtJrQ/YgI4PJoFVOOO0Fn3ZDeZJ7u4d108D4fYAoqj0YLvS',NULL,'user'),(39,'Daniels','daniels@gmail.com','http://localhost:4000/images/85259d60-8aae-487a-a729-8b8aed12b9c1.jpg','$2b$10$eL2KPM3qOhJTmOGJjtRumupjtfFK2MOO7iM8vAyp/vIvDJ7rM1Zi6',NULL,'user'),(41,'Admin','admin@gmail.com','http://localhost:4000/images/guest.png','$2b$10$lX.WqV9Rdk5mKrCxbwvlReNV9t.YcA9gd1lHPbOtp8JxPA26TUNny',NULL,'admin'),(42,'Zheka','zheka@gmail.com','http://localhost:4000/images/5a8c9b1a-27ec-4300-863f-19e5517e1db4.png','$2b$10$KQCqTvCNiVmaPW3WiP3.5.6FPfCwzO6rsYJZlQsolN0RFXUKaKcyW',NULL,'user'),(43,'Danik','danik@gmail.com','http://localhost:4000/images/ab4a94f7-8eaa-48d2-bf79-f7a8d660f4c5.jpg','$2b$10$MM5DU0pM51FSM/I/Tj06tu4Z9dN2YvZf0v9xy4u/aiXiPnOxEa2NS',NULL,'user'),(48,'Evgrasij','evgrasij@gmail.com','http://localhost:4000/images/guest.png','$2b$10$9cr947wTSf9Dpi2MYCtvPu60eRyG3rfeTu.PSRBeemy.a1zCaguai',NULL,'user'),(57,'Sashka','sashka123@gmail.com','http://localhost:4000/images/guest.png','$2b$10$UusH2J5wsAXCvM5cAq2mkuhN3tMH2yqVWKB1lsyiYjNSoz.F7kURm',NULL,'user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-17 14:01:15

