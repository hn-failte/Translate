-- 新建数据库

CREATE DATABASE translate;

USE translate;

SET FOREIGN_KEY_CHECKS=0;

-- 新建表

DROP TABLE IF EXISTS `words`;

CREATE TABLE `words` (
  `word_key` varchar(20) NOT NULL DEFAULT '',
  `word_value` text NOT NULL,
  `word_hard` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `word_repeat` tinyint(4) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`word_key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 新建用户

CREATE USER newUser IDENTIFIED BY "123456";

GRANT All ON translate.words TO 'newUser'@'%';