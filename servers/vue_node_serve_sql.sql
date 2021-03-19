/*
Navicat MySQL Data Transfer

Source Server         : node_serve
Source Server Version : 80023
Source Host           : localhost:3306
Source Database       : vue_node_serve_sql

Target Server Type    : MYSQL
Target Server Version : 80023
File Encoding         : 65001

Date: 2021-03-19 16:35:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for base_list
-- ----------------------------
DROP TABLE IF EXISTS `base_list`;
CREATE TABLE `base_list` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `num` varchar(20) COLLATE utf8_bin NOT NULL,
  `sex` int NOT NULL,
  `category` int NOT NULL,
  `img_path` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `state` int NOT NULL,
  `create_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of base_list
-- ----------------------------
INSERT INTO `base_list` VALUES ('1', '我这是js', '001', '1', '1', 'https://images.pexels.com/photos/5929761/pexels-photo-5929761.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', '1', '2020-12-10 12:12:12');
INSERT INTO `base_list` VALUES ('2', '我这是node', '002', '2', '1', 'https://images.pexels.com/photos/5413721/pexels-photo-5413721.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', '2', '2020-12-11 12:12:12');
INSERT INTO `base_list` VALUES ('3', '我这是css', '003', '2', '2', 'https://images.pexels.com/photos/5876222/pexels-photo-5876222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', '1', '2020-12-12 12:12:12');
INSERT INTO `base_list` VALUES ('4', '我这是java', '004', '1', '2', 'https://images.pexels.com/photos/5876222/pexels-photo-5876222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', '2', '2020-12-13 12:12:12');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `user_id` bigint NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `user_password` varchar(255) COLLATE utf8_bin NOT NULL,
  `creat_by` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', 'admin', 'admin', '2021-02-19 10:55:18');
INSERT INTO `user_info` VALUES ('2', 'xiaohua', '111111', '2021-02-19 11:08:07');
