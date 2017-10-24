import axios from 'axios'

export const getBanner = (url) => {
  return axios.get(url).then((res) => {
    return res.data.results
  }).catch((err) => {
    console.log('获取banner发生错误：', err)
  })
}
