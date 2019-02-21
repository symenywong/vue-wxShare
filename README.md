## wxShare 说明文档
#### 单页面路由工程使用微信分享及二次分享解决方案


>很多人在单页面工程中使用weixin jsSDK时 ,第一次调用正常, 路由切换时发现调用分享配置报错, 此时忽略了一点 ,在单页面路由的 url 发生变化时, 需要重现调用微信jsSDK分享配置;

`wxShare除适用于 Vue 单页工程外, 也可以使用与其他单页工程例如 React,本示例主要展示如何在 Vue中使用`;


微信 jssdk调用基本原理
```
1. (初始化页面,划重点)掉用 api 获取当前页面 url 授权的签名
2. 配置微信分享 jssdk
3. 路由切换时, 重新执行步骤2
```


#### 1. 快速使用, 只需三步
在工程入口文件引入 wxShare 文件
```
/*************** 步骤一 引入 微信 jssdk ************/
let appInit=0;
import wx from 'weixin-js-sdk';
//配置授权api
wxShare.config.jsSDKAuth='/api/mobile/WeiXin/ecstoreSendJsSdk';
```

```
/*************** 第二步 初始化微信分享 ************/
if (location.host != "localhost:8080") {
  let sign_url = location.href.split("#")[0];
  appInit++;
  if (wx) {
    wxShare.initWxShare(sign_url);
  }
}
```

```
/*************** 第三步 监听路由重置微信分享为默认 ************/
router.afterEach(route => {
  let url=location.href.split("#")[0];
  if (!store) return;
  if(appInit>1){
    wxShare.resetWxShareConfig();
  }
  appInit++;
})
/*************** end 分割线 ************/
```

#### 2. wxShare提供的方法
2.1 initWxShare()
```
初始化微信分享, 此时会调用内部方法 wxShareAuth, 请求 api 授权当前页面 url;
```
2.2 updateWxShareConfig()
```
更新微信分享配置内容, 例如, 在某个事件上主动调用此方法, 来更改微信分享配置的标题, 简述,链接或者封面图
```
2.3 resetWxShareConfig()
```
通常情况下, 在路由发生变化时, 希望已被更改过的分享配置, 重新重置为默认分享配置
```
2.4 configWXJSSDK();
```
调用微信jsSDK 完成分享配置
```

#### 3. wxShare.config属性配置

|配置名称|属性值|默认值|
|-|-|-|
|jsSDKAuth|String|''|
|shareSign|Object|下文shareSign|
|defaultWxShareConfig|Object|下文defaultWxShareConfig|
|wxShareConfig|Object|下文wxShareConfig|



##### 3.1 shareSign提供的配置

```
{
  appid:"",
  jsapi_ticket:"",
  nonceStr:"",
  signature:"",
  timestamp:'',
  url:"",
}
```
##### 3.2 defaultWxShareConfig

```
{
  title: "默认分享配置title",
  desc: "默认分享配置desc",
  link: location.href.split("#")[0],
  imgUrl: 'https://res.wx.qq.com/a/wx_fed/weixin_portal/res/static/img/dNEBuK6.png',
  jsApiList:['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'closeWindow'],
  hideMenuList:['menuItem:editTag', 'menuItem:delete', 'menuItem:originPage', 'menuItem:readMode', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:email', 'menuItem:share:brand']
}
```

##### 3.3 wxShareConfig

```
wxShareConfig:{}
```
-------
#### 其他
 /wxShare.js 为插件源码文件, 可根据自己需求自行更改
demo 工程只需 clone 本工程,
```
npm install
npm run serve
```
--------

npm依赖插件

 + weixin-js-sdk
 + axios
