<template>
  <div class="m-pro-bg">
    <div class="m-pro-detail">
      <div class="m-pro f-cb">
        <div class="m-pro-left">
          <h1 class="u-t">{{ title }}</h1>
          <div class="u-t-bar">
            <div class="u-t2">
              <span class="tt2">来源:</span>
              <span class="tt2">{{ ctn.tt[0] }}</span>
            </div>
            <div class="u-t2">
              <span class="tt2">发布时间:</span>
              <span class="tt2">{{ ctn.tt[1] }}</span>
            </div>
          </div>
          <div class="u-t-label">
            <span class="label" v-for="l in labels">{{ l }}</span>
          </div>
          <div class="u-ctn" v-html="ctn.cc">
          </div>
        </div>
      </div>
      <div class="m-pro-code f-cb">
        <div class="u-left">
          <p>原创文章，如若转载，请注明出处：国物标识</p>
          <p>还想了解更多关于标识的价值应用？请关注右侧微信公众号</p>
        </div>
        <div class="u-right">
          <ul>
            <li class="u-item">
              <img src="../../assets/img/gwbscode.png" alt="">
              <span>国物标识公众号</span>
            </li>
            <li class="u-item">
              <img src="../../assets/img/niotcode.png" alt="">
              <span>NIOT 公众号</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    asyncData ({store, route, isServer}) {
      if (isServer) {
        const url = store.state.apiUrl.iot_site.cms_message.replace('$id$', '')
        return axios({
          url: url + route.params.id,
          method: 'get',
          type: 'jsonp'
        }).then((res) => {
          let title = res.data.title
          let ctn = {
            tt: ['国物标识', res.data.ctime, res.data.subtitle],
            cc: res.data.content
          }
          let labels = res.data.labels
          let arr = labels.split(' ')
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '') {
              arr.splice(i, 1)
              i = i - 1
            }
          }
          labels = arr
          return {
            title,
            ctn,
            labels
          }
        }).catch((err) => {
          console.log('获取详情出错：', err)
        })
      }
    },
    data () {
      return {
        title: '案例详情',
        ctn: {
          tt: [
            '国物标识',
            '',
            ''
          ],
          cc: ''
        },
        next: '',
        prev: '',
        id: '',
        pPage: '',
        nPage: '',
        size: '',
        type: '',
        index: '',
        pIndex: '',
        nIndex: '',
        pTitle: '',
        nTitle: '',
        num: '',
        pnum: '',
        nnum: '',
        page: '',
        labels: [],
        more: [
          {
            tt: '国家食品药品监督管理总局关于推动食品药品国家食品药品',
            img: ''
          }
        ],
        scrollbottom: 0,
        npFlag: 0
      }
    },
    props: []
  }
</script>

