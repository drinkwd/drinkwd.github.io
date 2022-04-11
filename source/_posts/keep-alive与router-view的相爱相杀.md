---
title: keep-alive与router-view的相爱相杀
tags: [uni-app,Vue]
categories: 技术
index_img: /img/blog_img/index9.jpg
banner_img: /img/blog_img/banner9.jpg
---
##  前言

 > 由于目前做的项目都是基于`tab`导航的项目，目的就是要在页面跳转时实现记住上一个页面的搜索项或者表单值，减少请求，增加效率，第一反应就是`keep-alive`,紧接着我的噩梦就来了😫。`ps`:看封面图进来的记得收藏哦🍭


## keep-alive概念

###### 属性：
- `include` 只有**名称**匹配的组件会被缓存🙄(名称指的是组件中定义的name)。
- `exclude`。任何名称匹配的组件都不会被缓存🧵。
- `max`。最多可以缓存多少组件实例🥙。

###### 用法：

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件🍤：它自身不会渲染一个 `DOM` 元素，也不会出现在组件的父组件链中🥧。

当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行🚃，因为我们可能会需要将整个路由页面缓存下来所以就要将`<router-view>`进行缓存🛴。

###### 执行顺序：
- 页面第一次进入，钩子的触发顺序`created-> mounted-> activated`，退出时触发`deactivated`。当再次进入（前进或者后退）时，只触发`activated`🦼。

## router-view概念

> - `<router-view>`组件是一个功能组件，它为给定路径呈现匹配的组件🎨。渲染的组件`<router-view>`也可以包含自己的`<router-view>`，这将为嵌套路径渲染组件🤴。

`router-view` **key**属性（每个组件都有一个`key`属性，`vue`会复用相同组件如果需要重新渲染可以使用不同的`key`进行）🛒
>  1. **不设置 `router-view` 的 `key` 属性**
> 由于 Vue 会复用相同组件, 即 `/page/1 => /page/2` 或者 `/page?id=1 => /page?id=2` 这类链接跳转时, 🍆将不在执行`created`, `mounted`之类的钩子, 🍱这时候你需要在路由组件中, 添加`beforeRouteUpdate`钩子来执行相关方法拉去数据🥯。

> 2. **设置 `router-view` 的 `key` 属性值为 `$route.path`**
>从`/page/1 => /page/2`, 由于这两个路由的`$route.path`并不一样, 🍵所以组件被强制不复用, 相关钩子从`/page?id=1 => /page?id=2`,🍦 由于这两个路由的`$route.path`一样, 所以和没设置 `key` 属性一样, 会复用组件🥡。

> 3.  **设置 `router-view` 的 `key` 属性值为 `$route.fullPath`**
> 从`/page/1 => /page/2`, 由于这两个路由的`$route.fullPath`并不一样, 所以组件被强制不复用🥙, 
从`/page?id=1 => /page?id=2`, 由于这两个路由的`$route.fullPath`并不一样, 所以组件被强制不复用🥪。


## 写法

### vue2.0的写法

``` 
# 包裹组件
# currentTabComponent 代表组件名
# 例如一个项目引用了多个组件通过相应事件修改currentTabComponent的值达到动态组件缓存的功能
<keep-alive>
   <component v-bind:is="currentTabComponent"></component>
</keep-alive>
# 包裹路由
# a,b 代表组建名称
<keep-alive :include=[a,b]>
    <router-view :key="$route.fullPath"></router-view>
</keep-alive>
```
### vue3.0的写法
```
 包裹组件
# currentTabComponent 代表组件名
# 例如一个项目引用了多个组件通过相应事件修改currentTabComponent的值达到动态组件缓存的功能
<keep-alive>
   <component v-bind:is="currentTabComponent"></component>
</keep-alive>

# 包裹路由（3.0的写法有变更）key需要绑定到component中
<router-view v-slot="{ Component }">
    <keep-alive :include=[a,b]>
      <component :is="Component" :key="$route.fullPath"/>
    </keep-alive>
</router-view>
```
## 项目实战

