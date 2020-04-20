## 关于
**介绍**
基于 Vue-Cli3 + iView3 的后台管理系统

**技术栈**
Vue、Axios、Webpack、ES6、Vue Router、Vuex、Sass等

## 截图
**登录界面**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200410090509163.png)
**主页面**![在这里插入图片描述](https://img-blog.csdnimg.cn/20200410090527733.png)
## 常用命令
```
# 下载代码
$ git clone https://github.com/dingFY/vue-iview3-admin.git

# 安装依赖
$ npm install

# 开发调试
$ npm run dev

# 代码校验
$ npm run lint

# 构建
$ npm run build
```
## 规范
**项目结构**
```
|-- public                           // 网站公共目录
|-- src                              // 源码目录
|   |-- api                          // 接口管理目录
|   |-- assets                       // 公共资源目录
|   |-- components                   // 公共组件目录
|   |-- router                       // 路由配置目录
|   |-- store                        // 状态管理目录
|   |-- utils                        // JS 工具目录
|   |-- views                        // 视图文件
|   |-- app.vue                      // 页面入口
|   |-- main.js                      // 程序入口
```
**布局**
布局在 mainPage文件夹中，然后在 App.vue 中引入，放在了路由的最外层，充当整个项目的公共布局，如：页眉、页脚、侧边栏等。

**样式**
样式统一在 assets文件夹里维护
```
|- common.scss  里面放公共的、全局的、使用频率比较高的样式，这样可以方便组织样式。如：.hide{display: none;}
|- mixin.scss   里面放全局的样式方法，已经在webpack中全局引入，使用的时候 @include ct();
|- reset.scss   里面放页面样式重置的css，不需要修改
|- var.scss     里面放公共变量，方便全局样式，如：颜色、字体大小等
```
**公共组件**
公共组件统一放到components文件夹，一个组件对于一个文件夹

**接口请求**
请求统一在 api 文件夹下管理，新建一个axios.js和一个getData.js文件，axios.js文件用来封装我们的axios，getData.js用来统一管理我们的接口。
