---
title: 你不知道的Git🍜
date: 2021-02-22 14:58:57
tags: [Git]
categories: 技术
index_img: /img/blog_img/index4.png
banner_img: /img/blog_img/banner4.jpg
---
# 天下古今之庸人，皆以一惰字致败🍳

## 前言
相信大家已经特别熟练了`git`的使用，已经足够满足日常开发了。如果还有人不会使用git的去看廖雪峰大神的[`git`教程](https://www.liaoxuefeng.com/wiki/896043488029600)（零基础教学）满足日常开发的同时，我们可能也会遇到奇奇怪怪的问题😣，我就把我遇到的问题，以及使用Git的小技巧分享一下🧵。


### git pull 提示错误,Your local changes to the following files would be overwritten by merge
场景再现： 老李👔和老张🧥同时开发一个项目，他们两个开发的工作有交叉，老李写代码非常快，没下班就火急火燎的写完了，老张比较慢快到下班的时候才把代码写完😒。这时当他想更新代码,老李说我更新代码了你先pull一下，于是就产生了上面的问题！！！

产生原因：多人操作场景，其中一人将代码提交到远程`git`,另一个人也修改了文件准备`pull`的时候会产生该问题；

解决方案一: 保留本地新修改的代码。暂存本地新修改代码，并把`git`服务器上的代码`pull`到本地，释放暂存 之后按照 `add` `commit` `push` 进行代码更新。
``` Bash
 git stash
 git pull origin master
 git stash pop
```

解决方案二: 覆盖本地新修改的代码，只保留服务端的代码。直接退回到上一个版本然后把`git`服务器上的代码`pull`到本地
``` Bash
git reset --hard
git pull origin master
```

### .gitignore 无效的解决方法
场景再现: `.gitignore`第一次没有写全。比如老李新建了一个项目跟往常一样正常的提交，随着项目体积的不断增加，老李发现有一个文件的目录上传的`git`根本是没有必要的，还特别大。于是老李就在`.gitignore`中加入了响应的目录规则，但是并没有生效！！！

产生原因：`.gitignore`只能忽略那些原来没有被`track`的文件，如果某些文件已经被纳入了版本管理中，则修改`.gitignore`是无效的

解决办法：先把本地缓存删除，然后再提交。

``` Bash
git rm -r --cached .
git add .
git commit -m 'niubi'
```
### git push -u origin master(-u参数的意义)

- 不带任何参数的`git push`，默认只推送当前分支

- `git push -u origin master` 上面命令将本地的`master`分支推送到`origin`主机，同时指定`origin`为默认主机，后面就可以不加任何参数使用`git push`了。

- `git push` 如果当前分支与多个主机存在追踪关系，那么这个时候也可以使用-u选项会指定一个默认主机，如果不加参数就会推送到默认主机(场景：同一个项目记关联了`github`也关联了`gitee`)。

### 一个项目关联多个远程Git仓库
- 方法一: 使用 `git remote add` 命令
``` Bash
git remote add github https://github.com/xxx/xxx.git #关联github
git remote add gitee https://gitee.com/xxx/xxx.git # 关联gitee
```
缺点: 每次`push`的时候都要`push`两次才能推送到响应的远程。
``` Bash
git push github master
git push gitee master
```

- 方法二：使用 git remote set-url 命令

前提是你已经有了一个远程库了，再次添加另一个远程库。
```
git remote set-url --add github https://git.oschina.net/zxbetter/test.git
```
这样只要执行`git push github master`一次就可以推送到两个远程库了。

### git push到远程指定分支
- 解决方案一 

先创建远程分支
``` Bash
 git push <远程主机名> <本地分支名>:<远程分支名>
```
- 解决方案二

先创建本地分支并切换到该分支,`push`的时候可以直接指定远程分支名，远程分支会自动创建。
``` Bash
 git checkout -b [本地分支名]
 git add .
 git commit -m 
 git push origin [远程分支名]
```

### git 给分支添加描述

场景再现：老张👨‍💻在开发项目的过程中经常有不同的需求，没有办法他只能建立不同的分支来维护自己的项目。稳定运行一个月之后，突然有一个地势的项目要改需求，他已经忘记了当时建立的分支是干什么的了如下图。当时暴怒，提出离职😲。


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9edbd786e8b94cd6b5615b2ffdc0a97b~tplv-k3u1fbpfcp-zoom-1.image)

