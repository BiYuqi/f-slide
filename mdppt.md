---
title: Mdppt - 一个使用Markdown轻松创建漂亮的演示文稿的框架
url: https://github.com/ftb/mdppt
codeStyle: 'toy'
---

<slide class="bg-pinlan" :class="w60 auto alignCenter" image="http://h1.ioliu.cn/bing/Nebelmond_ZH-CN1304523635_1920x1080.jpg">

## M D P P T
A framework for easily creating beautiful presentations using Markdown {.sub-text}
</slide>

<slide :class="w40 auto alignCenter">
## Hot to use MDPPT?

---
```js
npm install mdppt -g

mdppt serve mdppt.md

mdppt build mdppt.md
```
</slide>

<slide :class="w40 auto alignCenter" image="http://h1.ioliu.cn//bing/SanSebastianFilm_ZH-CN5506786379_1920x1080.jpg">
## Main Features

---
- Support set background with 
- Support add class
- Support keyboard
- Support flex
</slide>

<slide :class="w60 auto alignCenter">
## Custom Configuration

---

- Create a `mdppt.config.js` in the root.
- Mdppt will auto load the file and combine them replace the default configuration.

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
