/*
Navicat MySQL Data Transfer

Source Server         : failte
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : translate

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-05-04 13:46:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for words
-- ----------------------------
DROP TABLE IF EXISTS `words`;
CREATE TABLE `words` (
  `word_key` varchar(20) NOT NULL DEFAULT '',
  `word_value` text NOT NULL,
  `word_hard` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `word_repeat` tinyint(4) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`word_key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
