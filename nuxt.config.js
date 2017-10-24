const path = require('path')
const webpack = require('webpack')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,minimum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*  对于使用vue的插件或者自己写的插件  特别是需要使用到Vue.use()在这里并且最好添加到build打包中  */
  plugins: [
    {src: '~plugins/element-ui'},
    {src: '~plugins/axios'},
    {src: '~plugins/swiper', ssr: false}
  ],
  /* common css */
  css: [
    'normalize.css',
    'swiper/dist/css/swiper.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /* cache   */
  cache: false,
  /*
  ** Build configuration
  */
  build: {
    // analyze: true,
    vendor: ['axios', 'lodash', 'element-ui', 'vue-awesome-swiper'], // 共用的第三方模块只打一次包
    /* ** Run ESLint on save */
    extend (config, ctx) {
      // console.log('this is alias:', config.resolve.alias)
      const alias = config.resolve.alias || {}
      alias['base'] = path.join(__dirname, 'assets/scss/base.scss')
      alias['api'] = path.join(__dirname, 'api')
      alias['plugins'] = path.join(__dirname, 'plugins')
      alias['store'] = path.join(__dirname, 'store')
      alias['directives'] = path.join(__dirname, 'directives')
      alias['middleware'] = path.join(__dirname, 'middleware')
      alias['components'] = path.join(__dirname, 'components')
      // console.log('this is alias:', config.resolve.alias)
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config.devtool = 'eval-source-map'
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash',
        'axios': 'axios'
      })]
    /*  配置postcss转换pxtorem移动端适配  */
    /* postcss: [require('postcss-px2rem')({remUnit: 75})] */
  }
}
