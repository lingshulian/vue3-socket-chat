# Host: 127.0.0.1  (Version 8.0.12)
# Date: 2022-07-01 17:26:20
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "user"
#

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id，自增',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '用户名',
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '昵称',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '密码',
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '手机号',
  `online_status` tinyint(4) DEFAULT NULL COMMENT '在线状态',
  `avatar` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '头像',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '邮箱',
  `session_history` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '历史会话',
  `chat_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'socketId',
  `timestamp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`,`nick_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

#
# Data for table "user"
#

REPLACE INTO `user` VALUES (1,'cacb9f21656613953063','cacb9f21656613953063','66ce2829f028ecd01cf1553172e347c5',NULL,0,'/avatar/1.jpg','456@lingshulian.com',NULL,'rG-Aa6LrWvHqLwUjAAAz','1656618941158'),(2,'d869e5b1656613910852','d869e5b1656613910852','66ce2829f028ecd01cf1553172e347c5',NULL,0,'/avatar/4.jpg','123@lingshulian.com',NULL,'vbtvKLOAKve-vjslAAAj','1656618578241'),(3,'5b0b4901656618173483','5b0b4901656618173483','66ce2829f028ecd01cf1553172e347c5',NULL,0,'/avatar/2.jpg','789@lingshulian.com',NULL,'ft_ihrYlvGND6K4cAAAf','1656618329382');
