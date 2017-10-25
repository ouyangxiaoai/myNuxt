<template>
  <div>
  <div v-for="news in data" class="news">
    <div v-for="item in news" class="new" v-if="item !== null">
      <nuxt-link :to="{path: '/info/'+ item.cms_id}">
      <div class="img-box"><img :src="item.img" alt=""></div>
      <div class="new-title">{{item.title}}</div>
      <div class="new-date">{{item.ctime}}</div>
      </nuxt-link>
    </div>
    <div class="new" v-else></div>
  </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: Array
    }
  }
</script>
<style lang="scss" scoped>
  .news {
    display: flex;
    flex-direction: row;
    align-items: center;
  .new {
    flex: 1;
    padding: 35px 18px;
    height: 300px;
    cursor: pointer;
    overflow: hidden;
    transition: all 1s;
  &:hover img {
     transform: scale(1.3);
   }
  .img-box {
    width: 100%;
    height: 180px;
    overflow: hidden;
  }
  img {
    width: 100%;
  }
  .new-title,.new-date {
    padding: 15px 18px;
  }
  }
  }
  a {
    text-decoration: none;
    color: #666666;
  }
</style>
