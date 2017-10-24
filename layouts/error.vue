<template>
  <div>
    <h1>{{error.statusCode}}</h1>
    <h3 v-if="error.statusCode === 404">页面不存在！</h3>
  </div>
</template>
<script>
  export default {
    props: ['error']
  }
</script>
