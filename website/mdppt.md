---
title: Mdppt - 一个使用Markdown轻松创建漂亮的演示文稿的框架
meta: 据说是挺好用的markdown转化幻灯片工具
url: https://github.com/ftb/mdppt
codeStyle: 'toy'
---

<slide class="bg-apple" :class="w60 auto alignCenter" image="https://mdppt-1254319003.cos.ap-chengdu.myqcloud.com/sea2.jpg darkLight">

# M D P P T {.f60}
---
一个使用Markdown轻松创建漂亮的演示文稿的框架 {.animated .fadeInUp .delay-300 .sub-text}
</slide>

<slide :class="w40 auto alignCenter">
## Hot to use MDPPT?

---
```js
npm install @mdppt/cli -g

mdppt new mdppt.md

mdppt serve mdppt.md

mdppt build mdppt.md
```
</slide>

<slide class="bg-royal" :class="w40 auto alignCenter">
## Main Features

---
- Keyboard Shortcuts {.animated .fadeInUp}
- Style className {.animated .fadeInUp .delay-300}
- Support Background Image {.animated .fadeInUp .delay-700} 
- Support Animation {.animated .fadeInUp .delay-1000}
- Support Build Mutliple Page {.animated .fadeInUp .delay-1200}
</slide>

<slide :class="w40 auto alignCenter">
## Keyboard Shortcuts

---
- Page Next: ↓/→ {.animated .fadeInUp}
- Page Prev: ↑/← {.animated .fadeInUp .delay-300}
- FullScreen: F {.animated .fadeInUp .delay-500} 
- Preview: -/+ {.animated .fadeInUp .delay-800}
{.w70}
</slide>

<slide :class="w50 auto alignCenter">
## How to add animation?

---
```js
- Keyboard Shortcuts {.animated .fadeInUp}

- Style className {.animated .fadeInUp .delay-400}

- Support Background Image {.animated .fadeInUp .delay-800} 

- Support Animation {.animated .fadeInUp .delay-1200}

- Support Build Mutliple Page {.animated .fadeInUp .delay-1400}
```
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

  assetsDir: 'assets'

  ...
}
```

</slide>
