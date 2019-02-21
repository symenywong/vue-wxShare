/* eslint-disable */
import axios from 'axios';
import wx from 'weixin-js-sdk';
const jsSDKAuth='';
const state = {
  wx_error:'',
  shareSign:{
    appid:"",
    jsapi_ticket:"",
    nonceStr:"",
    signature:"",
    timestamp:'',
    url:"",
    jsApiList:['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'closeWindow'],
    hideMenuList:['menuItem:editTag', 'menuItem:delete', 'menuItem:originPage', 'menuItem:readMode', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:email', 'menuItem:share:brand']
  },
  defaultWxShareConfig:{
    title: "默认分享配置title",
    desc: "默认分享配置desc",
    link: location.href.split("#")[0],
    imgUrl: 'https://res.wx.qq.com/a/wx_fed/weixin_portal/res/static/img/dNEBuK6.png'
  },
  wxShareConfig: {
    title: "自定义分享配置title",
    desc: "自定义分享配置desc",
    link: location.href.split("#")[0],
    imgUrl: 'https://res.wx.qq.com/a/wx_fed/weixin_portal/res/static/img/dNEBuK6.png'
  }
}
const getters={
    wxShareConfig:state=>state.wxShareConfig,
    wx_error:state=>state.wx_error
};
const actions = {
  updateWxShareConfig({commit}, data) {
    commit('updateWxShareConfig', data);
  },
  updateWxShareSign({commit}, data) {

  },
  initWxShare({commit}, data) {
    configWXJSSDK();
  },
  /**
   * [wxShareAuth 初始化微信分享授权]
   * @param  {[type]} commit [description]
   * @param  {[type]} data   [description]
   * @return {[type]}        [description]
   */
  wxShareAuth({commit},sign_url){
    if(!sign_url){
      console.error("缺少授权页面url");
      return;
    }
    let params = {
      url: sign_url
    }
    return axios.post(jsSDKAuth, params).then(res => {
      console.info('授权结果',res);
      if(res.data.code==200){
        //更新分享授权签名参数
        let {appid,jsapi_ticket,noncestr,signature,timestamp,url}=res.data.data;
        state.shareSign.appid=appid;
        state.shareSign.jsapi_ticket=jsapi_ticket;
        state.shareSign.nonceStr=noncestr;
        state.shareSign.signature=signature;
        state.shareSign.timestamp=timestamp;
        state.shareSign.url=url;
      }
      return res.data;
    }).catch((err) =>{
      console.log(err.response)
    })
  }
}

const mutations = {
  updateWxShareConfig(state, payload) {
    let {title,desc,link,imgUrl} =payload;
    state.wxShareConfig.title=title;
    state.wxShareConfig.desc=desc;
    state.wxShareConfig.link=link;
    state.wxShareConfig.imgUrl = imgUrl || "https://res.wx.qq.com/a/wx_fed/weixin_portal/res/static/img/dNEBuK6.png";
    //重新初始化
    configWXJSSDK();
  },
}

function configWXJSSDK(){
  let shareSign=state.shareSign;
  wx.config({
    debug: false,
    appId: shareSign.appid,
    timestamp: shareSign.timestamp,
    nonceStr: shareSign.nonceStr,
    signature: shareSign.signature,
    jsApiList: shareSign.jsApiList
  })

  wx.ready(function() {
    let wxShareConfig=state.wxShareConfig;
    let {title,desc,link,imgUrl,hideMenuList}=wxShareConfig;
    wx.onMenuShareAppMessage({
      title,
      desc,
      link,
      imgUrl,
      success: function() {
        alert("分享成功");
      },
      fail:function(){
        alert("分享失败");
      },
      cancel: function() {
        alert("取消分享");
      }
    })
    wx.onMenuShareTimeline({
      title,
      link,
      imgUrl,
      success: function() {
        alert("分享成功");
      },
      cancel: function() {
        alert("取消分享");
      }
    })
    wx.hideMenuItems({
      menuList: hideMenuList
    })
  }),
  wx.error(function(res){
      state.wx_error=res;
      alert("分享失败: error");
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  });
}


export default {
    actions,
    getters,
    state,
    mutations
}
