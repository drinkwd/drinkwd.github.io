---
title: 每周一推NPM包-第五弹
tags: [NPM, VUE]
categories: 技术
index_img: /img/blog_img/index23.png
banner_img: /img/blog_img/banner3.png
---

## 前言
**为了不让自己的空余时间都浪费掉，打算做一个每周一推的专栏，盘点一些好的插件，分享给大家**🎈。
## [NProgress](https://www.npmjs.com/package/nprogress)
大家在查看`vue-element-admin`或者某些相关文档的时候部分网站都会有浏览器加载进度条，接下来我们就用插件来实现它。👇

#### 用法
- 安装
```
npm install --save nprogress
```
- 引用
```
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
```
- 全局引用配置
- main.js
```javascript
//引入nprogress 进度条插件
import NProgress from 'nprogress'
// 简单配置  进度条,可以不配置：在axios中我们不再做配置，以用来区分。
NProgress.configure({ minimum: 0.01 });
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
```
#### API

- 只需调用start()和done()即可控制进度条。
```
NProgress.start();
NProgress.done();
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/351d5f375f05409b81537402682d9bc5~tplv-k3u1fbpfcp-zoom-1.image)

- 百分比：要设置进度百分比，请调用.set(n)，其中n是介于0-1之间的数字。

```
NProgress.set(0.0);     // .start()相似
NProgress.set(0.4);
NProgress.set(1.0);     // .done()相似
```
- 递增：只需使用.inc() 这会以随机数量增加它。这永远不会达到 100%：
```
 NProgress.inc();
```
- 设置启动值最小值默认`0.08`最大`1`
```
NProgress.configure({ minimum: 0.8 });
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c902df2aef543aaa3cc33d8a3a47500~tplv-k3u1fbpfcp-zoom-1.image)
- 设置使用缓动（CSS 缓动字符串）和速度（以毫秒为单位）调整动画设置。（默认值：ease和200）
```
NProgress.configure({ easing: 'ease', speed: 600 });
```
- 修改加载条的颜色（只需要全局替换对应的#29d就可以修改相关样式）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e414e723eae444658232a782a2819079~tplv-k3u1fbpfcp-zoom-1.image)

### 应用场景
可以配合请求的拦截器,或者路由的拦截器一起使用,加载`loading`。

### 在请求中使用
- api.js
```javascript
import axios from 'axios'
//引入nprogress 进度条插件
import NProgress from 'nprogress'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, //URL地址   环境变量文件
    timeout: 5000 ,//超时
})

// 请求拦截器
service.interceptors.request.use(
    config => {
    	// 开启进度条
		NProgress.start();
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response =>{
        // 关闭进度条
        NProgress.done()
    	return Promise.reject(response)
    },
    error => {
        // 关闭进度条
        NProgress.done()
        return Promise.reject(error)
    }
)

export default service;
```
### 在路由切换中使用
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

Vue.use(VueRouter);
export const constRouter = [
    {
        path: '/login',
        component: () => import('@/views/login/Login'),
    },
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constRouter
})
// 页面路由刚开始切换的时候
router.beforeEach(async (to,from,next) => {
    // 开启进度条
    NProgress.start();
})
// 页面路由切换完毕的时候
router.afterEach(() => {
    // 关闭进度条
    NProgress.done()
})
​
​
export default router
```
## 总结

`NProgress`的使用特别简单，希望大家可以根据需求合理的使用，且不要贪杯哦🎈。