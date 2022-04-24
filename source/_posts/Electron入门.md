---
title: Electron入门
tags: [Electron,Vue]
categories: 技术
index_img: /img/blog_img/index10.jpg
banner_img: /img/blog_img/banner10.jpg
---
## 前言

最近公司要做`windows`客户端，但是公司还缺少`C#`的开发人员🎫，网上很早就有了`electron`实现`windows`客户端，于是就需要前端的同事通过`electron`来实现一款应用替代`C# winform `窗体🎨。

## 什么是electron?

> 官网解释：使用 `JavaScript`，`HTML` 和 `CSS` 构建跨平台的桌面应用程序，每一个窗体就是对应的一个`html`页面

## 快速入门
官网也提供了快速入门的方案，相关代码如下。
``` 
#克隆这个仓库
git 克隆 https://github.com/electron/electron-quick-start
#进入仓库
cd electron-quick-start
#安装依赖
npm 安装
#运行应用程序
npm start
```
不出意外的情况下，你就会弹出如下窗口💚

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cd773e915b44b01979405d92779c58e~tplv-k3u1fbpfcp-zoom-1.image)

## 自己实现`hello World`

####  全局安装`Electron`
```
# 如果安装失败可以使用cnpm或者改用淘宝源进行安装(可以全局安装也可以局部安装)
npm install -g electron
```
#### 初始化项目
新建一个文件夹尽量使用英文，在该目录下执行
```
npm init --yes
```
#### 创建入口文件也就是主进程文件（下文会提什么是主进程）要与`package.json`中`main`对应的文件名一致
``` javascript
/*
 * @Author: drinkwd
 * @Date: 2022-04-11 17:38:08
 * @LastEditors: drinkwd
 * @LastEditTime: 2022-04-12 14:25:18
 * @Description: 主进程入口
 */
const {app, BrowserWindow } = require('electron')
let mainWindow = null // 主窗口
// app代表electron的引用，BrowserWindow代表窗体
// 当app准本就绪之后创建一个800*600的窗体
app.whenReady().then(() => {
  // 创建窗体
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
  })
  // 加载渲染进程文件
  mainWindow.loadFile('index.html')
  // 监听窗口关闭回调，减少资源占用
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
```
#### 创建渲染进程文件（下文会提什么是渲染进程）
``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    hello World
  </body>
</html>
```
#### 查看效果

``` 
npm start # 不出意外的话会出现一个hello World窗体
```
> 如果报这个`Cannot find module 'fs/promises'`错误，需要升级一下`nodejs`的版本
#### Electron中主进程与渲染进程的关系

- 一般一个程序只有一个主进程也就是package.json中对应的入口文件💨。
- 渲染进程就是在主进程中加载的html文件，一个程序可以有多个渲染进程，并由主进程读取控制💫。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/752bfb8d048048d68a264192ce9d51b8~tplv-k3u1fbpfcp-zoom-1.image)

这个时候在回过头看上面的代码是不是眼前一亮，更加清晰明了🍺。
#### 基础案例 

> 注：不同版本的`electron`有些语法可能会有区别，如果有效果没有生效，先查看版本在进行排错，可能会减少很多坑。

##### 案例1 读取文件内容
- 在文件根目录创建`file.txt`文件
```
# file.txt
file中的文件内容测试
```
- 在index.html的body中加入相关元素，触发读取事件，展示读取内容
``` html
<body>
    <button id="btn">
      读取文件
    </button>
    <!--展示读取内容-->
    <div id="content"></div>
    <script src="render/index.js"></script>
  </body>
```
- 编写读取代码，在根目录下新建目录及文件`render->index.js`
```
var fs = require("fs")
window.onload = function(){
  var btn = this.document.querySelector('#btn')
  var content = this.document.querySelector('#content')
  btn.onclick = function(){
    fs.readFile('file.txt',(err,data) =>{
      content.innerHTML = data
    })
  }
}
```
- 运行`npm start `表面上看是没有什么问题但是你可能会得到如下错误信息

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c704d009bae24085bb86c6f72675a7c5~tplv-k3u1fbpfcp-zoom-1.image)

原因：如果想在项目中使用`nodejs`中的内容必须在创建窗口时引用如下代码
``` javascript
/*
 * @Author: drinkwd
 * @Date: 2022-04-11 17:38:08
 * @LastEditors: drinkwd
 * @LastEditTime: 2022-04-12 14:25:18
 * @Description: 主进程入口
 */
