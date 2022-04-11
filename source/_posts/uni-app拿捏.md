---
title: uni-app拿捏🤏
tags: [uni-app,Vue]
categories: 阅读
index_img: /img/blog_img/index8.jpg
banner_img: /img/blog_img/banner8.jpg
---
# 我付出了这么多，你怎么超越我啊👨‍🔧

##  前言（为什么要使用uni-app）

 - 一套代码可以发布到小程序,`app`,`h5`等。目前支持几乎所有平台的小程序😏
 - 只需掌握`Vue`语法即可，上手极快🤔
 - 不需要app原生开发程序员了，减少成本。


## 前期准备工作

 -  创建项目和打包尽量使用`HbuilderX`开发工具 `HubilderX`自带了`uni-app`的运行环境🌮，包括后续如果`uni-app`升级了 你只需要更新编辑器就可以了始终保持编辑器是最新的✨。然后代码逻辑的编写建议还是使用自己熟悉的编辑器🍤。
- 创建项目，熟悉目录结构🍵。 
- 详细了解 manifest.json文件中每一个参数的意义🍐（下文有视频讲解哦🖼）

## 组件/插件引入以及使用

### 早期组件的引用方式

这种的引用方式其实已经足够清晰了🎏，但是总有小伙伴觉得麻烦🎍。

- `import`导入组件
- `components`里注册组件
-	`template`中使用组件

### 现在的引用方式

> 只要组件安装在项目的`components`目录下或`uni_modules`目录下，并符合`components`/组件名称/组件名称.`vue`目录结构✨。就可以不用引用、注册，直接在页面中使用(`easycom`组件规范`HBuilderX 2.5.5`起支持)
## UI组件
  [uview](https://www.uviewui.com/components/layout.html)👓
  > ###### 安装方式有两种选择!
  > - [插件市场进行安装](https://ext.dcloud.net.cn/) (提供了丰富的插件)
  > - 通过`npm`进行安装(尽量使用插件市场进行安装插件包，有可能有一些`npm`提供的包，`uni-app`支持的不是很好)
  
  [原生组件](https://uniapp.dcloud.io/component) 原生组件也提供很多好用的组件👓
   
## 开发中遇到的问题
##### [路由跳转](https://uniapp.dcloud.io/api/router)
> - 页面之间跳转 : `uni.navigateTo `
> - `tabBar`之间跳转: `uni.switchTab` 
>  由`A`页面填写表单跳转到`B`页面，再由`B`页面跳转到`A`页面 填写的表单消失了原因是使用了`uni.navigateTo`应该使用`uni.navigateBack` 路由跳转建议使用[uview中提供的路由跳转](https://www.uviewui.com/js/route.html)
##### [任意组件通信](https://ask.dcloud.net.cn/article/36010)
 ``` javascript
 uni.$emit('事件名',{params}) // 发起事件
 uni.$on('事件名',(params)=>{}) // 监听事件
 uni.$once('事件名',(params)=>{}) // 只监听事件一次 
 uni.$off('移除事件') // 移除事件
 ```
 ##### 版本兼容问题
 
![](https://s1.ax1x.com/2022/04/11/LExfqH.png)
app打包之后或者在编辑器上运行时可能遇到上图中的问题，有两种解决办法`🎐。
- 升级HubilderX的版本🎊(保证本地环境的版本与线上打包的版本一致)
- 使用版本忽略🎃（不推荐,因为毕竟是版本不统一，可能会造成异常）
在manifest.json文件的源码视图中配置忽略这个提醒，在“app-plus”->"compatible" 节点下添加配置
```
{
  "app-plus": {  
      "compatible": {  
          "ignoreVersion": true //true表示忽略版本检查提示框，HBuilderX1.9.0及以上版本支持  
      },  
  //....  
  }
}
```
#####	移动端的启动动画，如何兼容各种手机分辨率的适配。
> 使用[.9png](https://ask.dcloud.net.cn/article/35527)里面有具体制作方法
也可以让设计部帮咱们出.9png的图片。

##### [`plus is not defined`](https://www.html5plus.org/doc/h5p.html)
> `plus`是`5+Runtime`的内部对象。只有在手机端才能使用·进行调用 解决办法: 在系统中判断版本 `uni.getSystemInfoSync().platform`如果不用考虑网页端不加该判断也可以
##### 为什么要使用本地打包?

 > 包名规范 (打包的作用就是帮助我们生成`APK`、`IPA`文件)
 > - 包名必须包含至少两个段，由一个或多个点隔开。例如：`com.abc`，`tencent.qq.mm`；
 > - 每个段的字符必须是小写字母、数字或下划线`[a-z0-9_]`组成；
每个段必须以字母开头

  [Android证书](https://ask.dcloud.net.cn/article/35777 )
 ``` javascript
 1.	安装JRE环境
 2.	keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore
 3.	testalias是证书别名，可修改为自己想设置的字符，建议使用英文字母和数字
 4.	test.keystore是证书文件名称，可修改为自己想设置的文件名称，也可以指定完整文件路径
 5.	36500是证书的有效期，表示100年有效期，单位天，建议时间设置长一点，避免证书过期
 6.	keytool -list -v -keystore test.keystore   //查看证书信息
 7.	Enter keystore password: //输入密码，回车
 ```
 为什么要使用本地打包？如果某一天 你需要对接一个第三方的`sdk` 比如说一个`NFC`扫描身份证的功能🧵，对方提供的`sdk`是`jar`包的这种形式在`uni-app`中是无法进行实现的（当然也可能是因为我水平不够🤦‍♂️），只能通过本地打包的形式在原生`android`中进行实现。其余情况使用云打包是非常方便的🛒。
 
 ###### uni-app和jar包之间的通信如何实现？
 
- 在离线打包的项目中新建一个实现类
- 在实现类中调用第三方的jar包提供的sdk
- 在uni-app中调用实现类的方法实现通信
```
安卓端：
package com.hji.test;  
public class AddCount {  
public int androidAdd(int a, int b) {  
    // 这块就是安卓调用第三方sdk的方法
        return a + b;  
    }  
}  
Uni-app端:
 addUniApp(){  
     var AddCount = plus.android.importClass('com.hji.test.AddCount');  
     var addCount = new AddCount();  
     this.result1 = androidAdd.add(1,2);  
}
```
[Native.js](https://ask.dcloud.net.cn/article/88)
> 如果跟原生安卓有交互是一定要用到`native.js`的就像官网说的一样🎯;如果说`Node.js`把`js`扩展到服务器世界🚘，那么`Native.js`则把`js`扩展到手机`App`的原生世界,所以想要精通uni-app Native.js还是要有一定的了解的🍣。

#### 获取中文的地理位置信息（使用高德地图） 高德地图开放平台，app手机通知uniPush，后台常驻。
> 以上东西用起来还是有很多坑的，一一描述起来还是很困难的🎃，如果有小伙伴感兴趣，可以留言我们一起进步🙆‍♂️
## 总结
 其实`uni-app`提供的是一种框架实际上内部大多是都是vue的语法所以大家学习**uni-app**的前提一定要有vue的基础🍗，听说现在已经支持`vue3.0`了 大佬们都在努力，我们有什么资格不努力呀🎨。 加油！🍝