<template>
  <div class="head container">
    <nuxt-link to="/" class="head-logo float-left">
      <img src="~assets/img/logo.png" alt="niot logo" class="float-left">
      <div class="float-left">
        <p class="zh">国家物联网标识管理公共服务平台</p>
        <p class="en">China Internet of Things Names Service Platform</p>
      </div>
    </nuxt-link>
    <el-menu :default-active="activeIndex" active-text-color="#43ade1" class="float-left" mode="horizontal">
      <el-menu-item index="1"><nuxt-link to="/">首页</nuxt-link></el-menu-item>
      <el-menu-item index="2"><nuxt-link to="/info">平台资讯</nuxt-link></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '1'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .float-left {
    float: left;
  }
  .head {
    @include clearfix;
  }
  .head-logo {
    img {
      width: 85px;
      height: 40px;
      margin: 30px 12px 30px 0;
      vertical-align: middle;
    }
    p {
      margin: 0;
    }
    .zh {
      font-size: 20px;
      margin-top: 29px;
    }
    .en {
      font-size:13px;
      margin-top: 4px;
    }
  }
  a {
    text-decoration: none;
  }
</style>
<style lang="scss">
  .head .el-menu-item {
   font-size: 20px;
   font-weight: 400;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
   padding: 0;
   margin: 0 20px;
    border: none!important;
  }
  .head .el-menu {
    margin-top: 20px;
    float: right;
  }
</style>
