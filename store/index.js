import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { getNewsRequest } from '../api/info'
import { getBanner } from '../api/index'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    apiUrl: {},
    news: {
      newsList: [],
      newsParams: {
        page: 1,
        size: 6,
        total: 0
      }
    },
    policy: {
      policyList: [],
      policyParams: {
        page: 1,
        size: 6,
        total: 0
      }
    },
    scrollDisable: false,
    banners: []
  },
  getters: {
    bannersImg: state => {
      let list = []
      state.banners.forEach((item) => {
        list.push(item.image)
      })
      return list
    }
  },
  mutations: {
    'GET_ALL_API' (state, api) { // 获取所有api地址
      state.apiUrl = {...state.apiUrl, ...api}
    },
    'GET_NEWS' (state, data) { // 获取新闻
      state.news.newsList = [...state.news.newsList, ...data.list]
      state.news.newsParams = data.params
      state.scrollDisable = !state.scrollDisable // 每次请求完之后放开禁止请求
    },
    'SCROLL_DISABLE' (state) { // 控制每次滚动到底部的时候只发一次请求  可以删除不影响数据
      state.scrollDisable = !state.scrollDisable
    },
    'GET_POLICY' (state, data) {
      state.policy.policyList = [...state.policy.policyList, ...data.list]
      state.policy.policyParams = data.params
      state.scrollDisable = !state.scrollDisable // 每次请求完之后放开禁止请求
    },
    'GET_BANNERS' (state, banners) {
      state.banners = banners
    }
  },
  actions: {
    async getNews ({commit, state}, params) { // 每次滚到底部发送请求的方法
      commit('SCROLL_DISABLE') // 首先在此次请求没有结束前禁止再进入此方法
      let { gmtype, page, size } = params
      let newsData = await getNewsRequest(state.apiUrl.iot_site.news, gmtype, page, size)
      commit('GET_NEWS', newsData)
    },
    async nuxtServerInit ({commit, state}) { // 所有初始化的数据在这里请求
      let {data} = await axios.get('http://ng.cniotroot.cn/api/sitemap.json') // 获取所以API
      commit('GET_ALL_API', data)
      let newsData = await getNewsRequest(state.apiUrl.iot_site.news, 26) // 获取请求返回的数据
      commit('GET_NEWS', newsData)
      /* commit('SCROLL_DISABLE') // 由于上个commit会禁止掉滚动请求在这里重新打开 */
      let policyData = await getNewsRequest(state.apiUrl.iot_site.news, 113)
      commit('GET_POLICY', policyData)
      let banners = await getBanner(state.apiUrl.iot_site.banners)
      commit('GET_BANNERS', banners)
    }
  }
})

export default store
