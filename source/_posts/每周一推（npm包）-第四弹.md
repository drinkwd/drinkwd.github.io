---
title: 每周一推NPM包-第四弹
tags: [NPM, VUE]
categories: 技术
index_img: /img/blog_img/index23.png
banner_img: /img/blog_img/banner3.png
---
## 前言
**为了不让自己的空余时间都浪费掉，打算做一个每周一推的专栏，盘点一些好的插件，分享给大家，每次分享前会先发到自己的博客，可以在[博客](https://drinkwd.github.io/)中抢先看哦**🎈。
## [v-viewer](http://mirari.cc/v-viewer/)

我们在做后台项目的时候会涉及到图片的放大🖼，已经有很多成熟的组件提供了这些功能比如`element-ui`下的`image`组件,但是如果我们需要单独使用图片放大的功能🎡，还需要安装`element-ui`就有些**小题大作**了，🎭还有的同学使用`dialog`的方式来放大的图片这种只能实现单纯的放大图片🎨，但是无法实现图片翻转，缩小等等功能，于是就需要使用`v-viewer`来实现🥽。

> 这款组件支持Vue图片浏览组件`v-viewer`，支持旋转、缩放、翻转等操作，用法也非常简单🎈。

#### 用法
- 安装
```
npm install v-viewer
```
- 用法
```javascript
// main.js
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
Vue.use(VueViewer)
```
``` html
 <!-- template -->
<template>
  <div>
    <!-- 指令方式放大图片 -->
    <div class="images" v-viewer>
      <img v-for="src in images" :key="src" :src="src">
    </div>
    <!-- 组件方式放大图片 -->
    <viewer :images="images">
      <img v-for="src in images" :key="src" :src="src">
    </viewer>
    <!-- 通过api的方式放大图片 -->
    <button type="button" @click="show">Click to show</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        images: [
          "https://picsum.photos/200/200",
          "https://picsum.photos/300/200",
          "https://picsum.photos/250/200"
        ]
      };
    },
    methods: {
      show() {
        this.$viewerApi({
          images: this.images,
        })
      },
    },
  }
</script>
```
#### 小tips
> 通过这个网站可以设置随机图[picsum](https://picsum.photos/)满足我们写`demo`的需要🎈。

这样就通过三种方式实现了图片的放大具体的效果如下🎉。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9271854d05d84bdfb802f6f351ff04aa~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/208491267771490195bf96c4ed38ae93~tplv-k3u1fbpfcp-zoom-1.image)

#### 指令方式[绑定option]
- `inline`
>  - 默认值：`false`
> -  true：默认放大并且在图片内部展示，false: 需要手动点击方法在图片外部展示

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7ec841b3f4f43499427219c9862ce41~tplv-k3u1fbpfcp-zoom-1.image)

<center>inline->false</center>

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb814b9c74c64687980f2b6910476634~tplv-k3u1fbpfcp-zoom-1.image)

<center>inline->true</center>

- `button`
> - 默认值：`true`
> - 是否展示右上角关闭按钮

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ea4c8ff906640e4b08ca84b6b1be19a~tplv-k3u1fbpfcp-zoom-1.image)
<center>button->false</center>

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9479164628fc43dbab912f0a5b2ecf09~tplv-k3u1fbpfcp-zoom-1.image)

<center>button->true</center>

- `navbar`
>  - 默认值：`true`
> - 是否展示下方导航

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9453195d4be24a4c84dca0ff80f79be3~tplv-k3u1fbpfcp-zoom-1.image)

<center>navbar->true</center>

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7de3a441bf7c46c18a34e858139c4b31~tplv-k3u1fbpfcp-zoom-1.image)
<center>navbar->false</center>

- `title`
> -  默认值:`true`
> - 是否在下方显示图片alt信息

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/980a86a7129b4035a737c21e5470345e~tplv-k3u1fbpfcp-zoom-1.image)

