---
title: electron调用第三方dll
tags: [Electron]
categories: 技术
index_img: /img/blog_img/index11.jpg
banner_img: /img/blog_img/banner11.jpg
---
## 前言

[上一篇文章](https://juejin.cn/post/7090088327260569630)有说到过我们可能会遇到使用`Electron`调用第三方提供的`dll`，今天就来详细的说一下如何调用`dll`库，坑巨多，让我娓娓道来😣，如果对`Electron`还不太熟悉的小伙伴可以看我的上一篇文章，下面的内容可能会多次提到。建议看完[上一篇]((https://juejin.cn/post/7090088327260569630))，再来看这一篇会更加清晰哦🤣。

## 依赖库选择

当收到这个需求的时候，肯定也是一脸蒙😌，我一个前端也没写过`dll`，我怎么来调用啊?做过`nodejs`的同学应该能清楚它提供了这样的能力🤙，如果是用`c++`生成的`dll`可能会用到[`ffi-napi`](https://github.com/node-ffi-napi/node-ffi-napi)这个库,如果是`c#`生成的`dll`就会使用到[`edge`](https://github.com/tjanczuk/edge)这个库😄,因为我们公司都是用`c#`编写的`dll`，所以我会主要介绍一下`edge`,`c++`调用`dll`的文章可以看[这篇](https://www.jianshu.com/p/dd9463dead8c)我有好多坑都是看了这篇文章才清楚，抱拳了✊。

## NodeJs调用dll
- 创建demo项目
```
#找到一个空目录执行
npm init --yes
```
- 安装edge
```
npm install edge --save
```
- 创建index.js
```
# 官网示例
var edge = require('edge');
var helloWorld = edge.func(`
    async (input) => { 
        return ".NET Welcomes " + input.ToString(); 
    }
`);
helloWorld('JavaScript', function (error, result) {
    if (error) throw error;
    console.log(result);
});
```
- 运行（噩梦降临👇）
```
node index.js
```
不出意外它报错了，报错内容如下。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0aaf955dae344688ae41d7f4ea298283~tplv-k3u1fbpfcp-zoom-1.image)
根据报错内容我们可以发现，`edge`尚未针对 `node.js `版本` v16.14.0 `进行预编译🍺，我第一点想的就是是不是我的`nodejs`版本太高了🎥，但是它有没说让我降到哪个版本我应该怎么改啊😣，于是我就去`Google`🦠,发现`edge`只支持低版本的`nodejs`并且作者已经好久不维护了，如果使用的是`12.x`以上版本的nodejs需要使用[`edge-js`](https://github.com/agracio/edge-js)这个库(我滴个亲娘嘞🤦‍♀️)。
> 好的地方就是它的用法与`edge`只需要将引用的`edge`改成`edge-js`就可以了

- 修改之后，大功告成

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6010166c998e4c2188d9cff14d6d0903~tplv-k3u1fbpfcp-zoom-1.image)

- 找你的`c#`同时去开发一个`dll`，告诉她只输出一句话就行，分分钟搞定😄，如果不好意思找的同事，我也分享一下我的`Demo.dll`,具体内容可以查看下方👇。
> 链接：https://pan.baidu.com/s/1K6teI3la2sBDkKNpAPjAPA 
提取码：z3s0
- 在项目的根目录引入dll文件

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f48702942db4f249627202691d169b4~tplv-k3u1fbpfcp-zoom-1.image)

- 修改index.js
```javascript
const edge = require('edge-js');
const path = require('path');
var invoke1=edge.func({
    assemblyFile:path.resolve("Demo.dll"), //找到对应的dll文件
    typeName:"Demo.Startup", // C#中class的名字就是StartUp
    methodName: "Invoke" // 导出dll的方法名
})
invoke1("入参",function(err,result)
{
    if (err) throw err;   
    console.log(result);
}); 
```
- 运行(噩梦再次降临👇)
```
 node index.js
```
你可能会遇到如下错误
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8479ac9d3a7493e8525ff67f3dff4d3~tplv-k3u1fbpfcp-zoom-1.image)

解决方案（联系的`dll`开发同事，将下面的话转述给他）
>引入`C#`类库时不要使用`netcore`版本🥩,需要使用`.net framework 4.x`版本的类库（解决办法简单，找办法的经历实在太过痛苦🎍）

- 重新引入dll，大功告成



![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0aaaed944795495b8219ff5eae59e5a2~tplv-k3u1fbpfcp-zoom-1.image)

## Electron中调用dll

