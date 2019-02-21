<template lang="html">
  <div class="">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>欢迎进入 Index 界面</h1>
  </div>
</template>

<script>
export default {
  created(){
    this.$wxShare.updateWxShareConfig({
      title: "更新分享配置title",
      desc: "更新分享配置desc",
      link: location.href.split("#")[0],
      imgUrl: 'https://res.wx.qq.com/a/wx_fed/weixin_portal/res/static/img/dNEBuK6.png',
    })
  }
}
</script>

<style lang="css">
</style>
