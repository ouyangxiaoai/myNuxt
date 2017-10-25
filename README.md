### nuxt最新官网
[NUXT](https://nuxtjs.org/)
### 目录配置
nuxt会有一些特定的文件夹是不能修改名字的，比如存放页面文件的pages,因为nuxt需要根据pages的结构生成一个路由文件，具体的目录可查看官网

components目录下的.vue文件和pages中的.vue文件不一样，比如asyncData只会存在pages目录的vue文件，当然你也可以自己新建目录比如directives

![这是目录结构](md-img/dir.png)
#### 对于配置需要注意，大部分使用默认即可，如有特殊需要自定义修改
     1. cache表示缓存可以修改为true,如果有第三方需要打包如axios，则需要添加到build的vendor,这样不管axios引用多少次也只会打一次包，还有webpack的配置都在build选项中，可自定义。
     2. css的全局配置的时候，如果是第三方css文件比如normalize.css则直接使用名字即可，如果是scss则需要指定路径，并且标明lang: scss
     3. middleware中间件的使用允许你在渲染一个或者一组页面之前执行一个模块，如果是在nuxt.config.js的router中其实就是相当于普通vue项目中的导航钩子会在每次路由改变的时候执行如router: {middlewar: 'auth'}如果是在layouts或者.vue中则是export default {middleware: 
     'auth'}表示在组件渲染之前或者layouts渲染之前调用
     4. 对于设置单个文件alias的使用时前面需要加~，原因不明如：alias['base'] = path.join(__dirname, 'assets/scss/base.scss')
      @import '~base'
     5. 对于需要通过head引入的js文件，比如jQuery有可能因为eslint的原因导致$没有定义，所以注意可以把undefined通过.eslintrc编辑掉
     6. plugins的文件是会在应用加载之前加载的，所以一些需要提前运行的可以写在plugins，特别是vue的组件，比如element-ui
### 组件
    1. nuxt给每个页面组件提供了两个获取数据的方法，asyncData和fetch，不同点是asyncData返回的数据会填充到页面的data里面，而fetch不会，fetch可以用来填充store的数据,asyncData中的网络请求可以通过isServer或者isClient判断服务端或者客户端渲染。并且这两个方法无法获取到this
2. 页面组件的validate方法只用于校验动态路由参数
3. 如果error页面要自定义的话需要在layouts文件夹里添加error.vue,并且不能改名字,把error当作props传进去
### 路由
动态路由的时候，_id都是动态的可以不写进path中，因为写进去就是字符串无法改变
### 数据填充
如果要是想要在应用一开始就从服务端拿回数据填充vuex，可以在store.index.js的actions添加方法nuxtServerInit进行获取后commit就行
context可以包含一个全局的app对象可以设置属性进去，比如说plugins的axios插件可以写成：
  export default ({app}) => {app.axios = axios},然后只要以后有用到context对象的时候就可以直接使用axios而不用导入
