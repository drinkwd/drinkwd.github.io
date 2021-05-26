---
title: App的开发方式如何拿捏🤏
tags: 代码人生
categories: 阅读
index_img: /img/blog_img/index7.jpg
banner_img: /img/blog_img/banner7.png
---
# 工欲善其事必先利其器📞

##  前言

如果你之前一直都没用过移动端，只是有个细微的了解，这时候领导让你开发app📱你会咋办呢？😥，网上的技术超多(跨平台，原生，混合，PWA，webApp)怎么才能快速的选出来哪个是你上手最快的呢？😫这篇我把我选型道路上的总结分享给还在选型的小伙伴😁
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b034046a1ab546d9a0a1f9fb6206c9ab~tplv-k3u1fbpfcp-zoom-1.image)


## 招聘网站

这招简直无敌，适用于领导让你预言各种技术🤣，你就直接去招聘网站上面搜索对应的技术如果有很多大厂在用就证明你选择的技术还是可以的，毕竟能入大厂的法眼，这时你也会，无比的骄傲，这技术不就选完了吗。🍕其实这也只是第一步上面的信息只是能让你缩小范围🤔，还是要根据上级的需求以及上手的复杂程度来决定，还需要你自己多斟酌斟酌的哈~~接下来我们聊聊众多的App开发方式😄。

### 安卓原生开发
对于Android移动应用程序开发，示例可以是`Kotlin`或`Java`前端的同学还是不要上手尝试了容易离职🙃。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8557017565714c3590baddb25f423ddc~tplv-k3u1fbpfcp-zoom-1.image)

## 优点
> - 很多更好的功能在离线环境
> - 支持设备API，这意味着更高的可用性
> - 针对每个平台定制的UI组件，可提升用户体验
> - 可以访问所需的硬件-更容易防止错误
> - 无需依赖开源库

## 缺点
> - 如果您需要用于更多操作系统的本机移动应用程序，则需要更长的时间(比如微信小程序，支付宝小程序等等)
> - 上手比较困难，特别是我们这种没有`java`开发经验的。

### WebApp
`Web App `是使用网页做的应用程序，必须在浏览器中使用，主要使用的就是`HTML`，`javascript`，`css`😝。2008年，`w3c` 组织发布了 `HTML` 第5版，简称 `HTML5 `，该版本大大增强了网页的功能，使得网页可以当作应用程序使用，而不仅仅是展示文字和图片，这就是 Web App 的由来🥨。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90859a8692fa410291c514977333862a~tplv-k3u1fbpfcp-zoom-1.image)

## 优点
> - 不需要下载安装，打开浏览器就能使用，而且总是使用最新版本
> - 对于开发者来说，Web App 写起来比较快，调试容易，不需要应用商店的批准就能发布。
## 缺点

> - Web App 需要打开浏览器才能使用，这意味着，用户必须记住如何导航到它，要么直接输入网址，要么翻找书签,特别不方便,不能从手机的首屏直接进入。
> - 缺乏手机状态栏和锁屏时的通知推送能力。
> - 不支持脱机访问（即断网也能使用）

###  渐进式 Web App(PWA)
`webApp`的升级版它可以把网站缓存在手机里面，供离线时使用，还能在手机首屏生成图标，直接点击进入，并且有通知推送能力，也不带有浏览器的地址栏和状态栏，跟原生 `App` 的使用体验非常接近。也有很多网站提供了PWA的功能🍤。
 - [lavas](https://github.com/lavas-project/lavas)(基于` Vue` 的 `PWA` 解决方案，帮助开发者快速搭建 `PWA` 应用)这个框架是基于`vue`的之前研究过一阵不过由于工作的原因最近也没有关注今天突然发现官网打不开了也不知道是什么原因。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/471654ac30e1413baed4368bbf0ecba5~tplv-k3u1fbpfcp-zoom-1.image)


### 混合应用（hybrid App）
混合 `App （hybrid App）`顾名思义就是原生 `App` 与` Web App` 的结合（Web 技术栈 + 容器技术栈）。它的壳是`原生 App`，但是里面放的是网页🎥。 可以理解成，混合 `App` 里面隐藏了一个浏览器，用户看到的实际上是这个隐藏浏览器渲染出来的网页。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53615e03e070466f9277807b8cf931f6~tplv-k3u1fbpfcp-zoom-1.image)

## 相关技术
- [PhoneGap](http://www.phonegap100.com/)
- [Cordova](http://cordova.axuer.com/)
- [Ionic](https://www.runoob.com/ionic/ionic-tutorial.html)
## 优点

> - Web 技术是跨平台的，开发者只写一次页面，就能支持多个平台。
> - Web 页面的调试和构建，远比原生控件简单省时（毕竟前端还是喜欢chrome的console）。
> - 混合 App 的灵活性大，很容易集成多种功能。
## 缺点
> - 其实上手还是需要点门槛的，特别的容器栈学习如何调用硬件的API
> - 复杂的应用程序无法通过此解决方案完美运行，更多功能会降低其运行速度

### 跨平台应用程序开发

跨平台技术栈指的是使用一种技术，同时支持多个手机平台。它与混合技术栈的区别是，不使用 `Web` 技术，即它的页面不是 `HTML5` 页面，而是使用自己的语法写的 `UI` 层🎊，然后编译成各平台的原生 App。
这个技术栈就是纯粹的容器技术栈,学习时，除了学习容器的 `API Bridge`，还要学习容器提供的 `UI` 层，即怎么写页面🧶。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85a0ef77114c4f7992619bf9c7dbd540~tplv-k3u1fbpfcp-zoom-1.image)

## 相关技术

- [React Native](https://reactnative.cn/docs/getting-started)
- [Flutter](https://flutterchina.club/)（适合后端）
- [uni-app](https://uniapp.dcloud.io/)（适合前端）

## 总结
我猜你们应该知道选择什么作为你们的开发移动`app`的框架了吧🎈，其实各有各的好处，也各有各的缺点，还是要考虑到你们需求和成本🎡。因为我就是个单纯的前端开发 在网上一顿查找之后还是觉得`uni-app`比较适合我们的项目，前端上手也非常快🎨。只要你会`vue`我保证你当天就开发出一个简单的`app`，其实随着学习的深入也会感觉到有难处必须调用厂家给的安卓原生`sdk`（一堆`jar`包和`so`文件）我需要用uni-app离线打包，在写原生的代码其实也是很难的。还是各取所需吧😎。
## 参考文章
[H5手机App开发入门](http://www.ruanyifeng.com/blog/2019/12/hybrid-app-concepts.html)

[Native vs. Hybrid vs. Cross-Platform: How and What to Choose?](https://dzone.com/articles/native-vs-hybrid-vs-cross-platform-how-and-what-to)