---
title: Nuxt3目录结构(一)
tags: [Nuxt3, Vue]
categories: 技术
index_img: /img/blog_img/index20.png
banner_img: /img/blog_img/banner22.jpg
---

## 前言🥠
因为`Nuxt`是约定大于配置的一个框架，所对应的目录结构的名称基本都是规定的，所以有必要解释一下`Nuxt`对应的目录结构啦🦺

- 脚手架生成目录结构👇
```
├── app.vue # Nuxt 3 应用程序中的主组件 入口组件
├── components # 组件目录，支持自动导入
|  └── helloWorld.vue # 组件
├── nuxt.config.ts # Nuxt 配置文件，可以理解成vue.config.js 文件名必须是nuxt.config 后缀名可以是.js,.ts或.mjs
├── package.json # 项目包的配置文件和项目的启动调式命令配置
├── README.md # 搭建 Nuxt 3脚手架之后的阅读文档
├── tsconfig.json # ts配置
└── yarn.lock # yarn锁文件 锁定依赖包版本
```
`Nuxt`是约定式开发 白话就是你要按照`Nuxt`规定的模式进行开发🍕，约定大于配置,比如组件的自动导入🥩，你无需在定义`components`进行声明，如果定义`A`你就要定义`A`，不要定义成`B`🌯。

`Nuxt` 提供了一个可遵循的目录结构，专注于特定功能，让您专注于创建，而不是配置🥗。

- nuxt约定的目录结构如下👇
```
├── app.vue # Nuxt 3 应用程序中的主组件 入口组件
├── components # 组件目录，支持自动导入
├── layouts # 布局目录
├── composables # 公共函数，支持自动导入
├── assets # 静态资源目录 与vue项目的assets相同
├── middleware # 路由中间件框架
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
## 目录详解
### `app.vue`

相信用过`vue`的小伙伴都知道`app.vue`🧀，在`nuxt`中的`app.vue`与`vue`中的功能是相同的，在`app.vue`中定义的`js`和`css`都是全局的并包含在每个页面中🍺。
```html
<!--app.vue-->
<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

```

### `components`目录

- **单层组件**

`components`目录中对应的是组件目录在使用组件的过程中是无需引用的。
```
| components/
--| TheHeader.vue
--| TheFooter.vue
```
```html
<!-- app.vue -->
<template>
  <div>
    <TheHeader />
    <TheFooter />
  </div>
</template>
```
> `nuxt`对于组件的大小写是不敏感的即使在使用的时候开头字母小写也是可以的`<theHeader />`。
 
- **嵌套组件**
 ```
 | components/
--| base/
----| foo/
------| Button.vue
 ```
 >嵌套组件就是组件不是在`components`的目录下而是在`components`的子目录或者孙目录下，在使用的时候需要加上上级目录的文件名。
```html
<!-- app.vue -->
<template>
  <div>
    <BaseFooButton />
  </div>
</template>
```
- **特殊的嵌套组件**
```
 | components/
--| test/
----| test.vue
```
>如果组件名和对应的目录名称是相同的就不需要增加文件名前缀了。
```html
<!-- app.vue -->
<template>
  <div>
    <Test />
  </div>
</template>
```
- **动态组件**

使用`vue`中动态组件的写法要使用`resolveComponent`语法
```html
<template>
  <div>
    <component :is="isHeader ? TheHeader : 'div'" />
  </div>
</template>
<script setup>
const isHeader = ref(1)
// 组件
const TheHeader = resolveComponent('TheHeader')
</script>
```
- **延迟加载组件**

>您只需在组件名称中添加`Lazy`前缀即可，可以想象成路由的懒加载🥠，只有在组件显示的时候才进行加载,会大大减少打包之后的大小，如果某些组件不经常显示就可以采用组件的懒加载🧃。
```html
<template>
  <div>
    <LazyTheHeader v-if="show" />
    <button v-if="!show" @click="show = true">ShowHeader</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>
```
- **显式导入组件**

>虽然`nuxt`提供了自动导入组件的功能，但是如果想要显式导入组件也是可以的，采用以下语法
```
<script setup>
  import { TheHeader } from '#components'
</script>
```
> 注意<br>显式导入的组件的方式由于是解构所有要个按照组件的标准首字母要**大写**，否则会导入失败。

- **ClientOnly**

`Nuxt`提供了<ClientOnly>仅在客户端故意渲染组件的组件。要仅在客户端上导入组件，请在仅客户端插件中注册该组件，插槽作为后备
```html
  <template>
  <div>
    <ClientOnly>
      <TheHeader />
      <template #fallback>
        <p>Loading comments...</p>
      </template>
    </ClientOnly>
  </div>
