import Vue from 'vue'
import App from './App.vue';
import store from './store';//引入 vuex store
import VueRouter from 'vue-router';//引入 vue-router
import router from './router';//引入 routes
Vue.config.productionTip = false;
Vue.use(VueRouter);
import wxShare from './utils/wxShare';

/*************** 步骤一 引入 微信 jssdk ************/
let appInit=0;
import wx from 'weixin-js-sdk';
Vue.use(wx);
wxShare.config.jsSDKAuth='/api/mobile/WeiXin/ecstoreSendJsSdk';
Vue.prototype.$wxShare=wxShare;
/*************** 第二步 初始化微信分享 ************/
if (location.host != "localhost:8080") {
  let sign_url = location.href.split("#")[0];
  appInit++;
  if (wx) {
    //初始化微信分享
    wxShare.initWxShare(sign_url);
  }
}
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

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
