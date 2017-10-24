<template>
  <div class="info">
    <div class="banner">
    </div>
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="tabChange">
        <el-tab-pane label="平台资讯" name="p"></el-tab-pane>
        <el-tab-pane label="国家政策" name="g"></el-tab-pane>
      </el-tabs>
      <div class="content" v-scroll-show-callback="handleTrendScroll" scroll-placeholder="30" v-show="activeName === 'p'">
        <news-list :data="newsList"></news-list>
      </div>
      <div class="content" v-scroll-show-callback="handleTrendScroll" scroll-placeholder="30" v-show="activeName === 'g'">
        <news-list :data="policyList"></news-list>
      </div>
  </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import ScrollShowCallBack from 'directives/scrollShowCallBack'
  import { mapState } from 'vuex'
  import _ from 'lodash'
  import newsList from 'components/info/news-list'
  export default {
    name: 'info',
    directives: {'scroll-show-callback': ScrollShowCallBack},
    components: {'news-list': newsList },
    computed: {
      ...mapState({
      newsList(state){ return this.listComplete(state.news.newsList)},// 这一个需要使用method所以改用普通函数
      scrollDisable: state => state.scrollDisable,
      policyList(state){ return this.listComplete(state.policy.policyList)}
    })},
    data () {
      return {
        activeName: 'p',
        rname: 'infodetail',
      }
    },
    methods: {
      tabChange () {
        // this.getTrend()
      },
    handleTrendScroll () { // 滚动到底部的无限加载
        if(this.scrollDisable){ // 判断是否上个请求未完成
          return false
        }
        let page, total, size, gmtype
        if(this.activeName === 'p') {
          page = ++this.$store.state.news.newsParams.page
          total = this.$store.state.news.newsParams.total
          size = this.$store.state.news.newsParams.size
          gmtype = 26
        } else {
          page = ++this.$store.state.policy.policyParams.page
          total = this.$store.state.policy.policyParams.total
          size = this.$store.state.policy.policyParams.size
          gmtype = 113
        }
        if(page >= Math.ceil(total / size)){
          return false // 判断是否已经请求全部
        }
        let params = {
          gmtype,
          page,
          size
        }
      this.$store.dispatch('getNews', params) // dispatch填充store
      },
      listComplete (arr) { // 对数据进行处理，如果最后一个行不满3个元素那么添加null
        if(arr.length === 0){ // 有可能进来为空返回空数组
          return []
        }
        arr = _.chunk(arr, 3)
        let len = arr[arr.length-1].length
        switch (len) {
          case 1:
            arr[arr.length-1].push(null, null)
            break;
          case 2:
            arr[arr.length-1].push(null)
            break;
        }
        return arr
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~assets/scss/mixins.scss";
  @import "~base";
  .banner {
    width: 100%;
    height: 399px;
    background: url("~assets/img/banner.jpg") no-repeat;
    background-size: cover;
  }
</style>
<style lang="scss">
  .info .el-tabs__item {
    font-size: 18px;
  }
</style>
