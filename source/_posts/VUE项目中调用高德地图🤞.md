---
title: VUE项目中调用高德地图🤞
tags: [Vue]
categories: 技术
index_img: /img/blog_img/index14.jpg
banner_img: /img/blog_img/banner14.jpg
---

## 前言

相信大家或多或少都接触过在大屏的项目，在大屏项目中除了用到了`echarts`中的行政地图，街道地图也是很常见的，今天主要来说一下在`vue`中调用高德地图遇到的一些问题🤪。

## 申请高德key

无论我们使用任何方式调用高德地图都需要在[高德地图开放平台](https://lbs.amap.com/?ref=https://console.amap.com)中申请`key`😏

- 注册帐号

访问高德地图开发平台根据实际情况填写就可以🍜（实名认证的时候选择个人就可以，如果是企业级的项目，可能会涉及人员变动，建议使用公司邮箱进行注册）区别如下👇。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4f251d8f6d04c47882a1fdf710ec56a~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08aceac969b04ae59328f01790afa5aa~tplv-k3u1fbpfcp-zoom-1.image)


- 创建应用 

新建应用时名称，与类型可以随意填写，尽量填写的与开发的应用一直，方便后期维护🚘

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64d0ece0edcb46cbbbc0296f5dfe8ed3~tplv-k3u1fbpfcp-zoom-1.image)
应用创建成功之后，点击添加就会需要我们选择需要使用高德地图的哪些服务，不同的服务平台，对应填写的内容也有所区别🎪，例如`Android`需要填写`App`包名，`Android`的`SHA1`码等等，因为我这次的项目是个大屏项目所以就选择`Web端（JSAPI）`😮

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8103e4a7817a4fe0a9b860e914bae98b~tplv-k3u1fbpfcp-zoom-1.image)
信息填写完毕之后就会在当前应用下生成对应的Key值和**安全密钥**（安全密钥在之前的版本中是没有的）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8870fbfa6014366bc27b6c32b8d2f2b~tplv-k3u1fbpfcp-zoom-1.image)


## 技术选型

#### [`vue-amap`](https://elemefe.github.io/vue-amap/#/)
`vue-amap`是基于 `Vue 2.x `与高德的地图组件👨‍🦰，提供一些基础和高级的功能，例如：地图扎点，信息窗体，搜索组件，类型插件等等，不需要我们在造轮子了，所以我们就来试一试🎑。

##### 准备工作

> 当我们在使用组件的时候都会先看一下文档，但是当我在看文档的时候发现，文档中只有对应的`api`而没有示例，很难下手，于是在[`issues`](https://github.com/ElemeFE/vue-amap/issues/646)中找到了答案。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecec3f94258544aebbfe5c4d1035d806~tplv-k3u1fbpfcp-zoom-1.image)

解决方案也很简单

- 将项目下载到本地

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4936e46f3e2044d4b58ce15f06e43266~tplv-k3u1fbpfcp-zoom-1.image)

- 修改`src/docs/index.html`里的`docsify`引用
```html
将
<script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
修改为
<script src="//unpkg.com/docsify@4.11.6/lib/docsify.min.js"></script>
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4704daecc802444287432df7a78bbcf7~tplv-k3u1fbpfcp-zoom-1.image)

- 执行`npm install` `npm start`默认在`4201`端口就会启动项目就可以看到项目示例了。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b501477ca64441787d6b22fb890af3b~tplv-k3u1fbpfcp-zoom-1.image)

#####  项目中应用

- `npm`安装
```
npm install vue-amap --save
```
- `main.js`中挂载`vue-amap`

``` javascript
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  //申请地址 https://lbs.amap.com/ 选择web端jsAPI
  key: '自己申请的高德地图key', 
  // 插件集合，用到什么插件就使用什么插件
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4', // 高德sdk版本，最新的sdk已经出到了2.0
  //官网解释：JSAPI 2.0 提供的开发接口与 1.4 版本达到 99%的兼容度，但是为了保证插件的稳定性我们还是选择1.4.4。
})
```
- 组件用法
```html
<template>
      <el-amap ref="map" vid="amapDemo" :center="center" :zoom="zoom" :events="events" class="amap-demo">
      </el-amap>
  </template>
  <script>
    // 建议将zoom,center等可配置的项均写在配置文件中，方便打包之后进行修改。
    module.exports = {
      data: function() {
        return {
          zoom: 12,
          center: [121.59996, 31.197646],
          events: {
            'click': (e) => {
              alert('map clicked');
            }
          },
        };
      },
    };
