---
title: 每周一推NPM包-第二弹
tags: [NPM, VUE]
categories: 技术
index_img: /img/blog_img/index23.png
banner_img: /img/blog_img/banner3.png
---

## 前言
**为了不让自己的空余时间都浪费掉，打算做一个每周一推的专栏，盘点一些好的插件，分享给大家，每次分享前会先发到自己的博客，可以在[博客](https://drinkwd.github.io/)中抢先看哦**🎈。
## [vue-seamless-scroll](https://chenxuan0000.github.io/vue-seamless-scroll/zh/guide/usage.html)

大家在做可视化大屏的时候应该遇到很多动画效果,这就少不了滚动的表格，如下。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b93d6aed8124460a8e319dab4e28f28~tplv-k3u1fbpfcp-zoom-1.image)

我们当然可以去改变`dom`的`scrollTop`去实现，但是有了这款插件之后包裹对应要滚动的`dom`就可以了，并且还提供了很多的`api`让的大屏的滚动更流畅更加丰富多彩🎈。
#### 不使用插件
```js
// 获取dom监听如果有滚动就每隔一秒改变滚动条的值
var el = document.getElementsByClassName('ant-table-body')[0]
            if (el.scrollHeight > el.clientHeight) {
              let position = 0
              this.timer = setInterval(() => this.scroller(position = position + 20), 1000)
            }
// 表格自动滚动
  scroller = (position) => {
    var box = document.getElementsByClassName('ant-table-body')[0]
    // 滚动到最底部回到原位置
    if (box.scrollTop === (box.scrollHeight - box.offsetHeight)) {
      box.scroll(0, 0)
      clearInterval(this.timer)
      position = 0
      this.timer = setInterval(() => this.scroller(position = position + 20), 1000)
    } else 
     // 表格滚动
      box.scroll(0, position);
  }
```
如果不使用插件的话仅仅实现滚动的难度不大但，是扩展性却不是很强，很难增加定制化的需求，于是就用到了`vue-seamless-scroll`插件👇

