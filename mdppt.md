---
title: Mdppt - 简单易用的Markdown语法-网页演示库
url: https://github.com/ftb/mdppt
codeStyle: 'toy'
---

<slide class="bg-pinlan" :class="w60 auto alignCenter" image="http://h1.ioliu.cn/bing/Nebelmond_ZH-CN1304523635_1920x1080.jpg">

## M D P P T
简单易用的Markdown语法-网页演示库 {.sub-text}
</slide>

<slide :class="w40 auto alignCenter">
## How to use it?

---
```js
npm install mdppt -g

mdppt serve mdppt.md

mdppt build mdppt.md
```
</slide>

<slide class="bg-yeputaozi" :class="w40 auto alignCenter" image="http://h1.ioliu.cn//bing/SanSebastianFilm_ZH-CN5506786379_1920x1080.jpg">
## 主要功能

---
- 支持背景颜色, 图片 
- 支持添加CSS类名
- 支持快捷键
- 灵活布局
</slide>

<slide :class="w60 auto alignCenter">
## 自定义配置工程

---

- Create a `mdppt.config.js` in the root.
```js
module.exports = {
  appName: 'main',

  baseUrl: '/',

  outputDir: 'dist',

  assetsDir: 'assets'

  ...
}
```
</slide>
