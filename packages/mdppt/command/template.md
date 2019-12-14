---
title: Mdppt - 一个使用Markdown轻松创建漂亮的演示文稿的框架
url: https://github.com/ftb/mdppt
codeStyle: 'toy'
---

<slide class="bg-apple" :class="w60 auto alignCenter" image="https://mdppt-1254319003.cos.ap-chengdu.myqcloud.com/valige2.jpg">

# M D P P T
一个使用Markdown轻松创建漂亮的演示文稿的框架 {.sub-text}
</slide>

<slide :class="w40 auto alignCenter">
## Hot to use MDPPT?

---
```js
npm install @mdppt/cli -g

mdppt serve mdppt.md

mdppt build mdppt.md
```
</slide>

<slide class="bg-royal" :class="w40 auto alignCenter">
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

- Create a **mdppt.config.js** in the root.
- Mdppt will auto load the file and combine them replace the default configuration.

```js
module.exports = {
  appName: 'main',

  baseUrl: '/',

  outputDir: 'dist',
  ...
}
```
</slide>
