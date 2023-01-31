---
title: Nuxt3目录结构(二)
tags: [Nuxt3, Vue]
categories: 技术
date: 2023-01-09 14:58:57
index_img: /img/blog_img/index20.png
banner_img: /img/blog_img/banner22.jpg
---

## 前言
书接上回

- nuxt约定的目录结构如下👇
```
├── app.vue # Nuxt 3 应用程序中的主组件 入口组件
├── components # 组件目录，支持自动导入
├── layouts # 布局目录
├── composables # 公共函数，支持自动导入
├── assets # 静态资源目录 与vue项目的assets相同
├── middleware # 路由中间件
├── nuxt.config.ts  # Nuxt 配置文件，可以理解成vue.config.js 文件名必须是nuxt.config 后缀名可以是.js,.ts或.mjs
├── package.json
├── pages # 基于文件的路由
├── plugins #插件
├── public # 不会参与打包，与vue项目的public类似直接挂在服务器的根目录
├── README.md
├── server 
├── tsconfig.json
└── yarn.lock
```

### layout布局目录

`Nuxt`提供了一个可定制的布局框架`layout`，您可以在整个应用程序中使用，非常适合将常见的` UI` 或代码模式提取到可重用的布局组件中,可以把`layout`想象成嵌套路由最外层的父级,内部需要使用插槽。
> `layout`目录下的布局文件，必须要有一个根元素进行包裹，并且根元素不能是`<slot />`

- 举个例子 
```
-| layouts/
---| default.vue
-| app.vue
```
```html
<!--default.vue-->
<template>
  <div>
    我是布局模板，default.vue
    <slot />
  </div>
</template>
```
```html
<NuxtLayout name="default">
      内容
</NuxtLayout>
```

![](https://files.mdnice.com/user/10685/c2c3637f-5ab7-4d47-b6cc-c6497d7724ea.png)

- 具名插槽接收
```
-| layouts/
---| default.vue
-| app.vue
```
```html
<template>
  <div>
    我是布局模板，default.vue
    <slot name="one" />
    <slot name="two" />
  </div>
</template>
```
```html
<template>
  <div>
    <NuxtLayout name="default">
      <template #two> 我是two中的内容 </template>
      <template #one>
      <div class="">
        我是one中的内容
      </div>
    </template>
    </NuxtLayout>
  </div>
</template>
```

![](https://files.mdnice.com/user/10685/186d9c26-670d-4f44-bc40-b7d5ce8de4ad.png)

- `layout`与`pages`
可以指定页面使用`layout`布局也可以所有页面均使用`layout`
```
-| layouts/
---| default.vue
-| pages/
---| index.vue
-| app.vue
```
```html
<!--default.vue-->
<template>
  <div>
    我是布局模板，default.vue
    <slot />
  </div>
</template>
```
```html
<!--index.vue-->
<template>
  <div>
    我是布局模板，default.vue
    <slot />
  </div>
</template>
```
```html
<!-- app.vue-->
<NuxtLayout name="default">
    <NuxtPage></NuxtPage>
</NuxtLayout>
```
> 如果在`NuxtLayout`中不定义`name`可以在pages中增加`<script setup>
definePageMeta({
  layout: "default",
})
</script>`针对指定页面采用`layout`布局

### middleware
```
-| middleware/
---| test.js
---| test.global.js
-| pages/
---| router.vue
```
`middleware`路由中间件可以理解成vue路由的拦截器,当页面跳转某个页面的之前执行的函数,如果路由中间件的后缀名以.global结尾则是全局的路由守卫不需要在每个页面都引用。
```javascript
// middleware/test.js
export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to,from)
  if (to.params.id === '1') {
    return abortNavigation()
  }
  return navigateTo('/')
})
```
```javascript
// middleware/test.global.js
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('每切换一次路由都会执行')
})
```
```html
<!-- router.vue-->
<template>
  <div class="">
    router
  </div>
</template>

<script setup>
import {} from "vue";
definePageMeta({
  middleware: ["routenterception"]
});
</script>

<style scoped></style>
```
> 上述代码，当页面跳转到`/router`的时候会执行对应的中间件函数。

### Plugins 目录

`Nuxt`将自动读取`plugins`目录中的文件并加载它们。您可以在文件名中使用`.server`或`.client`后缀以仅在服务器或客户端加载插件,例如使用elementui需要在该目录下注册。

- 引用`ElementPlus`
```
plugins
 | - myPlugin.ts
```
```
yarn add element-plus
```
```javascript
//myPlugin.ts
import ElementPlus from 'element-plus'
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(ElementPlus)
})
```
```html
<!-- app.vue -->
<style>
@import 'element-plus/dist/index.css';
</style>
```
 这样在全局就可以使用`element-ui`了
### server目录

[server](https://v3.nuxtjs.org/guide/features/server-routes)