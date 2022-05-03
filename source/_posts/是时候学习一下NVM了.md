---
title: 是时候学习一下NVM了
tags: [NPM,NodeJS]
categories: 技术
index_img: /img/blog_img/index12.jpg
banner_img: /img/blog_img/banner12.jpg
---
## 前言

在工作中我们肯定会接触到形形色色的项目，避免不了就可能会用到不同版本的`NodeJs`，如果你每次都是卸载重装反复循环简直是恶心的要命-如下图👇，这时候`nvm`就派到用场了。



![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8759753fd83745cca71adfa7881d5a69~tplv-k3u1fbpfcp-zoom-1.image)


## nvm是什么？

`Node Version Manager`，也就是说`NVM`是`Node.js`的版本管理器📞，通过`NVM`我们就可以安装多个不同版本的`Node.js`并在需要的时候进行切换🥙。

## 安装前提

如果之前你的电脑中有`NodeJs`🤣，网上有的说是不需要卸载,直接安装`nvm`就可以,在安装过程中会提示你将本地安装的`NodeJs`加入到`NVM`管理中✊。我尝试了很多次，安装`NVM`成功之后无法切换`NodeJS`版本，并且找不到之前安装的`NodeJs`😴，所以还是**强烈建议**大家在安装`nvm`之前**卸载NodeJs**😛，要不然会有很多坑，将所有版本的`NodeJs`都通过`NVM`来管理🎑。

## 完整卸载NodeJs
- 从卸载程序卸载程序和功能。

- 寻找这些文件夹并删除它们。根据您安装的版本，`UAC`设置和`CPU`架构，这些可能或可能不存在(全局安装的依赖包无法使用均要删除)：

> `C:\Program Files (x86)\Nodejs` <br/>
> `C:\Program Files\Nodejs` <br/>
> `C:\Users\{User}\AppData\Roaming\npm（或%appdata%\npm）`<br/>
> `C:\Users\{User}\AppData\Roaming\npm-cache（或%appdata%\npm-cache）`<br/>

- 检查您的`%PATH%`环境变量以确保没有引用`Nodejs`或`npm`存在(高版本的`NodeJs`会自动清除环境变量)。

- 重新启动电脑。

## 安装NVM过程
- [github下载地址](https://github.com/coreybutler/nvm-windows/releases)

- 下载安装版
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4654d3159a494ace9503caef0f9fa5fa~tplv-k3u1fbpfcp-zoom-1.image)

- 安装路径

`nvm`安装的时候需要选择两个路径，一个是`nvm`对应的路径以及通过`nvm`下载`NodeJs`的安装路径，然后一直下一步就可以🙂。
> 注：路径中不能有空格和中文

- 安装成功之后就会变成下图，会自动生成动态的环境变量

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4c5e5e3c1e94131bb284b39989f3ece~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca9290aef9b64b64b04d2c8b66edef61~tplv-k3u1fbpfcp-zoom-1.image)

- 设置淘宝镜像 打开`settings.txt`增加下面两句话
```
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```
> [npm设置淘宝镜像和cnpm的区别](https://www.jianshu.com/p/fae87fef8ad0)



## nvm 语法

- `nvm list `

可以列出你在本地电脑通过`nvm`方式安装的`NodeJs`版本

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/726c80e0dcc1442783c77fe68e77de92~tplv-k3u1fbpfcp-zoom-1.image)

- `nvm list available` 

可以列出远端可用的NodeJS版本`LTS`代表稳定版本
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e7c68b722d54f97b765e820538f3a18~tplv-k3u1fbpfcp-zoom-1.image)

- `nvm install 版本号`

下载远端指定的NodeJS版本，自动下载配套的`npm`包

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc0f5662ea474a8190c94eabdf326f57~tplv-k3u1fbpfcp-zoom-1.image)

- `nvm use 版本号`

切换`NodeJs`版本（一定要以管理员的身份打开cmd进行切换否则会报错🍤）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81d281dae1f547768a36ce63dff6bf0a~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8916e0988a241dd9235b73949c480a8~tplv-k3u1fbpfcp-zoom-1.image)

## 文件夹详解
当你安装了多个版本的`NodeJS`之后在对应的`nvm`文件夹中就可以看到多个版本的`NodeJS`，每个版本都是相互隔离的。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51eccf2e397f4fb1a439c1c47efc44b4~tplv-k3u1fbpfcp-zoom-1.image)
> 疑问： 在安装nvm的时候不是选择了nvm下载NodeJs的安装路径吗？怎么全部跑到了nvm的目录下。<br/>
> 解释： 可以看[这篇文章](https://segmentfault.com/a/1190000038252763)后半部分nvm版本的切换实质。

## 全局安装依赖

全局安装依赖是根据当前正在使用的`nodejs`版本进行安装的比如在`NodeJs_14.16.0`中使用了如下命令
```
npm install -g cnpm 
```
`cnpm`只是在`NodeJS_14.16.0`的版本中使用,切换到其他版本的nodeJS还是会显示如下提示

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e3ba886f06749d9a13a6b82d4a38e77~tplv-k3u1fbpfcp-zoom-1.image)

原因就是因为不同的`NodeJS`版本是相互独立的。

## 总结

`nvm`还有好多好用的点需要我们一点一点去探索，目前我只用到了这些，也已经可以满足日常的工作了🥠，喜欢研究的小伙伴可以在网上自行研究哦🤙🤙🤙


## 参考链接

[cnpm与npm](https://www.jianshu.com/p/fae87fef8ad0)

[NVM、NPM、Node.js的安装选择](https://segmentfault.com/a/1190000038252763)