const {app, BrowserWindow } = require('electron')
let mainWindow = null // 主窗口
// app代表electron的引用，BrowserWindow代表窗体
// 当app准本就绪之后创建一个800*600的窗体
app.whenReady().then(() => {
  // 创建窗体
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      // 为了使用node
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  // 加载渲染进程文件
  mainWindow.loadFile('index.html')
  // 监听窗口关闭回调，减少资源占用
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
```
这时在运行`npm start`就可以正常运行了。

##### 案例2 在渲染进程中打开新窗口
当我们知道了`Electron`有主进程和渲染进程后，我们还要知道一件事😶，就是`Electron`的`API`方法和模块也是分为可以在主进程和渲染进程中使用的，具体[参考文档](https://www.electronjs.org/docs/latest/api/app)👀。那如果我们想在渲染进程中使用主进程中的模块方法时，可以使用`Electron Remote`解决🍠。
- 在`index.html`的`body`中增加如下代码
``` html
<body>
    <button id="btn_open">
      打开新窗口
    </button>
  </body>
```
- 创建新窗口文件`newOpen.html` 内容如下
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div>新窗口</div>
</body>
</html>

```
- 在`render->index.js`中增加如下代码
``` javascript
  var btn_open = this.document.querySelector('#btn_open')
  const { BrowserWindow } = require('@electron/remote')
  btn1.onclick = ()=>{
    var newWin = new BrowserWindow({
      width: 500,height: 500,
      webPreferences:{
        nodeIntegration:true,
        contextIsolation: false
      }
    })
    newWin.loadFile('newOpen.html')
    newWin.on('close',()=>{
      newWin = null
    })
  }
```
- 在主进程中加载渲染进程的下方一定要加入如下内容否则是无法使用`remote`的
```javascript
  // 开始 为了在渲染线程使用remote
  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(mainWindow.webContents)
```

##### 案例3 创建菜单以及快捷键

我们可以看到在`Electron`的左上角有一些菜单，那我们如何在`Electron`中自定义这些菜单呢。

- 在根目录中新建`menu.js` 代码如下
```javascript
const {Menu,BrowserWindow} = require('electron')
var template = [{
  label: '菜单1',
  submenu:[{
    label: '子菜单1', // 菜单名称
    accelerator: 'ctrl+n', //快捷键
    click: () =>{
      为菜单增加点击事件
      var win = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences:{
          nodeIntegration: true,
          contextIsolation: false
        }
      })
      win.loadFile('newOpen.html')
      win.on('closed',()=>{
        win = null
      })
    }
  }]
},{
  label: '菜单2',
  submenu:[{
    label: '子菜单2'
  }]
}]
// 构建菜单
var m = Menu.buildFromTemplate(template)
// 设置菜单
Menu.setApplicationMenu(m)
```
- 在主进程中引用该文件
``` javascript
require('./menu.js') //渲染菜单
```
##### 案例4 打开调试面板
当我们在没有自定义导航菜单的时候可以通过上方导航的`View->Toggle DevTools` 🐇打开控制台方便调试，那如果我们自定义菜单之后应该怎么打开调试控制台呢🙋‍♂️?。

- 在主进程中增加如下代码，在程序启动的时候自动打开控制台

``` javascript
mainWindow.webContents.openDevTools()
```

##### 案例5 创建右键菜单

右键菜单是在渲染进程中进行编辑的所以我们要在渲染进程中编写如下代码
``` javascript
// render->index.js
  const {Menu, getCurrentWindow } = require('@electron/remote')
  // 创建右键菜单内容，与导航菜单逻辑相同
  var rightTemplate = [{
    label: '右键菜单1',
  },{
    label:'右键菜单2'
  }]
  var m = Menu.buildFromTemplate(rightTemplate)
  // 监听鼠标右键事件
  window.addEventListener('contextmenu', function(e){
    // 阻止默认事件
    e.preventDefault()
    //把菜单模板添加到右键菜单
    m.popup({
      window: getCurrentWindow()
    })
  })
```

##### 案例6 通过链接打开浏览器，嵌入网页，打开子窗口

通过链接打开浏览器

- 在`index.html`的`body`中增加`a`标签
```
<a id="aHref" href="https://drinkwd.github.io/">打开博客</a>
```
- 如果什么都不写这时运行程序，该网址会在窗口内打开🎨，我们想要的时候通过浏览器来打开该网址在`render->index.js`中增加如下代码👇
```javascript
const {shell} = require('electron')
var aHref = this.document.querySelector('#aHref')
aHref.onclick = function(e){
  e.preventDefault()
  var href = this.getAttribute('href')
  shell.openExternal(href)
}
```
- 这样在运行的时候就会通过默认浏览器打开该链接🛹

嵌入网页

- 在主进程中添加如下代码
```JavaScript
// 实例化View
const view = new BrowserView()
// 主窗口中引用类似iframe
mainWindow.setBrowserView(view)
// 设置位置与宽高
view.setBounds({ x: 0, y: 50, width: 500, height: 600 })
// 加载内嵌网页地址
view.webContents.loadURL('https://electronjs.org')
```
- 执行npm start就会在指定位置显示出你引入的网页

创建子窗口，传值（与网页的传值相同）

- 我们之前提到过在渲染进程中使用`remote`打开一个窗口🧶，实际上就是一个新窗口，但是创建子窗口需要使用`window.open`来实现🎣

- 在`index.html`增加打开子窗口按钮元素
```html
<button id="sonWindow">打开子窗口</button>
<!--赋值-->
<div id="mytext"></div>
```
- 在`render->index.js`中打开子窗口
```javascript
var sonWindow = this.document.querySelector('#sonWindow')
sonWindow.onclick = function(e){
  e.preventDefault()
  // 打开子窗口
  window.open("./test.html")
}
// 监听子窗口传过来的值
window.addEventListener('message',(msg)=>{
  console.log(msg)
  var mytext= document.querySelector('#mytext')
  mytext.innerHTML = msg.data
})
```
```html
<!--test.html-->
<body>
  <h1>子窗口</h1>
  <button id="popbtn">向父窗口传递信息</button>
</body>
```
```javascript
// render->index.js
var popbtn = this.document.querySelector('#popbtn')
popbtn.onclick = function(){
  window.opener.postMessage('我是子窗口传递过来的信息')
}

```

##### 案例7 打开各种对话框与桌面通知,在渲染进程实现
- 在`index.html`中增加如下代码👇
```html
<body>
  <button id="opendialog">打开文件框</button>
  <button id="savedialog">保存文件对话框</button>
  <button id="messagedialog">消息对话框</button>
  <button id="postpush">桌面消息通知</button>
  <script src="render/demo5.js"></script>
</body>
```
- 在`render->index.js`中进行实现
```javascript
var opendialog = this.document.querySelector('#opendialog')
var savedialog = this.document.querySelector('#savedialog')
var messagedialog = this.document.querySelector('#messagedialog')
var postpush = this.document.querySelector('#postpush')
const {dialog} = require('@electron/remote')
// 打开文件框
opendialog.onclick = function(){
  // 选择文件
  dialog.showOpenDialog({
    title:'请选择图片', // 左上角标题
    defaultPath:'file.txt', //默认路径
    filters:[{ // 过滤 
      name:'text',
      extensions:['txt'] //过滤文件后缀 保留的
    }],
    buttonLabel:'打开文本' //自定义打开按钮
  }).then((res)=>{
    console.log(res.filePaths[0]) //获取文件信息
  }).catch(err=>{
    console.log(err) // 错误信息
  })
}
// 保存文件
savedialog.onclick = function(){
  dialog.showSaveDialog({
    title:'保存文件', // 左上角标题
  }).then((res)=>{
    console.log(res) //获取文件信息
  }).catch(err=>{
    console.log(err) // 错误信息
  })
}
// 消息对话框
messagedialog.onclick = function(){
  dialog.showMessageBox({
    type:'warning',
    title:'消息对话框',
    message:'消息对话框内容',
    buttons:['按钮1','按钮2']
  }).then((res)=>{
    // 点击按钮之后的回调函数
    console.log(res)
  })
}
// 桌面通知
postpush.onclick = function(){
  let option = {
    title:'通知标题',
    body: '通知内容'
  }
  new window.Notification(option.title,option)
}
```

##### 案例8 断网检测（应该是`html5`的功能），复制文字，注册全局快捷键

- 断网检测：在`render->index.js`中监听该事件如果触发相应事件进行相应操作

``` JavaScript
// 断网之后再次链接会显示该对话框
window.addEventListener('online', () => {
  alert('链接成功')
})
window.addEventListener('offline', () => {
  alert('断网了,请检查网络连接')
})
```
- 复制文字 引用clipboard模块，因为这个模块主进程和渲染进程中都有所以就不需要用到`remote`
```html
<body>
  <h1 id="content">想要复制的内容</h1>
  <button id="btnCopy">复制</button>
  <script src="render/demo7.js"></script>
</body>
```

```javascript
// render->index.js
//const { clipboard } = require("electron") 两种引用方式都可以
const { clipboard } = require("@electron/remote")
var content = document.querySelector('#content')
var btnCopy =  document.querySelector('#btnCopy')
btnCopy.onclick=function(){
  clipboard.writeText(content.innerHTML)
  alert('复制成功')
}
```
- 注册全局快捷键： 引用`globalShortcut`模块
```javascript
// index.js 主进程文件
const {app, BrowserWindow } = require('electron')
let mainWindow = null // 主窗口
// app代表electron的引用，BrowserWindow代表窗体
// 当app准本就绪之后创建一个800*600的窗体
app.whenReady().then(() => {
  // 创建窗体
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      // 为了使用node
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  // 加载渲染进程文件
  mainWindow.loadFile('index.html')
    // 快捷键打开网址,内部
  globalShortcut.register('ctrl+e',()=>{
    mainWindow.loadURL('http://www.baidu.com')
  })
  let isRegister = globalShortcut.isRegistered('ctrl+e')?'success': 'fail'
  console.log('--->',isRegister)
  // 监听窗口关闭回调，减少资源占用
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
app.on('will-quit',function(){
  // 注销全局快捷键
  globalShortcut.unregister('ctrl+e')
  // 注销全局快捷键
  // globalShortcut.unregisterAll()
})
```

#### Vue项目中集成Electron

通过上面的案例我们已经简单了解了`Electron`的基本用法和使用😝，但是我们在实际的工作当中大多都是使用`vue`或者`react`进行项目开发🍤，下面就说一下如果在`vue`项目中集成`Electron`🎈

- 创建一个`vue`的项目，通过`vue-cli`脚手架搭建就可以，这里就不过多叙述了，前端开发肯定都会这一步📞。
- 引用[vue-cli-plugin-electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/)插件
```
# 这里使用vue add 不使用npm install的原因是因为vue add会对脚手架有一些修改
# 会自动帮助我们生成主进程文件，scripts脚本安装相关依赖。
vue add electron-builder 
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46a5a4eda05b499abf93d1669b9444e5~tplv-k3u1fbpfcp-zoom-1.image)

- 这时只需要运行` npm run electron:serve`就会将前端项目运行至`Electron`中生成一个桌面程序🤣。

如果你的启动非常慢可以将`background.js`中的这段代码注释👇
```javascript
// 安装vue开发者插件
 if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
```
#### Electron打包
第一次打包会很慢很慢，也可能会超时，解决方案可以参考[这篇](https://www.cnblogs.com/qirui/p/8328015.html)
```
npm run electron:build
```
- 如果你很顺利的话就会在根目录看到`dist_electron`文件夹里面就会有绿色版的`exe`和安装包🤔（没有的话就是打包失败了）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d9946fc3e074c59b032da755ef0e3d0~tplv-k3u1fbpfcp-zoom-1.image)


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd76026c03ee4401953cba33b499e9ae~tplv-k3u1fbpfcp-zoom-1.image)

- 但是默认的安装体验是非常差的我们可以通过`vue.config.js`来设置安装过程的步骤具体😛[参考文档](https://www.electron.build/)

```javascript
// vue.config.js
module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win:{
          target: 'nsis' // 安装方式
        },
        nsis:{
          oneClick: false, 是否一键安装
          allowToChangeInstallationDirectory: true // 允许更改安装目录
        }
        // options placed here will be merged with default configuration and passed to electron-builder
      },
      nodeIntegration: true,
      contextIsolation: !true
    }
  }
};
```
#### 主进程与渲染进程通信
- 用到两个模块 `ipcMain`和`ipcRender`
- 在渲染进程中发送事件给主进程，监听主进程发过来的事件
```html
<template>
  <div class="loginContainer">
    <div class="systemLogoBox">
      <img class="systemLogo" src="@/assets/img/logo.png" @click="sendMessage" />
    </div>
  </div>
