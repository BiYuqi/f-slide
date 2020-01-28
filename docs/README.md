---
home: true
# heroImage: /assets/webpack-seed.png
heroText: MDPPT
pageClass: home-page-class
tagline: 简单易用的markdown幻灯片制作工具
actionText: 开始探索吧 →
actionLink: /guide/
features:
- title: 单文件打包
  details: 支持创建单文件, 并本地起server进行开发
- title: 多文件打包
  details: 支持创建两层目录文件, 并本地起server进行开发
- title: 命令行创建标准的Markdown文件
  details: 支持命令行创建markdown文件
footer: MIT Licensed | Copyright © 2020-present MDPPT
---
## Getting Started

```bash
# install dependency
npm install @mdppt/cli

# single markdown
mdppt new

mdppt serve <filename>

mdppt build <filename>

# multi markdown files
mdppt serve .

mdppt build .
```