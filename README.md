### nuxt最新官网
[NUXT](https://nuxtjs.org/)
### 目录配置
nuxt会有一些特定的文件夹是不能修改名字的，比如存放页面文件的pages,因为nuxt需要根据pages的结构生成一个路由文件，具体的目录可查看官网

components目录下的.vue文件和pages中的.vue文件不一样，比如asyncData只会存在pages目录的vue文件，当然你也可以自己新建目录比如directives

![这是目录结构](https://github.com/ouyangxiaoai/myNuxt/blob/master/md-img/dir.jpg)
### 注意
#### 如果没有特殊需要使用官方提供的start模板即可，然后再自定义修改
cache表示缓存可以修改为true,如果有第三方需要打包如axios，则需要添加到build的vendor,这样不管axios引用多少次也只会打一次包。
还有webpack的配置都在build选项中，可自定义。
```
module.exports = {
      cache: true, // 默认是false
      // or
      cache: {
        max: 1000,
        maxAge: 900000
      },
      build: {
        vendor: [
          'axios', // 第三方插件
          '~plugins/my-lib.js' // 自己写的
        ]
      }
    }
```
    
css的全局配置的时候，如果是第三方css文件比如normalize.css则直接使用名字即可，如果是scss则需要指定路径，并且标明lang: scss.新增了extractCSS,
如果有很多公用的css模块可以配置：
```
**module.exports = {
      css: [
        'normalize.css', // 第三方css
        {src: '~/assets/scss/base.scss', lang: 'scss'} // 自定义scss
      ],
      build: {
        extractCSS: true // 默认是false 具体作用查看extract-text-webpack-plugin
      }
}**
```

middleware中间件的使用允许你在渲染一个或者一组页面之前执行一个模块，如果是在nuxt.config.js的router中其实就是相当于普通vue项目中的导航钩子会在每次路由改变的时候执行如
```
**module.exports = {
      router: {
        middleware: 'auth' // 会在每次路由进入之前执行middleware/auth.js 
      }
    }**
```
如果是在layouts或者.vue中则是
```
**export default {
      middleware: 'auth' // 表示在组件渲染之前或者layouts渲染之前调用
    }**
```

1.0版本中默认只有两个alias ![alias](https://github.com/ouyangxiaoai/myNuxt/blob/master/md-img/alias.jpg)
如果还需要其它自定义alias可以在nuxt.config.js中设置：
```
**module.exports = {
      build: {
        extend (config, ctx) { // config是webpack对象，ctx是上下文对象包括isClient等    
          const alias = config.resolve.alias || {}
          alias['api'] = path.join(__dirname, 'api')     
        },
      }
    }**
    ```
    可以查看nuxt的webpack源码 [webpack](https://github.com/nuxt/nuxt.js/tree/master/lib/webpack)

对于需要通过head引入的js文件，比如jQuery有可能因为eslint的原因导致$没有定义，所以注意可以把undefined通过.eslintrc编辑掉
```
**rules: {
      "no-undef": ['warn'] // 当遇到未定义时只警告不报错  不建议
    }**
```

plugins目录的文件是会在应用加载之前加载的，所以一些需要提前运行的可以写在plugins，特别是vue的组件，比如element-ui
```/*  对于使用vue的插件或者自己写的插件  特别是需要使用到Vue.use()在这里并且最好添加到build打包中  */
      **plugins: [
        {src: '~plugins/element-ui'},
        {src: '~plugins/axios'},
        {src: '~plugins/swiper', ssr: false}
      ],**
```
### 组件
nuxt给每个页面组件提供了两个获取数据的方法，asyncData和fetch。不同点是asyncData返回的数据会填充到页面的data里面，而fetch不会。
fetch可以用来填充store的数据,asyncData中的网络请求可以通过isServer或者isClient判断服务端或者客户端渲染。并且这两个方法无法获取到this
```
**export default {
      asyncData ({ params }) { // asyncData方法的第一个参数就是上下文对象，包括store/isClient/route等
        return axios.get(`https://my-api/posts/${params.id}`)
        .then((res) => {
          return { title: res.data.title }
        })
      },
      fetch ({ store, params }) { // fetch方法的参数跟asyncData一致
          return axios.get('http://my-api/stars')
          .then((res) => {
            store.commit('setStars', res.data)
          })
        }
    }**
```
页面组件的validate方法只用于校验动态路由参数
```
**export default {
      validate ({ params }) {
        return /^\d+$/.test(params.id) // 如果false会直接重定向到错误页面
      }
    }**
```
    
如果error页面要自定义的话需要在layouts文件夹里添加error.vue,并且不能改名字,error会当作props传进去
### 路由
动态路由的时候，_id都是动态的可以不写进path中，因为写进去就是字符串无法改变
```
**<nuxt-link :to="{path: '/info/'+ item.cms_id}"></nuxt-link>**
```
### 数据填充
如果要是想要在应用一开始就从服务端拿回数据填充vuex，可以在store.index.js的actions添加方法nuxtServerInit进行获取后commit
```
**actions: {
        async nuxtServerInit ({commit, state}) { // 所有初始化的数据在这里请求
          let {data} = await axios.get('http://ng.cniotroot.cn/api/sitemap.json') // 获取所以API
          commit('GET_ALL_API', data)
        }
      }**
```
      
context可以包含一个全局的app对象可以设置属性进去，比如说plugins的axios插件可以写成：
```
**plugins/axios.js
   export default ({app}) => {app.axios = axios}**
```
然后只要以后有用到context对象的时候就可以直接使用axios而不用导入
```
**pages/index.vue
    export default {
      asyncData ({app}) {
        app.axios.get() // 可以获取到axios 而不用import axios
      }
    }**
```
