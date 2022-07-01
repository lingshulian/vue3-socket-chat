# Host: 127.0.0.1  (Version 8.0.12)
# Date: 2022-07-01 17:26:43
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "chat"
#

CREATE TABLE `chat` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `send_id` bigint(20) NOT NULL COMMENT '发送人id',
  `recipient_id` bigint(20) NOT NULL COMMENT '接收人id',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '聊天内容',
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '内容类型：0html文本，1图片, 2视频',
  `status` int(11) NOT NULL COMMENT '是否发送成功：0否，1是',
  `timestamp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '时间戳',
  `create_at` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '创建时间',
  `is_read` tinyint(1) NOT NULL COMMENT '是否阅读：0否，1是',
  `avatar` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

#
# Data for table "chat"
#