</template>
```
以上代码会先显示`Loading comments...`当客户端将组件导入成功之后才会展示`TheHeader`的内容🍘，
当在`f12`查看网页源代码的时候是看不到`TheHeader`中定义的内容的，因为客户端渲染把内容都打包进`js`当中了🥡。

### **composables**目录
  
该目录与`components`目录类似，🍠但是这个目录下存放的一般是公共方法不是公共组件，当我们在开发`vue`程序的时候的`utils`目录，该目录也可以实现自动导入的功能，但是也有特殊情况👇。
```
composables
 | - utils.ts // 可以自动导入
 | - utilsfun
 | --- funtest.ts // 不可以自动导入
 | --- index.ts // 可以自动导入
```
如果导出函数的时候使用`export default` 则需要通过**文件名**的方式进行调用
```javascript
// utils.ts 文件
export const getTime=()=>{
    return new Date();  
}
export default function test(){
  console.log('默认导出')
}
```
```html
  <!-- app.vue -->
  <template>
  <div>
  </div>
</template>
<script setup>
// 成功
console.log(getTime())
// 成功 如果想使用test必须显示导入utils文件或者使用utils()进行调用，因为test是默认导出的
utils()
// 报错
test()
</script>
```
### pages目录

基于文件的路由，如果不创建该文件夹`nuxt`不会引用`vue-router`如果创建了`pages`文件夹`nuxt`将自动引入`vue-router`来管理路由。
- 对应关系
  
`pages/index.vue` 会自动映射`/`，如果是`pages/test.vue`会自动映射到`/test` 。
> **重点**<br>必须要保证`app.vue`中有`<NuxtPage />`标签来展示路由下的内容，可以理解成`vue`中的`router-view`。
- 动态路由<br>
  可以直接通过文件名的方式进行传递参数，要保证路由跳转时与文件名的结构一致。
  - 单参数传递✨: 只要在页面的文件名中用`[]`扩起来就可以了。
  - 多参数传递✨: 需要建立一个父级文件夹进行接收也使用`[]`进行包裹。
- 参数接收<br>
  参数接收的方式与`vue`接收的方式一致。
- 捕获所有路由<br>
  可以通过`[...xxx].vue`的方式定义路由,可以无限层级跳转。
- 嵌套路由<br/>
  类似`vue-router`中的`children`，并且需要在父级中增加`<NuxtPage />`将其理解成`vue-router`中的嵌套路由就很好理解,当跳转到子路由中将含有父级中的内容🚝。

- 路由跳转<br>
  - 标签导航🍺：路由跳转需要使用`<NuxtLink to="/">Home page</NuxtLink>`进行跳转
  - 编程式导航🍺: `navigateTo()`。
- 举个例子最全👇
```

pages
├── demo2_[id].vue
├── [...catch].vue
├── goods-[name]
|  └── demo3-[id].vue
├── parent
   └── child.vue
├── parent.vue
├── index.vue
```
```html
  <!-- pages/index.vue -->
  <template>
  <div class=""><h1 @click="routerPush">Index Page</h1></div>
  <NuxtLink to="/parent/child">/parent/child</NuxtLink>
  <NuxtLink to="/catch/xxx/aaa/vvvv">catch.vue</NuxtLink>
  <NuxtLink to="/demo2_38">Demo2.vue</NuxtLink>
  <NuxtLink to="/goods-haha/demo3-test">Demo3.vue</NuxtLink>
</template>
<script setup>
import {} from "vue";
const routerPush= ()=>{
  navigateTo({
    path:'/goods-bar/demo3-foo',
    query:{
      queryPms:123
    }
  })
}
</script>

<style scoped></style>
```
```html
  <!--app.vue-->
<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>
<script setup>
</script>
```
```html
  <!--demo3-[id].vue-->
<template>
    <div class="">获取的id:{{ $route.params.id }}</div>
  <div class="">获取的query参数:{{ $route.query.queryPms }}</div>
</template>
<script setup>
import { } from "vue";
import { ref } from "vue";
const route = useRoute();
const id = ref(route.params.id);
const name = ref(route.params.name)
</script>

<style scoped>
</style>
```
```html
  <!-- parent.vue -->
<template>
  <div class="">Parent Page</div>
  <!-- 子页面的出口-->
  <NuxtChild></NuxtChild>
</template>

<script setup>
import {} from "vue";
</script>

<style scoped></style>
```
```html
    <!-- child.vue -->
<template>
  <div class="">Child Page</div>
</template>

<script setup>
import {} from "vue";
</script>

<style scoped></style>
```
  
## 总结

  `Nuxt3`的目录结构非常重要且比较多，一节很难消化，所以打算分成两节，一起加油吧🚗
## 参考链接
  
- [技术胖](https://jspang.com/article/86)
  
- [Nuxt3](https://v3.nuxtjs.org/)
  
