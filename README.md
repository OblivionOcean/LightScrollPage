<h1 align="center">LightScrollPage</h1>
<p align="center">LightScrollPage(简称 “LSP”)，一个基于原生JS的微型滚动动画库，不需要依赖，只需要一个JS文件，源代码小于1KB</p>

# 如何使用
## 引入
### CDN
你可以使用支持Github回源的CDN

jsDelivr:
```html
<script src="https://cdn.jsdelivr.com/gh/OblivionOcean/LightScrollPage@main/index.js"></script>
```
### 自行部署
[点击下载文件](https://github.com/OblivionOcean/LightScrollPage/raw/main/index.min.js)

引入:
```html
<script src="文件路径"></script>
```
## 使用
LSP配置了JSDoc，你可以方便的用VSCode、IDEA等代码编辑器查看其使用方法

<font color="#f00">注：</font>**每个页面的长度 = scroll-page总长度 / 页面数量**，需要手动设置scroll-page总长度，一般使用vh单位

**文档中*长度*是显示此页面的范围，*高度*是页面div的高度，一般为100vh**


### 自动操作
```html
<div class="scroll-page">
  <!-- 使用scroll-page作为Class名称！-->
  <!-- 页面必须有page的Class -->
  <div class="page"><!-- 页面1 --></div>
  <div class="page"><!-- 页面2 --></div>
</div>
```

这种状态不能使用`lsp.addEventListener`监听，如需监听请[手动操作](#手动操作)

### 手动操作
```html
<div class="scrollPage">
  <!-- 不能使用scroll-page作为Class名称！-->
  <!-- 页面必须有page的Class -->
  <div class="page"><!-- 页面1 --></div>
  <div class="page"><!-- 页面2 --></div>
</div>
```

```js
const lsp = new ScrollPage(".scrollPage");// 初始化lsp对象, 需要传入目标的CSS选择器或者element对象
lsp.addEventListener((event) => {// 创建监听事件
    // event对象
    // 在滚动动画范围内
    /*
      pageNum: 当前页码
      pageHeight: 当前页长度
      pageToTop: 当前页距离顶端（相对于页面长度）
      scrollPage: 当前页距离顶端（相对于整个动画盒子的长度）
      element: 动画盒子的元素对象
      page: 当前页的元素对象
    */
    // 超出范围时
    /*
      without: up/down 分别为从上端超出和从下端超出
    */
})
```

## 效果
[完整效果](https://www.oblivionocean.top/)
