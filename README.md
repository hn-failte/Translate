# 星辰翻译

## 一、安装

### 1、项目源码：

`git clone https://github.com/hn-failte/Translate.git` 或 [直接下载](https://github.com/hn-failte/Translate/archive/master.zip)

### 2、项目依赖：

`npm install`

### 3、数据库依赖

项目数据存储依赖于MySQL，需要将 `translate.sql` 文件执行一次，会创建translate数据库，创建words表，创建能访问该表的用户，名称均可在sql文件中修改

## 二、操作

* 后台启动：`npm run start` 或 `npm start`
* 停止运行：`npm stop`
* 重启：`npm restart`
* 调试：`node server`

## 三、介绍

* 借助百度翻译API实现个性化的翻译页面
* 可互相转换的语种达29种
* 基于Node服务器路由，目前配置支持常用的文本、网页、音频、视频文件等
* 使用Node提供和接口，对JSON支持极佳
* 具有生词本功能，对搜索过的单词进一步学习
* 使用MySQL进行数据管理
* 项目的访问网址为: `http://127.0.0.1:3000`

## 四、注意事项

项目是在winodws上搭建的，其他平台可能操作上会存在部分差异，请注意调整