在`edge-js`官网中要是看的仔细的小伙伴可以发现如果在`Electron`中调用`dll`需要使用[`electron-edge-js`](https://github.com/agracio/electron-edge-js)库而不是`edge-js`在[上一篇文章](https://juejin.cn/post/7090088327260569630)已经说过了怎么创建`Electron`项目这里就不再赘述了，只把新增的代码在这里说一下。
- 在上一章的`render->index.js`中增加如下代码
``` javascript
// 调用dll
const edge = require('electron-edge-js');
console.log(path.resolve("Demo.dll"))
var invoke1 = edge.func({
  assemblyFile: path.resolve("Demo.dll"),
  typeName: "Demo.Startup",
  methodName: "Invoke"
})
invoke1("入参", function (err, result) {
  if (err) throw err;
  console.log(result);
});
```
- 运行（噩梦第三次降临👇）
```
npm start 
```
同样的问题，这次说的是`electron`的版本太高了（我本地的nodejs版本是16.14.0）还是没有告诉我`Electron`应该降到什么版本🥙。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/628ebc3c9de44579abe9226a0b92a898~tplv-k3u1fbpfcp-zoom-1.image)
在官网我看到了这样一张图。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79bd8552515440b3b805935d70c67b61~tplv-k3u1fbpfcp-zoom-1.image)

我抱着试试看的态度把`electron`的版本降低到了`13.0.0`（它成功了，但其实我没有降低`nodejs`的版本）
`electron：13.0.0` `NodeJs：16.14.0`

- 重新运行
```
npm start 
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19e57355f1be43909e72b8db24d02fe1~tplv-k3u1fbpfcp-zoom-1.image)

## 在集成Electron的vue项目中调用dll

> 可能有的小伙伴会问了，上面的案例已经在`Electron`中调用`dll`了为什么还要在单独列出来一个类目啊？</br>
 答：我也不想啊，你试试就知道了，他是真的不一样呀😥

- 在上一章创建的`vue`项目的根目录增加`resources`目录将`dll`文件拷贝过去。


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4023f25c161640a3944783889eb99020~tplv-k3u1fbpfcp-zoom-1.image)

- 给项目中的某个元素增加一个点击事件，内容如下，其实跟上面的代码都是一样的
```javascript
const edge = require('electron-edge-js');
const path = require('path')
var invoke1 = edge.func({
    assemblyFile: path.resolve("resources/Demo.dll"),
    typeName: "Demo.Startup",
    methodName: "Invoke"
  })
invoke1("shuchuneirong", function (err, result) {
      if (err) throw err;
      console.log(result);
});
```
- 运行(噩梦他说来就来啊👇)
```
npm run electron:serve
```
还是同样的错误！！！！我是真的蒙了，我刚刚不是解决了吗？我是解决个寂寞吗？，我已经出现自我怀疑了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cbbc7eb54ec4cf5887d479a70b1cd93~tplv-k3u1fbpfcp-zoom-1.image)

我又想起了官网的那种图是不是因为我的`nodejs`版本太高了🚞。因为官网写的是`electron13.x`对应的`nodejs14.16.0`🚔，于是我又开始降低`nodejs`的版本这块也有很多坑🛸，后面会专门写一篇使用`nvm`管理多版本`nodeJs`，果然上天这次没有眷顾我 我失败了,我下了三个版本的`node`都是同样的问题🤶。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5b04d81a3c24090b46e62dfff03cfc6~tplv-k3u1fbpfcp-zoom-1.image)

经过一天的浏览我看到文章开头的那篇[文章]()找到了办法，实际办法就在官网。
- 需要在`vue.config.js`中增加红框的代码

> 因为`electron-edge-js`模块中包含原生`C代码`，所以要在运行的时候再获取，而不是被`webpack`打包到`bundle`中（解决办法简单，找办法的过程好苦哦）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd959793b84a4559ad3cb6123076f8c8~tplv-k3u1fbpfcp-zoom-1.image)

- 重新运行,大功告成

## Electron带dll打包

运行时正常，打包之后异常，报如下错误

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb61f4a8b81f46288d6c245f6f288918~tplv-k3u1fbpfcp-zoom-1.image)
看描述应该是找不到我们的`Demo.dll`文件了，因为打包的时候👩‍🏫，没有将项目中的`dll`文件拷贝到最终生成的`dist_electron\win-unpacked` 文件夹中🛀。

- 解决方案


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a81eff4c4ca541a0b423a14b18f105a1~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4592e5acc4c84ffdbe810baab28c25de~tplv-k3u1fbpfcp-zoom-1.image)

## 总结

`Electron`调用dll的坑确实很多，相同的问题采用的是不同的解决办法，还是需要一点一点去摸索，反复切换nodeJs版本的时候也尝尽了苦头，下次再说吧。非常感谢参考链接下的作者👇，争做分享先锋，不做白嫖党。加油！🙋‍♂️

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f89dd4b334394cf8a1427e43649a22b3~tplv-k3u1fbpfcp-zoom-1.image)


##### 参考链接

- [VUE+Electron+Edge开发中遇到的坑](https://cxybb.com/article/kyq0417/111310539#5EdgeC__35)

- [如何在Electron中调用Dll](https://segmentfault.com/a/1190000019402908)

- [Electron9.x +vue+ffi-napi 调用Dll动态链接库](https://www.jianshu.com/p/dd9463dead8c)

