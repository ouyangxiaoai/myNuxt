<template>
  <div>
    <iot-head></iot-head>
    <nuxt/>
  </div>
</template>
<script>
  import head from 'components/common/head.vue'
  export default {
    components: {
      'iot-head': head
    }
  }
</script>
<style>
</style>
