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
## How to use MDPPT?

---
```js
npm install @mdppt/cli -g

mdppt new mdppt.md

mdppt serve mdppt.md

mdppt build mdppt.md
```
</slide>

<slide :class="w60 auto alignCenter">
## How to start a multi page project?

---
1. Create a mdppt.config.js to start enable {.alignLeft}
```js
module.exports = {
  pages: {
    enable: true
  }
}
```

2. Excute below command in your project. {.alignLeft}

```js
mdppt serve .

mdppt build .
```
</slide>

<slide class="bg-royal" :class="w40 auto alignCenter">
## Main Features

---
- Keyboard Shortcuts {.animated .fadeInUp}
- Style className {.animated .fadeInUp .delay-400}
- Support Background Image {.animated .fadeInUp .delay-800} 
- Support Animation {.animated .fadeInUp .delay-1200}
- Support Build Mutliple Page {.animated .fadeInUp .delay-1400}
</slide>

<slide :class="w40 auto alignCenter">
## Keyboard Shortcuts

---
- Page Next: ↓/→
- Page Prev: ↑/←
- FullScreen: F
- Preview: -/+
- Multi Pages Navigation: E
{.w70 .animated .fadeInUp}
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
