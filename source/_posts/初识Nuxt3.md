---
title: 初识Nuxt3
tags: [Nuxt3, Vue]
categories: 技术
index_img: /img/blog_img/index20.png
banner_img: /img/blog_img/banner20.png
---

## 🎨前言
最近公司规模一点点的起来了，领导反馈可以考虑做一个企业官网了🧓，说起来比较简单都是一些静态的资源，但是毕竟是公司官网肯定要有很多的工作去做`seo`优化，所以就涉及到了技术栈的选型👩‍🔧。

### 技术选型

- [**凡科建站**](https://jz.fkw.com/model/?_ta=9240&kw=252130)

当初打算直接在凡科上选择一个模板，直接就交给运营的同事去弄这些事情了，我们就不参与开发了🧵，但是由于某种原因需要我们自己参与开发🎃。

- [**hexo**](https://hexo.io/zh-cn/)

了解了领导的意思之后发现都是一些静态的页面，所以当初在考虑是否可以用`hexo`来搭建一下🎨。去`hexo`官网找了一些主题发现只有这个主题[acorn](https://acorn.imaging.xin/)比较适合做企业官网🦺，但是由于主题不够丰富后期扩展也是个麻烦事，就放弃了🎪。

- [**Nuxt**](https://v3.nuxtjs.org/)

因为我们公司用到的技术栈是`vue`和`react`但是因为`SPA`应用这些多是在客户端的应用，不能进行`SEO`优化（搜索引擎优化），于是就想到了`vue ssr`(服务端渲染)🥙。 本身对`vue ssr`的了解也不是很深，这时发现了`Nuxt`框架打算研究一下🥠，因为之前对`Nuxt2`的也不太了解🍘，发现官网已经发布了更强大的`Nuxt3（beat版）`预计6月份就发布正式版了，莫不如先去尝尝鲜🍖。


### Nuxt简介

`Nuxt3`是使用`Vue3`发布的`SSR`框架专注构建您的下一个应用程序，体验混合渲染、强大的数据获取和新功能。<br>

下图不同Nuxt版本对比（引用官网）👇

功能 / 版本       | Nuxt 2          | Nuxt Bridge      | Nuxt 3
-------------------------|-----------------|------------------|---------
Vue                     | 2               | 2                | 3
稳定性                    | 😊 稳定         | 😌  半稳定        | 😬不稳定
性能              | 🏎 快      | ✈️ 更快   | 🚀 最快
Nitro Engine             | ❌             | ✅               | ✅
ESM support              | 🌙 Partial     | 👍 Better        | ✅
TypeScript               | ☑️ Opt-in      | 🚧 Partial       | ✅
组合式api         | ❌             | 🚧 Partial       | ✅
选项API             | ✅             | ✅               | ✅
Components Auto Import   | ✅             | ✅               | ✅
`<script setup>` 语法  | ❌             | 🚧 Partial       | ✅
自动导入组件            | ❌             | ✅               | ✅
Webpack                  | 4              | 4                | 5
Vite                     | ⚠️ Partial     | 🚧 Partial       | 🚧 Experimental
Nuxi CLI                 | ❌ Old         | ✅ nuxi          | ✅ nuxi
静态部署             | ✅             | ✅               | 🚧 Experimental

### 前期准备

- [NodeJs](https://nodejs.org/en/download/)🍕：版本要大于14.16.0
- [vscode](https://code.visualstudio.com/)编辑器🥯：提供了丰富的插件
- `TypeScript Vue` 插件🥓：在`vscode`中的扩展商店中就可以找到对`vue3`和`ts`的支持更加完善。

### 环境搭建

- 创建项目
```
npx nuxi init nuxt-app
```
- 安装依赖 
```
npm install
```
> 在安装依赖的过程可能会报以下问题，注意要使用`npm/yarn/pnpm` 不要使用`cnpm`我通过`cnpm`安装了两次都报错了，感觉是依赖包的版本问题，使用`yarn`就可以了。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8b76efac39e40ac8414331979d26ba7~tplv-k3u1fbpfcp-zoom-1.image)

- 运行项目

```
npm run dev 
```
第一次启动可能会报错，无需改动中断后再次启动就没有问题了，速度飞快👇。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06bc9b7cdafb4ce9a078059ad03475de~tplv-k3u1fbpfcp-zoom-1.image)


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42a575354ddc49c58d2fcb1f2d6768f2~tplv-k3u1fbpfcp-zoom-1.image)

- **vscode**查看项目
```
code nuxt-app
```
脚手架安装之后发现目录很干净只是在`app.vue`中有这样一段话。
```html
<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
```
`NuxtWelcome`在哪里定义的，为什么没有引用，突然后我想起来`Nuxt`是自动引用组件的我用ctrl+鼠标左键点进了定义发现`NuxtWelcome`是Nuxt内部提供的显示组件。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21b396cfbc35403db980e3308118cb7a~tplv-k3u1fbpfcp-zoom-1.image)

我将<NuxtWelcome />替换成Hello World一个简单的Hello World就出现啦。

## 总结

Nuxt能从2->3 就足以证明 Nuxt在服务端渲染还是有一定的定位的，并且开发的方式基本使用过vue都可以上手，希望我没有选错，继续加油。