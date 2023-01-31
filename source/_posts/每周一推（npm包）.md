---
title: 每周一推NPM包
tags: [NPM, VUE]
categories: 技术
index_img: /img/blog_img/index23.png
banner_img: /img/blog_img/banner3.png
---

## 前言
**为了不让自己的空余时间都浪费掉，打算做一个每周一推的专栏，盘点一些好的插件，分享给大家**🎈。
## [timeago.js](https://www.npmjs.com/package/timeago.js)
相信大家都看到过这种时间的展示,或者是朋友圈发了一条动态后，左下角显示 “刚刚”，过一会儿变成了“x分钟前”👇
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31a047e79f8b415683308b5f77b10098~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)
如果我们通过自己实现怕不是比较麻烦,但是有了`timeago.js`之后就变的简单起来。

> [timeago.js](https://www.npmjs.com/package/timeago.js) 是一个 nano 库（小于 2 kb），用于使用 *** time ago 语句格式化日期时间。例如：“3 小时前”,“5分钟后”，“刚刚”。

- React 版本在这里：[timeago-react](https://github.com/hustcc/timeago-react)。
- Python 版本在这里：[timeago](https://github.com/hustcc/timeago)

#### 用法
- 安装
```
npm install timeago.js
```
- 引用
```
import { format, render, cancel, register } from 'timeago.js';
```
#### API
之所以`timeago`能有这么小的原因是因为他只有四个`api`

- **format** 
> `format(date[, locale = 'en_US', opts])` 将日期实例/时间戳/日期字符串格式化为字符串。
> - `date`【日期实例/时间戳/日期字符串】
> - `locale`【可选参数：语言显示（默认英文）内置`en_US/zh_CN`】
> - `opts`【可选参数：opts是个对象中间包含两个值`relativeDate(与该时间进行对比)`，`minInterval(自动渲染的最小间隔),可以配合render函数使用`】
```
 // 以2019-01-01为例
 // new Date("2019-01-01").getTime() 1546300800000
 format(new Date("2019-01-01"), "zh_CN"); //4年前
 format("2019-01-01", "zh_CN"); //4年前
 format(1546300800000, "zh_CN"); //4年前
 format(1546300800000, "en_US"); //4 years ago
 format(1546300800000, "zh_CN",{ relativeDate : ' 2018-11-11 ' }); //一个月后
```
- **render & cancel** 

> - render(dom[, locale = 'en_US', opts])
> - cancel([dom]) 

> 制作一个带有必须**datetime**属性自动渲染的dom并取消。

HTML代码
```
<div class="timeago" datetime = "2016-06-30 09:20:00" > </div>
```
JS代码
```
import { render, cancel } from 'timeago.js';
 
const nodes = document.querySelectorAll('.timeago');
 
// 使用 render 方法实时渲染节点
render(nodes, 'zh_CN');
 
// 取消所有实时渲染任务,因为是实时渲染cancel的作用就类似于清空定时器🧹释放实例的所有资源与render需要成对出现
cancel();
```
- **register**
> register(locale, localeFunc), 注册一个新的语言环境,由于我在开发中很少用到我就把官网的搬过来方便大家查看🤓
```
const localeFunc = (number, index, totalSec) => {
  return [
    ['just now', 'right now'],
    ['%s seconds ago', 'in %s seconds'],
    ['1 minute ago', 'in 1 minute'],
    ['%s minutes ago', 'in %s minutes'],
    ['1 hour ago', 'in 1 hour'],
    ['%s hours ago', 'in %s hours'],
    ['1 day ago', 'in 1 day'],
    ['%s days ago', 'in %s days'],
    ['1 week ago', 'in 1 week'],
    ['%s weeks ago', 'in %s weeks'],
    ['1 month ago', 'in 1 month'],
    ['%s months ago', 'in %s months'],
    ['1 year ago', 'in 1 year'],
    ['%s years ago', 'in %s years']
  ][index];
};
register('my-locale', localeFunc);
format('2016-06-12', 'my-locale');// 6 years ago
```
### 在vue项目中使用
我一般在项目中是通过过滤器的方式进行使用的，大家也可以进行参照😀。
```html
<template>
	<view>
		<view>{{ ShowTime | timeFormat }}</view>
	</view>
</template>

<script>
import {
	format
} from "timeago.js"
export default {
  filters: {
    timeFormat(time) {
      return format(time, "zh_CN");
    },
  },
  data() {
    return {
		ShowTime:'2022-06-20'
	};
  }
}
</script>
```
## 总结

`timeago.js`主要用的`API`就是`format`，一定要动手去实践，希望可以对大家有帮助哦🎈。