<style lang="scss">
  @import "~assets/scss/common";

  .u-ctn {
    width: 700px;
    margin: 4rem auto 0;
    font-size: 1.8rem;
    p {
      margin-top: 2rem;
    }
    strong {
      font-size: 2.1rem
    }
    img {
      max-width: 65%;
      margin-top: 2.5rem;
      margin-bottom: 2.5rem;
    }
    a {
      color: rgb(0, 0, 204);
      font-weight: 600;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .mobil {
    .u-ctn {
      width: auto;
      margin: 0;
      font-size: 36rem / $rem;
      padding: 0;
      p {
        line-height: 78rem / $rem !important;
        margin: 0 $mCtPadding 59rem / $rem !important;
        font-size: 42rem / $rem !important;
        font-family: inherit !important;
        text-indent: 0 !important;
      }
      span {
        font-size: 48rem / $rem !important;
      }
      strong {
        font-size: 54rem / $rem !important;
        font-family: inherit !important;
        font-weight: 700 !important;
        span {
          font-size: 54rem / $rem !important;
          font-family: inherit !important;
          font-weight: 700 !important;
        }
      }
      img {
        max-width: 100% !important;
        height: auto !important;
        margin-top: 0;
        margin-bottom: 0;
      }
    }
  }
</style>
<style lang="scss" scoped>
  @import "~assets/scss/common";

  .m-pro-bg {
    background: #faf9f9;
    overflow: hidden;
  }

  .m-pro-detail {
    position: relative;
    width: 1200px;
    margin: 2rem auto 0;
    .u-t {
      width: 700px;
      margin: 0 auto;
      text-align: left;
      font-size: 2.6rem;
      color: #333;
    }
    .m-pro-left {
      background: #fff;
      float: left;
      width: 800px;
      border: 1px solid #ededed;
      padding: 50px;
    }
    .m-pro-right {
      background: #fff;
      float: left;
      width: 340px;
      border: 1px solid #ededed;
      margin-left: 30px;
      padding-left: 20px;
      padding-right: 20px;
      .u-title {
        font-size: 18px;
        margin-top: 30px;
      }
      .u-m {
        margin-top: 24px;
        img {
          width: 120px;
          height: 75px;
          float: left;
        }
        .u-m-right {
          width: 160px;
          font-size: 16px;
          float: left;
          margin-left: 10px;
          margin-top: 5px;
        }
        &:last-child {
          margin-bottom: 30px;
        }
      }
    }
    .m-pro-code {
      width: 800px;
      background: #fff;
      border: 1px solid #ededed;
      padding-left: 50px;
      padding-right: 50px;
      margin-top: 30px;
      margin-bottom: 30px;
      .u-left {
        float: left;
        width: 420px;
        padding-top: 50px;
        padding-bottom: 50px;
        margin-right: 5px;
        p {
          font-size: 14px;
          color: #a1a1a1;
          line-height: 2;
        }
      }
      .u-right {
        float: left;
        .u-item {
          display: inline-block;
          margin-left: 30px;
          width: 100px;
          margin-top: 20px;
          text-align: center;
          font-size: 0;
          span {
            font-size: 14px;
            color: #a1a1a1;
            line-height: 2;
          }
          img {
            width: 90px;
            height: 90px;
          }
        }
      }
    }
    .u-t-bar {
      text-align: left;
      margin-top: 1.8rem;
    }
    .u-t2 {
      text-align: center;
      display: inline-block;
      margin-right: 2rem;
      .tt2 {
        font-size: 1.7rem;
        color: #a1a1a1;
      }
    }
    .u-t-label {
      width: 800px;
      margin-top: 2rem;
      .label {
        font-size: 1.6rem;
        background: #f0f0f0;
        padding: .5rem .8rem;
        margin-right: 1rem;
        color: #999;
        border-radius: .4rem;
      }
    }
    .u-model-box {
      margin-top: 3rem;
      padding-top: 2rem;
      margin-bottom: 3rem;
      border-top: .1rem solid #ccc;
      font-size: 2.1rem;
      display: none;
      &.f-no-line {
        border-top: 0;
      }
      .u-next {
        color: #42b8f1;
        cursor: pointer;
      }
      .u-next-t {
        font-size: 2.1rem;
        color: #666;
        &:hover {
          color: #333;
        }
      }
    }
    .u-model-box-pc {
      position: fixed;
      left: 50%;
      margin-left: 230px;
      width: 300px;
      bottom: 0;
      transition: bottom .8s;
      cursor: pointer;
      z-index: 9999999999;
      &.f-isShow0 {
        bottom: -210px;
      }
      &.f-isShow1 {
        bottom: 0;
      }
      &.f-isShow2 {
        position: absolute;
        bottom: 0;
      }
      .u-np {
        width: 300px;
        height: 100px;
        padding-left: 20px;
        position: relative;
        background: rgba(55, 55, 55, .7);
        margin-top: 10px;
        .u-next-t {
          color: #fff;
          font-size: 16px;
        }
        .u-next {
          color: #fff;
          font-size: 14px;
          position: absolute;
          bottom: 10px;
          right: 30px;
        }
        .u-n:after {
          content: ' ';
          display: block;
          width: 0;
          height: 0;
          position: absolute;
          bottom: 2px;
          right: -20px;
          border-style: solid;
          border-width: 7px;
          border-top-color: transparent;
          border-left-color: rgba(255, 255, 255, 1);
          border-bottom-color: transparent;
          border-right-color: transparent;
        }
        .u-p:after {
          content: ' ';
          display: block;
          position: absolute;
          bottom: 2px;
          right: -13px;
          width: 0;
          height: 0;
          margin-left: -7px;
          border-style: solid;
          border-width: 7px;
          border-top-color: transparent;
          border-left-color: transparent;
          border-bottom-color: transparent;
          border-right-color: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  .mobil {
    .m-pro-bg {
      background: none;
    }
    .m-pro-detail {
      width: auto;
      margin: 90rem / $rem 0 0;
      .m-pro-left {
        float: none;
        width: auto;
        padding: 0;
        border: none;
      }
      .m-pro-right {
        float: none;
        width: auto;
        margin-left: 0;
        padding-left: $mCtPadding;
        padding-right: $mCtPadding;
        border-top: 20rem / $rem solid #f8f8f8;
        .u-title {
          line-height: inherit;
          margin-top: 60rem / $rem;
          margin-bottom: 12rem / $rem;
          font-size: 48rem / $rem;
        }
        .u-m {
          margin-top: 0;
          padding: 48rem / $rem 0;
          border-bottom: 2rem / $rem solid #eee;
          img {
            width: 320rem / $rem;
            height: 200rem / $rem;
          }
          .u-m-right {
            position: relative;
            float: none;
            display: block;
            height: 200rem / $rem;
            width: auto;
            margin-top: 0;
            margin-left: 380rem / $rem;
            font-size: 48rem / $rem;
          }
          .u-m-right-tt {
            margin-top: 9rem / $rem;
            height: 124rem / $rem;
            line-height: 62rem / $rem;
            @include mutipEllipsis(2);
          }
          .u-m-right-time {
            position: absolute;
            bottom: 12rem / $rem;
            font-size: 36rem / $rem;
            color: $color9;
          }
          &:last-child {
            margin-bottom: 52rem / $rem;
            border: none;
          }
        }
      }
      .u-t {
        width: auto;
        margin: 0 $mCtPadding;
        text-align: left;
        font-size: 66rem / $rem;
        font-weight: 700;
        color: #333;
      }
      .u-t-bar {
        text-align: left;
        margin: 43rem / $rem $mCtPadding 0;
      }
      .u-t-label {
        width: auto;
        margin: 57rem / $rem $mCtPadding 60rem / $rem;
        .label {
          display: inline-block;
          vertical-align: middle;
          margin-right: 21rem / $rem;
          margin-bottom: 24rem / $rem;
          padding: 15rem / $rem 24rem / $rem;
          font-size: 39rem / $rem;
          color: #999;
          border-radius: 6rem / $rem;
          background: #f0f0f0;
        }
      }
      .u-t2 {
        display: inline-block;
        margin-right: 24rem / $rem;
        text-align: left;
        .tt2 {
          font-size: 42rem / $rem;
          color: #666;
        }
      }
      .u-model-box {
        margin-top: 0;
        margin-bottom: 80rem / $rem;
        border: none;
        font-size: 42rem / $rem;
        .f-fl, .f-fr {
          margin: 0 $mCtPadding;
        }
        .f-fl {
          margin-bottom: 10rem / $rem;
        }
        .f-fr {
          float: left;
        }
      }
    }
  }
</style>

<style lang="scss">
</style>
