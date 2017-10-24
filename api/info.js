import axios from 'axios'

export const getNewsRequest = (url, gmtype = '', page = 1, size = 6) => {
  return axios.get(url, {
    params: {
      gmtype,
      page,
      size
    }
  }).then(res => {
    let tempArr = []
    let list = res.data.results.filter((item) => {
      return item.img !== ''
    })
    list.forEach((item, index) => {
      let {img, title, ctime, cms_id} = item
      tempArr[index] = {
        img,
        title,
        ctime,
        cms_id
      }
    })
    let news = {
      list: tempArr,
      params: {
        page,
        size,
        newsTotal: res.data.count
      }
    }
    return news
  })
}
