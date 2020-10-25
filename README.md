IEManageSystem
=============
## CMS 介绍
**可视化页面编辑**
> 1. IEManageSystem 是一个CMS管理系统，完成前后端分离，通过`通过组件堆积生成页面`，你可以更改任何你想更改的地方<br>
> 2. IEManageSystem 目前有 Web端 和 安卓App端（是的App，不是浏览器），为了方便用户编辑，IEManageSystem 允许在浏览器对 App 进行编辑<br>
> 3. 由于个人开发的原因，目前提供的组件并不多，后续会提供更多组件<br>
> 4. 目前项目还属于开发阶段，bug 什么的一定会有的<br>


**相对于其他 CMS 的优点**
> 1. 具有 Web端 和 安卓App端，后面会集成 苹果App端<br>
> 2. 页面编辑灵活，想编辑哪里就编辑哪里，后面考虑增加拖拽功能<br>
> 3. 组件具有灵活的配置和数据，包括图表等需要复杂配置和数据，IEManageSystem 都可以完成，添加图表展示只不过是点击页面而已<br>
> 4. IEManageSystem 允许每个组件都有自己的可执行逻辑，可执行逻辑会在服务器进行动态编译，完成一个业务逻辑不是问题<br>
> 5. 对于组件开发者而言，你不需要学习任何新的语法，你只需要了解IE组件的设计和React即可编辑出灵活的组件<br>
> 6. IEManageSystem 的目的不是只完成内容管理，IEManageSystem 组件之间可进行交互，而你要完成的业务逻则取决于你的交互容器组件的编写<br>
<br>

**源码与功能**
> 分支 dev1.0_c 为个人开发分支，最新代码会先提交到该分支<br>
> 以集成个人中心，授权管理，CMS管理 等功能<br>
> 前端源码目录：\src\IEManageSystem.Web\ClientApp<br>

<br>

**开发文档**
> 开发文档位于 Docs 目录下，但文档已过期，后续有时间我再更新 <br>
> 关于前端框架的介绍，请留意 https://blog.csdn.net/dabusidede/category_10348509.html <br>
> 关于前端的三端框架: https://github.com/IceEmblem/IceE <br>
<br>

## 运行 CMS
1. 下载 asp.net core 3.0 Runtime Hosting Bundle，并安装：https://dotnet.microsoft.com/download/dotnet-core/thank-you/runtime-aspnetcore-3.0.0-windows-hosting-bundle-installer  <br>
2. 下载最后发布版本：https://github.com/IceEmblem/IEManageSystem/releases  <br>
3. 解压下载的发布版本并运行 IEManageSystem.Web.exe （直接运行会使用 5000 端口，如果想指定端口，则在cmd下运行命令 dotnet IEManageSystem.Web.dll http://*:8080）  <br>
 <br>


## CMS 演示地址
> 没钱买服务器，有点慢<br>
> http://www.iceemblem.cn/<br>
> 账号：admini  注（是 admini，不是 admin）<br>
> 密码：123456<br>
<br>

## CMS截图如下
![image](img/show1.png)<br>
![image](img/show2.png)<br>
<br>

## 技术使用
> 冰纹后台管理系统 领域驱动设计实践，前后端分离，JwtBearer认证<br>
前端：<br>
> ReactJs，ReactRedux，ReactRouter，ReactNative，TypeScript，Css3，BootStrap4，ES6，ant，native-base<br>
后端：<br>
> asp.net core，abp框架，ORM框架Ef<br>
<br>

## 开发者运行项目
如果你想对该项目进行二次开发，你可以按照如下步骤进行<br>

**运行后端**
<br>
1. vs 运行后端：
> vs2019 打开项目<br>
> 直接启动项目即可，不推荐从 IIS Express 启动<br>

2. 不使用 vs 运行后端
> 如果你不会后端开发，那你不必从 Vs 运行，你只需要按照上面的"运行CMS"步骤即可将后端运行起来<br>
<br>

**运行前端**
> 进入前端目录 \src\IEManageSystem.Web\ClientApp<br>
> cmd 下执行 yarn install 命令等待包安卓完成（是 yarn，不是 npm）<br>
> cmd 下执行 yarn run start:server 基于服务器启动（即服务器必须要先运行）<br>
<br>

**初始化站点**
如果第一次运行需要初始化站点 <br>
> 访问 /Init 页面，根据指示完成站点初始化 <br>
<br>

**运行安卓App**
前提：需要安卓安卓运行环境，如果不熟悉，请查阅 https://blog.csdn.net/dabusidede/article/details/107955721 <br>
> 在运行前需要先更改 android\app\src\main\assets 下的 config.json 中的 baseUrl 中的 ip 为你的 ip地址（本来想使用 10.0.2.2 地址，但怎么试都不成功）<br>
> cmd 下运行 yarn run android 命令<br>
<br>

## 加入项目：
项目目前由我一人开发，好累呀 >_<|| <br>
> 如果想加入的话，都可以联系我邮箱：<br>
> 1373611035@qq.com<br>
<br>