无图言卵🤒，简单看一下我们最终实现的效果
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95bb65d3b7664cedb3cd2688bb392482~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7df2f366db94b77b8660030345758a6~tplv-k3u1fbpfcp-zoom-1.image)



## 不使用`keep-alive`的效果

- 所有的页面都不会缓存，凡是涉及到路由的跳转都会执行当前组件的`mounted`，🎏这样就会有一些性能上的消耗，导致加载过的数据还会重新加载进行渲染在进行上方导航切换的时候不会缓存之前填写的数据🧧。

## 所有都使用了`keep-alive`的效果

- 每个页面的第一次都会执行`mounted`，🧤之后再次访问该页面会进入缓存,导致我们在关闭的时候不会执行组件的销毁，加载的都是第一次加载的数据，新数据一直无法渲染🦺。

## 使用了`keep-alive` 通过`include`和`vuex`控制缓存

> 通过这种方式当我们可以动态控制缓存的组件。
>- 当页面关闭的时候我们将不需要缓存的组件移除🍱，移除之后会执行组件的销毁生命周期🥂，在打开之前的页面会重新渲染有些时候这样就已经完美了🍟。
>- 但是事情总是事与愿违，比如上图中的编辑😴，他们是不同的路由但是指向的组件是同一个（组件`name`肯定是相同的）🤢，这样就会导致我们同时打开两个编辑页面的时候,每次加载都是第一次的数据😣。

## 最终方案：keep-alive 中的**include** + router-view中**key**

> 我们在上面已经提到了`router-view`中`key`的作用🍊，所以我们只需要在`router-view`绑定`key`为`"$route.fullPage"`🥂**如果是vue3.x需要将key值绑定至component上**🥂 这样我们在点击列表不同项的编辑的时候每次走的都是最新的数据🍯，同时我们使用了`keep-alive`中的`include` 上方两个编辑页进行切换的时候就会走缓存🍻，不进行页面的加载🍵。


## `vue3.x` 设置`name`

`<script setup> `是在单文件组件 `(SFC) `中使用组合式` API` 的编译时语法糖。
>- 我们在定义变量的时候不需要在使用data 
>- 方法不需要在使用methods可以直接在标签内定义变量和方法。

`kepp-alive`中`include`需要组件`name`，在vue3.x中如何定义`name`变量呢?


> 在`Vue3.x `会根据文件名推断组件的 `name`也就是说组件的文件名对应的就是`name`😘，如果你特别倔🤣，我就是想定义组件的名称也不是没有办法的🌯。
> 1. 写两个 `script` 标签
> 2. 如果是通过vite构建的项目可以通过插件的方式（`vite-plugin-vue-setup-extend`）。

1.多个`script`标签
``` 
<script>
    export default {
        name: 'demo'
    }
</script>

<script setup>
    // do something...
</script>
```
2. `vite`构建插件引用

```
# 安装
npm i vite-plugin-vue-setup-extend -D
# 配置 vite.config.ts 
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
export default defineConfig({
  plugins: [ VueSetupExtend()]
})
# 使用
<script lang="ts" setup name="demo">

</script>
```
## 总结

当初就是因为对`keep-alive`的掌握不够透彻只是知道是什么东西🍄，在真正的项目中使用才会发现有很多问题,兄弟们告辞下次见🥤，稍微有点作用就三连一下哦🤑，有错误的地方尽管在评论区展示语言😏。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e35c0c3a3b445edbbffb7fc80d3c305~tplv-k3u1fbpfcp-zoom-1.image)

## 参考文章
[vue3.2 script setup定义的组件如何命名？](https://www.zhihu.com/question/500937713)

[Vue2官网](https://cn.vuejs.org/index.html)

[Vue3官网](https://v3.cn.vuejs.org/guide/introduction.html)