- `toolbar`
> - 默认：`true`
> - 是否展示下方工具栏
- `movable`
> - 默认：`true`
> - 放大图片是否可移动
- `zoomable`
> - 默认值：`true`
> - 是否可放大缩小图片
- `tooltip`
> - 默认值：`true`
> - 放大过程中是否展示放大比例
- `rotatable`
> - 默认值：`true`
> - 是否有旋转功能
- `scalable`
> - 默认值：`true`
> - 是否有放大缩小功能
- `fullscreen`
> - 默认值：`true`
> - 是否有全屏功能
- `transition`
> - 默认值：`true`
> - 图片放大的过程中是否有放大效果 
- `keyboard`
> - 默认值：`true`
> - 是否支持键盘上下左右剪头操作

### 拿一个举例
```html
<template>
  <div>
    <div class="images" v-viewer="{inline:false}">
      <img v-for="src in images" :key="src" :src="src" alt="我是img的alt属性">
    </div>
  </div>
</template>
```
### 组件方式
> 组件方式中的`option`与指令方式的`option`是相同的属性,可以在`option`中动态配置。
```html
<template>
  <div>
    <viewer :options="options" :images="images">
      <img v-for="src in images" :key="src" :src="src">
    </viewer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        images: [
          "https://picsum.photos/200/200",
          "https://picsum.photos/300/200",
          "https://picsum.photos/250/200"
        ],
        options:{
          inline: true
        }
      };
    },
  }
</script>
```

#### api方式（该方式不太常用）

```
<template>
  <div>
    <button type="button" class="button" @click="previewURL">URL Array</button>
    <button type="button" class="button" @click="previewImgObject">Img-Object Array</button>
  </div>
</template>
<script>
  import { api as viewerApi } from "v-viewer"
  export default {
    data() {
      return {
        sourceImageURLs: [
        'https://picsum.photos/200/200?random=1',
        'https://picsum.photos/200/200?random=2',
      ],
      sourceImageObjects: [
        {
          'src':'https://picsum.photos/200/200?random=3',
          'data-source':'https://picsum.photos/800/800?random=3'
        },
        {
          'src':'https://picsum.photos/200/200?random=4',
          'data-source':'https://picsum.photos/800/800?random=4'
        }
      ]
      }
    },
    methods: {
      previewURL () {
          // 如果使用`app.use`进行全局安装, 你就可以像这样直接调用`this.$viewerApi`
        const $viewer = this.$viewerApi({
          images: this.sourceImageURLs
        })
      },
      previewImgObject () {
          // 或者你可以单独引入api然后执行它
        const $viewer = viewerApi({
          options: {
            toolbar: true,
            url: 'data-source',
            initialViewIndex: 1
          },
          images: this.sourceImageObjects
        })
      }
    }
  }
</script>
```
#### 通过外部按钮操作图片
```
<template>
  <div>
    <div class="iten">
      <viewer :options="options" :images="images"  @inited="inited">
        <img v-for="src in images" :key="src" :src="src">
      </viewer>
    </div>
    <button class="btn" @click="Rotate">
      旋转
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: [
        "https://picsum.photos/200/200",
        "https://picsum.photos/300/200",
        "https://picsum.photos/250/200"
      ],
      options: {
        inline: true
      }
    };
  },
  methods: {
    Rotate() {
      this.$viewer.rotate(90)
    },
    inited(viewer) {
      this.$viewer = viewer
    }
  }
}
</script>
```
> 更多案例可以查看[v-viewer](http://mirari.cc/v-viewer/)点击`source`查看对应源码🤗

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/502f5578656742df84ca23fce683de9f~tplv-k3u1fbpfcp-zoom-1.image)

#### 注意事项
> - 如果使用vue3可以使用该组件[v-viewer-vue3](https://github.com/mirari/v-viewer/tree/v3)

## 往期NPM包
##### [timeago.js](https://juejin.cn/post/7194637751516414011)
##### [vue-seamless-scroll](https://juejin.cn/post/7196907025099653176)
##### [circlr](https://juejin.cn/post/7199455220802486330)

## 总结

`v-viewer`的功能是比较全的一款插件主要是根据图片放大的拓展，好用！🎈。