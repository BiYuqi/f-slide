---
title: Mdppt - 一个使用Markdown轻松创建漂亮的演示文稿的框架
meta: 据说是挺好用的markdown转化幻灯片工具
codeStyle: tomorrow
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

// Help you quick create a standard markdown file.
mdppt new

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
  baseUrl: '/',
  outputDir: 'dist',
  pages: {
    enable: true
  },
  devServer: {
    port: 8080,
    open: false
  }
  ...
}
```
</slide>

<slide class="w80 auto">
### Color Bar {.alignCenter}

---
- :你喜欢拍照, 有一颗热爱生活的新: {.magenta .animated .fadeInUp}
- :一亿像素, 五摄, 50倍混合数字变焦: {.blue .animated .fadeInUp .delay-400}
- :超级旗舰机, 记录每一刻感动瞬间: {.cyan .animated .fadeInUp .delay-600}
- :你向往远方，新奇又陌生是旅行的意义: {.purple .animated .fadeInUp .delay-800}
- :5000mAh电量, 满足一天好奇探索: {.yellow .animated .fadeInUp .delay-1200}
- :你追求个性, 拒绝千篇一律: {.green .animated .fadeInUp .delay-1400}
- :双曲面玻璃机身, 面面与众不同: {.red .animated .fadeInUp .delay-1600}

{.color-bar .w70 .auto .block}
</slide>

<slide class="w80 auto">
### Color Bar implementation {.alignCenter}

---

- Specify a wrapper className for ul tag **color-bar**.
- Set style ['magenta', 'blue', 'cyan', 'purple', 'yellow', 'red'].
- Text should be wrap with `:`, It will rendered with <span> tag.

```shell
- :你喜欢拍照, 有一颗热爱生活的新: {.magenta .animated .fadeInUp}
- :一亿像素, 五摄, 50倍混合数字变焦: {.blue .animated .fadeInUp .delay-400}
- :超级旗舰机, 记录每一刻感动瞬间: {.cyan .animated .fadeInUp .delay-600}
- :你向往远方，新奇又陌生是旅行的意义: {.purple .animated .fadeInUp .delay-800}
- :5000mAh电量, 满足一天好奇探索: {.yellow .animated .fadeInUp .delay-1200}
- :你追求个性, 拒绝千篇一律: {.green .animated .fadeInUp .delay-1400}
- :双曲面玻璃机身, 面面与众不同: {.red .animated .fadeInUp .delay-1600}
{.color-bar .w70 .auto .block}
```
</slide>