</script>
```


以上就是在`vue`项目中使用`vue-amap`调用高德地图`api`的基本使用😀，具体对地图的操作可以根据文档的规范来就可以了，在使用的过程中可能会遇到几个问题😣。

### 刷新页面，地图加载偶尔失败

- 在main.js中加入以下内容。
```javascript
// 解决地图刷新显示不出来
const amapKeys = Object.keys(localStorage).filter(key => key.match(/^_AMap_/))
amapKeys.forEach(key => {
  // console.log(key)
  localStorage.removeItem(key)
})
```

### 在绑定插件的时候，控制台报错 `a[d].split is not a function`

- 含有地图组件的路由不使用懒加载的方式（*临时方案*）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8562a6608f514f6db0a4a9409521c31b~tplv-k3u1fbpfcp-zoom-1.image)

> 注： `vue-amap` 是不支持`vue3.x`，😥并且不能绑定高德地图新版`api`对应的安全密钥`jscode`,可能会导致部分服务无法使用。 对应的`vue3`版本的插件[看这里](https://vue-amap.guyixi.cn/)🧵。

## 原生调用高德API




- 安装官方提供的loader 
```
npm install @amap/amap-jsapi-loader --save
```
- main.js中绑定安全密钥jscode（不绑定部分功能无法使用）
```JavaScript
// 该写法只推荐在开发阶段，如果在生产阶段建议采用反向代理
// 官网说明https://lbs.amap.com/api/javascript-api/guide/abc/prepare
window._AMapSecurityConfig = {
  securityJsCode: 'jscode' // 输入你的jscode
}
```
- 封装组件
``` html
<template>
    <div class="home_div">
        <div id="container"></div>
    </div>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
    name: "Mapview",
    data() {
        return {
            map: null,
        }
    },
    created() {

    },
    mounted() {
        this.initAMap();
    },
    methods: {
        initAMap() {
            AMapLoader.load({
                key: 'xxx',  //设置您的key
                version: "2.0", // 高德地图版本
                plugins: ['AMap.ToolBar', 'AMap.Driving'], // 插件
                AMapUI: { // 高德地图UI组件库，可不写，内部提供了覆盖物标注点，以及部分模块的封装
                    version: "1.1",
                    plugins: [],
                },
                Loca: { // Loca版本(高性能地图数据可视化库) 可不写
                    version: "2.0"
                },
            }).then((AMap) => {
                // container渲染的id
                this.map = new AMap.Map("container", {
                    zoom: 5, // 当前缩放级别
                    zooms: [2, 22], // 缩放级别范围
                    center: [105.602725, 37.076636], // 中心点
                });
            }).catch(e => {
                console.log(e);
            })
        },
    }
}
</script>
<style  scoped>
.home_div {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
    position: relative;
}
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>
```



#### 混合使用（vue-amap与原生API混合使用）
- 只想通过 `vue-amap `引入高德地图，而部分实例化的操作直接基于高德地图的 `sdk `完成
> 实例化操作不是加载地图，简单来说就是用一些属性去实例化地图的这个类 `new xxx()` 代表的就是实例化`xxx`🛸。这样就不需要在使用`el-amap`中的`center`属性和`zoom`属性了🎨，因为已经通过原生的方式进行实例化了👜。
```
import { lazyAMapApiLoaderInstance } from 'vue-amap';
lazyAMapApiLoaderInstance.load().then(() => {
  // your code ...
  this.map = new AMap.Map('amapContainer', {
    center: new AMap.LngLat(121.59996, 31.197646)
  });
});
```

- 在`vue-amap`中引入高德原生`SDK`只需在`el-amap`上绑定`amap-manager`就可以拿到高德原生`AMap.Map`实例[文档地址](https://elemefe.github.io/vue-amap/#/zh-cn/introduction/compatible)
```html
<template>
  <div class="amap-page-container">
    <el-amap vid="amapDemo" :center="center" :amap-manager="amapManager" :zoom="zoom"
      class="amap-demo">
    </el-amap>

    <div class="toolbar">
      <button @click="add()">add marker</button>
    </div>
  </div>
</template>

  <style>
.amap-demo {
  height: 300px !important;
}
</style>

  <script>
// NPM 方式
import { AMapManager } from 'vue-amap';
let amapManager = new AMapManager();
export default {
  data: function () {
    return {
      zoom: 12,
      center: [121.59996, 31.197646],
      amapManager,
    };
  },

  methods: {
    add() {
      let o = amapManager.getMap();
      let marker = new AMap.Marker({
        position: [121.59996, 31.177646]
      });
      marker.setMap(o);
    }
  }
};
</script>
```


## 总结

网上针对高德地图的调用方案也有很多，我也是刚刚接触，文中的观点都是自身的看法，最后说一下自身对选型的判断🎑。
 
- 如果是大屏类的项目，没有过多的交互只是简单扎点，展示建议使用`vue-amap`🤙🤙🤙。
- 如果是已地图为中心的项目，包括人员路线，轨迹等等比较复杂的交互建议使用原生🤙🤙🤙。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c721b629f48f4fdd90071c8751616844~tplv-k3u1fbpfcp-zoom-1.image)

## 参考链接

- [高德地图API](https://lbs.amap.com/api/javascript-api/guide/abc/prepare)

- [vue-amap](https://elemefe.github.io/vue-amap/#/)