- 解决办法一

 使用命令给分支添加描述
 ``` Bash
 git config branch.[branch_name].description "分支描述信息" # 设置分支描述
 git config branch.{branch_name}.description # 获取分支描述
 ```
这样的`缺点`太明显了每次只能获取一个分支的描述，命令还特别长。

- 解决办法二

使用`npm`包`git-br`
``` Bash
$ npm install -g git-br # 全局安装git-br 
$ git config branch.[branch_name].description "分支描述信息" # 设置分支描述
$ git br # 获取分支描述
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a090e9f6619d4af0803d1ba02ceb3568~tplv-k3u1fbpfcp-zoom-1.image)

### Git操作失败并提示Another git process seems to be running 

原因：`Git`在使用过程中遭遇了奔溃，部分被上锁资源没有被释放导致的

解决方案： 进入项目文件夹下的 `.git`文件中（显示隐藏文件夹或`rm .git/index.lock`）删除`index.lock`文件即可。

### 创建干净的本地分支并关联远程分支。

一般在一个分支下创建新的分支时，会把上个分支的内容复制到新分支中，如果我们不想要上个分支的内容，创建干净的分支，改怎么办呢？

解决方案
``` Bash
git checkout -b 本地分支名  origin/远程分支名
```
### Git提交带表情🎈
这种提交我们在github上很常见，他们是怎么把表情加上去的呢


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91849288ed57487aa4f41bcf2b14c281~tplv-k3u1fbpfcp-zoom-1.image)

全局安装 `gitmoji-cli`

``` Bash
npm i -g gitmoji-cli
```
安装完之后只需要在每次提交的时候加上相应的表情编码就可以了，不同的表情代表着不同的类别，使得代码提交更加清晰。[gitmoji](https://gitmoji.dev/)
举个栗子🧨

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b755af5e2f3046f285c5fb7a64b2ca2d~tplv-k3u1fbpfcp-zoom-1.image)




![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0938309f5b1d49b89b46aba0d793380a~tplv-k3u1fbpfcp-zoom-1.image)

发现我的提交前面已经有小表情了是不是非常明显👀。

### Git提交规范

废话少说先上图🤔


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ea4df9ee5154effa9948a4477e4d1a8~tplv-k3u1fbpfcp-zoom-1.image)

你是不是也一脸懵逼，这是在提交什么。一般来说`commit`应该一眼就能知道提交的是什么。也为了和一起开发的同事清楚的知道，你这次提交的内容🙄。网上大部分说的规范就是[`Angular `规范](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)英文好的同学可以去看看，也可以直接参考[阮一峰大佬的博客](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)了解了大概规范之后我们就找响应的工具帮我们弄成规范的样子就好啦😁。

`Commitizen`（合格`Commit message` 的工具）

全局安装
``` Bash
 npm install -g commitizen
```
然后，在项目目录里，运行下面的命令，使其支持 Angular 的 Commit message 格式。
``` Bash
commitizen init cz-conventional-changelog --save --save-exact
```
> 注意：因为commitizen工具是基于Node.js的,所以要保证你的项目下要有package.

之后再提交代码的时候使用`git cz` 代替`git commit`命令就会出现提交类型的选择，使你提交的代码更规范。🤗


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14de749bc4c0436c9d77c78c96d5e739~tplv-k3u1fbpfcp-zoom-1.image)

`cz-customizable` 自定义中文配置

你的选择类别可能是英文，转换成中文也特别简单
在项目中运行如下命令
``` Bash
npm install cz-customizable --save-dev

commitizen init cz-customizable --save-dev --save-exact --force

``` 
修改`package.json `中 `config.commitizen `字段为
``` Bash
"config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  }

```
在项目根目录创建一个 [.cz-config.js](https://github.com/qiqihaobenben/commitizen-git/blob/master/.cz-config.js) 的文件这个文件的内容我们参照大佬写好的就行了
关闭命令窗口再次打开输入git cz就会发现已经全部变成中文啦 大功告成🎨。

## 总结
这就是我在开发中遇到过的一些常见问题，以后如果有新的问题，还会持续更新哒，如果我的文章对你有用，记得三连一下哦🍬

## 参考文章

[让你的 commit 更有价值](https://segmentfault.com/a/1190000023388007)

[分支添加描述](https://www.cnblogs.com/wangziye/p/11904511.html)

[添加多个远程库](https://segmentfault.com/a/1190000011294144)





