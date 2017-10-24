<template>
<div class="container">
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in banners">
        <img :src="banner">
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
  <div class="tab">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="平台介绍" name="first">
        <plateform></plateform>
      </el-tab-pane>
      <!--<el-tab-pane label="应用领域" name="second">
        <appli-area></appli-area>
      </el-tab-pane>
      <el-tab-pane label="产品功能" name="third">
        <div class="m-tab-box">
          <product></product>
        </div>
      </el-tab-pane>
      <el-tab-pane label="优秀案例" name="fourth">
        <div class="m-tab-box">
          <ex-case></ex-case>
        </div>
      </el-tab-pane>-->
    </el-tabs>
</div>
  </div>
</template>
<script>
  import plateform from 'components/index/platform.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: { plateform },
    computed: {
      ...mapGetters({
        banners: 'bannersImg'
      })},
    data () {
      return {
        swiperOption: {
          autoplay: false,
          initialSlide: 1,
          direction: 'horizontal',
          loop: true,
          pagination: '.swiper-pagination',
          paginationElement: 'li',
          onSlideChangeEnd: swiper => {
            // console.log('onSlideChangeEnd', swiper.realIndex)
          },
          onTap: swiper => {
            // console.log('onTap', swiper.realIndex)
          }
        },
        activeName: 'first'
      }
    },
    mounted () {
      // this.mySwiper.slideTo(1)
    },
    methods: {
      handleTabClick (tab) {
        if (tab.index === '0') {
          this.isFirstTab = true
        } else {
          this.isFirstTab = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    .swiper-slide {
      text-align: center;
      font-size: 38px;
      font-weight: 700;
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    .swiper-pagination {
      > .swiper-pagination-bullet {
        background-color: red;
      }
    }
  }
</style>
<style lang="scss">
  @import "~assets/scss/common";
  .tab {
    .el-tabs__header {
      padding-top: 36px;
      padding-bottom: 40px;
      border-bottom: none;
      background-color: $colorF8;
      margin-bottom: 0;
    }
    .el-tabs__nav-wrap {
      max-width: 928px;
      margin-left: auto;
      margin-right: auto;
    }
    .el-tabs__nav {
      width: 100%;
    }
    .el-tabs__item {
      width: 16%;
      height: 52px;
      line-height: 52px;
      padding-left: 0;
      padding-right: 0;
      text-align: center;
      font-size: 24px;
      color: $color3;
      letter-spacing: 2px;
      margin-left: 9%;
      // 2?
      &:nth-of-type(2) {
        margin-left: 4.5%;
      }
    }
    .el-tabs__item.is-active {
      color: $colorF;
      background-color: #595c5f;
    }
    .el-tabs__active-bar {
      display: none;
    }
  }
  .m-tab-box {
    margin-top: 40px;
  }
</style>
