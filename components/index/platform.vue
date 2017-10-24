<template>
  <div class="platform">
    <div class="introduct-wrapper">
      <div class="introduct clearfix">
        <div>
          <div class="video pull-left">
            <div class="video-modal" v-show="isVideoShow">
              <div class="modal-content">
                <div class="modal-body">
                  <video
                    width="960"
                    height="540"
                    style="background: #000;"
                    controls="controls"
                    loop="loop"
                    :src="video.src"
                    :poster="video.poster"
                    webkit-playsinline="">
                  </video>
                </div>
                <div class="modal-close" @click="handleCloseVideo"></div>
              </div>
            </div>
            <img :src="video.videoImg" alt="平台简介视频" class="video-img">
            <i class="icon icon-play" @click="handleClickVideo"></i>
          </div>
          <div class="info">
            <h3>平台简介</h3>
            <p>
              国家物联网标识管理公共服务平台是由国家发改委正式批复的物联网技术研发及产业化专项项目【发改办高技[2013]2664号】，由中国科学院计算机网络信息中心牵头，联合多家单位共同建立的全国唯一的物联网标识统一管理和公共服务平台</p>
            <h3>项目愿景</h3>
            <p>致力于万亿级物联网标识的价值创新，为物联网应用、大数据、云计算和人工智能等企业（单位）提供物联网标识的注册、查询、存储服务</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'platform',
    data () {
      return {
        isVideoShow: false,
        isMVideoShow: false,
        video: {
          src: '',
          poster: require('../../assets/img/poster.png'),
          videoImg: require('../../assets/img/video.jpg')
        }
      }
    },
    computed: {
      isMobil () {
        return this.$store.state.isMobil
      }
    },
    methods: {
      handleClickVideo () {
        this.isVideoShow = true
        this.video.src = 'http://oq2qbi2bz.bkt.clouddn.com/iot.cniotroot.cnniot1280-720.mp4'
      },
      handleCloseVideo () {
        this.isVideoShow = false
        this.video.src = ''
      },
      handleMClickVideo () {
        this.isMVideoShow = true
        document.getElementById('mVideo').play()
      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/common.scss";

  .platform {
    .introduct-wrapper {
      @extend %contentMaxWidth;
    }
    .video-img {
      max-width: 100%;
    }
    .video {
      position: relative;
      margin-top: 100px;
      text-align: center;
    }
    .pull-left {
      float: left;
    }
    .video-modal {
      .modal-content {
        position: fixed;
        z-index: 9999;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .4);
      }
      .modal-body {
        position: absolute;
        z-index: 99999;
        top: 50%;
        left: 50%;
        margin-left: -480px;
        margin-top: -270px;
        width: 960px;
        height: 540px;
      }
      .modal-close {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -270px;
        margin-left: 500px;
        width: 36px;
        height: 36px;
        background: url('../../assets/img/icon-whiteclose.png') no-repeat center;
        background-size: contain;
        cursor: pointer;
      }
    }
    icon {
      display: inline-block;
      vertical-align: middle;
    }
    .icon-play {
      position: absolute;
      top: 125px;
      left: 50%;
      margin-left: -33px;
      width: 67px;
      height: 67px;
      background: url('../../assets/img/icon-play.png') no-repeat center;
      cursor: pointer;
    }
    .info {
      margin-left: 632px;
      padding: 90px 0 84px;
      h3 {
        font-size: 24px;
        font-weight: normal;
      }
      p {
        line-height: 26px;
        margin-top: 22px;
        margin-bottom: 38px;
        font-size: 18px;
        color: $color6;
      }
    }
    .nums-wrapper {
      background-color: #f1f1ee;
    }
    .nums {
      @extend %contentMaxWidth;
    }
    .nums-item {
      text-align: center;
      h3 {
        margin-top: 24px;
        margin-bottom: 12px;
        font-size: 36px;
        font-weight: normal;
      }
      p {
        @include sc(18px, $color6);
        margin-bottom: 28px;
      }
    }
    .nums-item0 {
      float: left;
    }
    .nums-item1 {
      position: relative;
    }
    .nums-item2 {
      float: right;
    }
  }

  .mobil {
    .introduct-wrapper, .nums {
      max-width: none;
    }
    .platform {
      .mvideo {
        position: relative;
        padding: 96rem / $rem $mCtPadding 56rem / $rem;
      }
      .nums-wrapper {
        padding-left: 60rem / $rem;
        padding-right: 60rem / $rem;
        background-color: $colorF5;
      }
      .nums-item h3 {
        margin-top: 48rem / $rem;
        margin-bottom: 12rem / $rem;
        font-size: 48rem / $rem;
      }
      .nums-item p {
        margin-bottom: 51rem / $rem;
        font-size: 36rem / $rem;
      }
    }
  }
</style>