</template>
<script setup>
  import {onMounted} from 'vue'
  import { ipcRenderer } from 'electron'
  const sendMessage = () => {
    // 向主进程发送事件类似$emit
    ipcRenderer.invoke("hello")
  }
  onMounted(() => {
    ipcRenderer.on('helloClick', () => {
      console.log('我收到了点击事件')
    })
  })
</script>
```
- 主进程中监听渲染进程中发送的事件，发送事件给渲染进程
```javascript
// background.js增加如下代码
import {ipcMain,Notification} from 'electron'
// 监听渲染进程发送的事件
ipcMain.handle('hello', () => {
  // 创建桌面通知
  const n = new Notification({
    title: '通知信息',
    body: "你收到了一条消息"
  })
  n.show()
  n.on('click', () => {
    console.log(win)
    // 点击桌面通知的时候发送事件给到渲染进程
    win.webContents.send('helloClick')
  })
})
```
如果在开发的过程中发现了一些问题可以先看看官网的[常见问题处理](https://www.electronjs.org/docs/latest/faq)特别注意`nodejs`和`Electron`的版本

## 总结

`Electron`的入门还是比较简单的，但是在实际工作当中可能会出现调用`dll`文件或者与硬件进行交互的时候可能就会消耗一定的精力😥，如果我在后期遇到了类似的工作，也会总结起来与大家进行分享滴🎈
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5fdaf4ef2b14ee39dd797ac2067d5ad~tplv-k3u1fbpfcp-zoom-1.image)


##### 参考链接

- [技术胖](https://jspang.com/)

- [vue-cli-plugin-electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/)

- [electron.build](https://www.electron.build/)

- [electron](https://www.electronjs.org/)
