---
title: echarts自定义地图
tags: [Echart]
categories: 阅读
index_img: /img/blog_img/index15.jpg
banner_img: /img/blog_img/banner15.jpg
---
## 前言

  在日常的工作中肯定会遇到各种各样的`echarts`的行政地图👀，有一天突然领导说**xx县**想要一个地图，我心想这还不简单嘛😁找到json文件就开干呗😍。结果我找了一天也没有找到县级的`json`地图文件，我的辛酸路就此开始😢。

## 问题关键

  我们解决根本问题的关键就是要制作出某个县的`json`文件，相信很多做过`echarts`地图的小伙伴都知道只要有了`json`文件，做个地图还不是分分钟,但是地图`json`文件中的内容是很恶心的😌，下面是某市部分`json`的截图👇。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a60ef7cb8514d36aad8093fc33d2c05~tplv-k3u1fbpfcp-zoom-1.image)

## 准备工作
### 相关网站


通过可视化的方式编辑`geojson`地图数据。

[BIGEMAP](http://www.bigemap.com/)

加载多种在线瓦片地图谷歌，`OSM`，天地图，`bing`，高德，以及多种离线地图`bmdb`格式地图,等等。我们用到他的作用就是导出部分 乡镇的`KML`文件🥠。
## 制作流程

### 导出KML文件

- 下载[BIGEMAP](http://www.bigemap.com/reader/download/)客户端

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bc37d64e3a2428dbfd3e0af4b4e17d7~tplv-k3u1fbpfcp-zoom-1.image)

- 选择对应区县
安装完成之后，打开软件，点击右侧**选择行政区域**找到对应街道或者乡镇🎨。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf3e72d2708048cc958daaaa7f554fe5~tplv-k3u1fbpfcp-zoom-1.image)

- 导出KML文件

点击分享按钮，另存到某个文件夹中，依次导出🍧。

> 注：不直接导出上一级的`KML`，而是依次导出的原因是，如果导出的是上一级,只有当前级别的轮廓不包括下一级的资源👛。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/737cc3c8666041aa869e6421c3dbf5f6~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f4dd7b357e848a7bf458112de18d0a9~tplv-k3u1fbpfcp-zoom-1.image)

### 生成GeoJSON文件

- 打开[geojson.io](https://geojson.io/)依次导入刚才对应的`KML`文件。

左上角`OPEN->FILE`，导入之后就会生成对应可视化地图以及`json`🍠。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1a3866c8e37405c82024defdbc2ce42~tplv-k3u1fbpfcp-zoom-1.image)
- 将json复制出来随便放在某个echarts地图的示例当中就可以啦🤙。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2ff756889844331bb94b670b074d56f~tplv-k3u1fbpfcp-zoom-1.image)

## 自定义地图

比如某个地市下新增加了一个开发区，还没有归并到新的行政区划中，就需要我们在`GEOJSON`中进行手动增加😋。

- 找到对应绘制工具，勾勒区域。

点击多边形工具之后在地图的某个位置通过首尾相连的方式画出一个区域🚇。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a43f5d9c071e4e1ca838d1c966c45ab6~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d82ade904fe24aef95832926bfe8f135~tplv-k3u1fbpfcp-zoom-1.image)

- 编辑新增区域属性

点击绘制的区域增加`name`属性，如果想要增加其他属性可以通过点击`AddRow`进行增加，一定要点击**SAVE**进行保存🥙。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5492ce312cce42f99bc8d9352b7578f6~tplv-k3u1fbpfcp-zoom-1.image)

- 将json复制出来随便放在某个echarts地图的示例当中发现新增加的区域已经出现了😏。


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac616141e41142c6ad82981ffdacfce0~tplv-k3u1fbpfcp-zoom-1.image)



## 拓展小工具
[DATAV.GeoAtlas](http://datav.aliyun.com/portal/school/atlas/area_selector)

阿里推出的一个用于获取全国、各省、各市的详细地图信息的json文件，针对区县只有对应地图轮廓而没有乡镇或街道，数据来源为高德🤪。

[vue-seamless-scroll](https://chenxuan0000.github.io/vue-seamless-scroll/zh/)

在做大屏期间用到的无缝滚动插件挺好用的，不需要自己在去监听表格的高度自己实现了🤪。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98898900eb5041bc98ab9057a9c122ea~tplv-k3u1fbpfcp-zoom-1.image)

## 总结

在做大屏项目的时候经常会遇到`echarts`地图👜，我们只需要找到问题的痛点原因是什么，都会找到相关的答案哒🤣,如果你使用的是省市的地图可以直接通过`DATAV.GeoAtlas`🌯找到你想要的`json`文件哦,如果对你有帮助记得点赞哦！！🤪
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60710cf4d33743218f92b8d0d99ea8bb~tplv-k3u1fbpfcp-zoom-1.image)

## 参考链接

[解决如何整理出乡镇级的地图](https://www.cxyzjd.com/article/weixin_44861708/114223258)