> [vue-seamless-scroll](https://www.npmjs.com/package/timeago.js) 目前支持上下左右无缝滚动，单步滚动，以及支持水平方向的手动切换功能,兼容多平台`IE9+、Firefox、Chrome、Safari、iOS、Android`。

#### 用法
- 安装
```
npm install vue-seamless-scroll --save
```
- 全局引用
```
import Vue from 'vue'
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

// 或者你可以自己设置全局注册的组件名 默认注册的组件名是 vue-seamless-scroll
Vue.use(scroll,{componentName: 'scroll-seamless'})
```
- 单文件引用
```
<script>
  import vueSeamlessScroll from 'vue-seamless-scroll'
   export default {
      components: {
        vueSeamlessScroll
      }
   }
</script>
```

#### 基本使用
- **html**
```html
<template>
  <vue-seamless-scroll :data="listData" class="warp">
    <ul class="item">
      <li v-for="(item, index) in listData" :key="index">
        <span class="title" v-text="item.title"></span>
        <span class="date" v-text="item.date"></span>
      </li>
    </ul>
  </vue-seamless-scroll>
</template>



```
- **js**
```js
<script>
  import vueSeamlessScroll from 'vue-seamless-scroll'

  export default {
    name: 'Example01Basic',
    components: {
      vueSeamlessScroll
    },
    data () {
      return {
        listData: [{
          'title': '无缝滚动第一行无缝滚动第一行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第二行无缝滚动第二行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第三行无缝滚动第三行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第四行无缝滚动第四行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第五行无缝滚动第五行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第六行无缝滚动第六行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第七行无缝滚动第七行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第八行无缝滚动第八行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第九行无缝滚动第九行',
          'date': '2017-12-16'
        }],
      }
    },
  }
</script>
```

- **style**
```css
<style lang="scss" scoped>
  .warp {
    height: 270px;
    width: 360px;
    margin: 0 auto;
    overflow: hidden;
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      li,
      a {
        display: block;
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
      }
    }
  }
</style>
```

如果想实现自定义配置可以查阅文档中对应的组件配置[组件配置](https://chenxuan0000.github.io/vue-seamless-scroll/zh/guide/properties.html#data)可实现，滚动方向，滚动速度，动态追加数据等等🎨。
#### 回调事件
- **html**
```html
<template>
  <vue-seamless-scroll :data="listData" @ScrollEnd="ScrollEnd" class="warp">
    <ul class="item">
      <li v-for="(item, index) in listData" :key="index">
        <span class="title" v-text="item.title"></span>
        <span class="date" v-text="item.date"></span>
      </li>
    </ul>
  </vue-seamless-scroll>
</template>
```
- **js**
```javascript
 ScrollEnd(){
      console.log("ScrollEnd")
    }
```


#### element-ui Table 实现滚动
如果直接使用该组件将`el-table`包裹起来会导致表头也会跟着滚动效果特别不好

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50eb1c60905a4aa2b5121803e5129ded~tplv-k3u1fbpfcp-zoom-1.image)

因此我们需要写两个表格通过样式进行实现，具体实现如下🍨

- html
```html
<template>
  <div class="scroll_table">
    <div style="display: inline-block; width: 100%">
      <el-table :data="tableList" class="table">
        <el-table-column
          v-for="(item,index) in columns"
          :key="index+'i'"
          :label="item.label"
          :prop="item.prop"
        />
      </el-table>
      <scroll-seamless
        :data="tableList"
        class="seamless-warp"
        style="width: 100%"
        :class-option="classOption"
      >
        <el-table :data="tableList" class="table_scroll">
          <el-table-column
            v-for="(item,index) in columns"
            :key="index+'i'"
            :label="item.label"
            :prop="item.prop"
          />
        </el-table>
      </scroll-seamless>
    </div>
  </div>
</template>
```
- js
```javascript
<script>
export default {
  name: "ScrollTable",
  data () {
    return {
      columns: [
        { prop: 'name', label: '姓名', minWidth: '100', sort: true },
        { prop: 'date', label: '日期', minWidth: '180', sort: true },
        { prop: 'age', label: '年龄', minWidth: '180', sort: true },
        { prop: 'status', label: '状态', minWidth: '180', sort: true },
        { prop: 'address', label: '地址', minWidth: '220', sort: true }
      ],
      tableList: [
        {
          id: '1',
          date: '2019-09-25',
          name: '张三',
          status: '待处理',
          age: 18,
          address: '广东省广州市天河区'
        },
        {
          id: '2',
          date: '2019-09-26',
          name: '李四',
          age: 19,
          status: '已处理',
          address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
        },
        {
          id: '3',
          date: '2019-09-27',
          name: '王五',
          age: 20,
          status: '已完成',
          address: '广东省广州市天河区3'
        },
        {
          id: '3',
          date: '2019-09-27',
          name: '赵六',
          age: 20,
          status: '已完成',
          address: '广东省广州市天河区3'
        },{
          id: '1',
          date: '2019-09-25',
          name: '张三',
          status: '待处理',
          age: 18,
          address: '广东省广州市天河区'
        },
        {
          id: '2',
          date: '2019-09-26',
          name: '李四',
          age: 19,
          status: '已处理',
          address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
        },
        {
          id: '3',
          date: '2019-09-27',
          name: '王五',
          age: 20,
          status: '已完成',
          address: '广东省广州市天河区3'
        }
      ]
    }
  },
  computed: {
    classOption () {
      return {
        step: 0.8, // 数值越大速度滚动越快
    }
  }
}
</script>
```
- style
```css
<style lang="less" scoped>
// 非常重要
.scroll_table {
  margin: 15px;
  display: flex;
  ::v-deep .table .el-table__body-wrapper {
    display: none;
  }
  // 重点注意这段样式
  .seamless-warp {
    height: 200px;
    overflow: hidden;
    ::v-deep .table_scroll .el-table__header-wrapper {
      display: none;
    }
  }
}
</style>
```
效果如下👇
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2add6de8ecbe4a5ea76db6cd5bcf4bca~tplv-k3u1fbpfcp-zoom-1.image)


#### 注意事项
> - 最外层容器需要手动设置`width`、`height`、`overflow:hidden`
> - step值不建议太小,不然会有卡顿效果(如果设置了单步滚动,step需是单步大小的约数,否则无法保证单步滚动结束的位置是否准确,比如单步设置的30,step不能为4)

## 往期NPM包

##### [timeago.js](https://juejin.cn/post/7194637751516414011)

## 总结

`vue-seamless-scroll`我们在做可视化大屏的时候会经常用到，使用方法也比较简单，希望对大家有所帮助🎈。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3800fb414b3748098800461269d9925c~tplv-k3u1fbpfcp-zoom-1.image)






