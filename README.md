<h1 align="center"> 澈地 Earth Insight </h1>
<p align="center">仰以观于天文,俯以察于地理</p>
<p align="center">手机网页在线体验：<a href="http://8.130.168.215:8003/" target="_blank">@澈地 EarthInsight</a></p>

## 仓库介绍

本仓库是澈地网页版的完整开源代码，澈地项目是使用 Vue 和 Cesium 作为前端基础搭建，此项目的后端目前使用的是 Koa2+MySQL 简单搭建。如果你想体验本项目的效果，可以使用手机访问[此链接](http://8.130.168.215:8003/)。

## 项目起源

本项目并不是笔者的原创项目，笔者可以算作实施者，本项目的想法来自于笔者大学恩师刘老师的想法，在恩师的指导下，笔者的学弟学妹靠这个项目获得了 IOS 设计大赛的一等奖，当时笔者并没有参与此项目。临近毕业时，恩师将此题目作为我的毕业设计，至此，本项目就诞生了。我这可以算是站在巨人的肩膀上看世界，在恩师和学弟学妹的基础上开发此项目，可以说没有他们的支持和想法就没有此项目。在这里特别感谢恩师刘老师和 21 界的学弟学妹的支持。

## 开发计划

### 整体架构：

- [x] 前端 Vue+Cesium 的移动端基础构建
- [x] 后端 Koa2+MySQL 的快速搭建
- [x] 使用安卓嵌套 WebView 搭建手机 APP
- [ ] 使用 Typescript 对项目进行重构
- [ ] 使用 Nest.js 对后端进行重构
- [ ] 迁移到 React Native 或 Flutter 来进行更底层的 APP 开发

### 软件功能：

- [x] 基础对跖点功能
- [x] 登录功能
- [x] 收藏功能
- [x] 暗夜主题适配
- [x] 用户自定义头像
- [ ] 收藏搜索功能
- [ ] 评论留言模块
- [ ] 标志景点和兴趣点功能
- [ ] 好友功能
- [ ] 分享功能

## 结构说明

```
|-- .vscode
|-- public // 静态文件
	|-- assets
		|-- Cesium  // 需要在node_modules自行引入
    |-- assets  // 静态资源
    |-- hooks  // 封装的hooks函数
    |-- js  // 所需js文件
    |-- router  // 路由文件
    |-- services  // axios请求封装
    |-- store  // pinia状态管理
    |-- views  // 页面视图
    |-- App.vue  // 主页面
    |-- main.js
|-- gitignore
|-- README.md
|-- index.html
|-- jsconfig.json
|-- package.json
|-- vite.config.js
|-- yarn.lock
```

## 快速上手

1. 安装依赖

```
yarn
```

2. 将 node_modeles 中 cesium -- Build 里面的 Cesium 整个文件夹复制到 public -- assets 中
3. 运行

```sh
yarn dev
```

## 关于笔者

<div style="display:flex;justify-content:center;">
  <img src="http://8.130.168.215/img/logo.svg" style="width:200px;border-radius: 50px;" />
</div>

24 年毕业，专业为地理信息科学，热爱学习和分享

### 个人相关链接

- [个人博客](http://8.130.168.215/)
- [Bilibili](https://space.bilibili.com/85965726?spm_id_from=333.1007.0.0)
- [Github](https://github.com/earstrive)

### 联系我

**邮箱:earstrive@gmail.com**

## 特别鸣谢

指导老师刘老师

<a href="https://github.com/jougisljs">
  <img src="https://avatars.githubusercontent.com/u/94372129?v=4" style="width:100px;border-radius: 50px;" />
</a>

仓库贡献者

<div style="display:grid;grid-template-columns: repeat(auto-fill,minmax(100px,auto));gap: 10px;">
    <img src="http://8.130.168.215:8003/image/li.jpg" style="width:80px;border-radius: 50%;" />
    <img src="http://8.130.168.215:8003/image/kan.jpg" style="width:80px;border-radius: 50%;" />
    <img src="http://8.130.168.215:8003/image/cui.jpg" style="width:80px;border-radius: 50%;" />
    <img src="http://8.130.168.215:8003/image/tao.jpg" style="width:80px;border-radius: 50%;" />
    <img src="http://8.130.168.215:8003/image/long.jpg" style="width:80px;border-radius: 50%;" />
</div>
