---
title: 每周一推NPM包-第三弹
tags: [NPM, VUE]
categories: 技术
index_img: /img/blog_img/index23.png
banner_img: /img/blog_img/banner3.png
---

## 前言
**为了不让自己的空余时间都浪费掉，打算做一个每周一推的专栏，盘点一些好的插件，分享给大家，每次分享前会先发到自己的博客，可以在[博客](https://drinkwd.github.io/)中抢先看哦**🎈。
## [circlr](https://www.npmjs.com/package/circlr)

我们在做商城或者物品类项目的时候，避免不了要做到物品360度展示，效果类似下图👇。


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7509ab8211134f8083d6c8e589f55aa3~tplv-k3u1fbpfcp-zoom-1.image)

这款组件支持自定义旋转方向，旋转速度，以及鼠标滚轮，手指触摸控制旋转等等，用法也非常简单🎈。


> [circlr](https://www.npmjs.com/package/circlr) 通过滚动、鼠标和触摸事件进行动画旋转。
- 水平或垂直方向
- 触摸事件支持
- 滚动支持
- 反向和循环旋转

#### 前提
我们在使用该组件时首先要获取到不同角度物品的照片，一般需要使用第三方的相机进行全景拍照，我们公司之前找到的厂商是[特爱秀](http://www.risd.com.cn/html/panoramicautomaticsystem/)

#### 用法
- 安装
```
npm install --save circlr
```
- 用法
```
import circlr from 'circlr';
 
const el = document.querySelector('.container');
 
circlr(el)
  .scroll(true)
  .play()
  .on('show', n => {
 
  });
```

#### 基本使用
- **html**
```html
<template>
  <div>
    <div class="container" style="width:340px">
      <img v-for="item, index in imgList" style="height:340px;width:340px !important;"
        :src="`http://www.risd.com.cn/pro/41/imgs/imgsForweb2/${index}.jpg`" alt="" />
    </div>
  </div>
</template>
```
- **js**
```js
<script>
import circlr from 'circlr';
export default {
  name: 'ImgCirclr',
  props: {
    msg: String
  },
  data() {
    return {
      imgList: new Array(40).fill('')
    }
  },
  mounted() {
    const el = document.querySelector('.container');
      circlr(el)
        .scroll(true)
        .play()
        .on('show', n => {
        });
  }
}
</script>
```

- **style**
```css
<style>
img{
  height: 340px !important;
  width: 340px !important;
}
</style>
```
这样就实现了物品的360度展示，并支持鼠标滚轮根据方向启停🎉。
#### 动态停止，启动
```javascript
<script>
import circlr from 'circlr';
export default {
  name: 'ImgCirclr',
  props: {
    msg: String
  },
  data() {
    return {
      imgList: new Array(40).fill(''),
      circlrInstance: null
    }
  },
  mounted() {
    const el = document.querySelector('.container');
    // 将circlr赋值给vue中的data
    this.circlrInstance = circlr(el)
      .scroll(true)
      .play()
      .on('show', n => {
      });
  },
  methods: {
    // 停止旋转
    stopCirclr() {
      this.circlrInstance.stop()
    },
    // 开始旋转
    startCirclr() {
      this.circlrInstance.play()
    }
  }
}
</script>
```


#### 常用API

- circlr(el) el代表dom实例
创建旋转实例
- scroll(n) n代表true/false
通过滚动标志旋转
- play([n]) 开始序列播放
- stop 停止播放
- interval(ms) 旋转间隔时间

效果如下👇

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edd36b394c36443da5ed6506f83e2e57~tplv-k3u1fbpfcp-zoom-1.image)



#### 注意事项
> - 获取dom的时候如果出现获取不到的时候需要通过使用nextTick进行获取
> - 动态启停的时候要将初始的实例进行赋值，如果不使用初始值的话，停止或者启动的时候会从初始位置进行旋转

## 往期NPM包
##### [timeago.js](https://juejin.cn/post/7194637751516414011)
##### [vue-seamless-scroll](https://juejin.cn/post/7196907025099653176)

## 总结

`circlr`我们在做物品展示的时候是非常重要的，可以多角度控制物品的展示，使用方法也比较简单，希望对大家有所帮助🎈。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d5ab6f1c77440b59862d91857f3cb74~tplv-k3u1fbpfcp-zoom-1.image)






