import axios from 'axios'

let base = 'http://local.me:3000'

export const baseHost = base

// 创建 request 实例
const ax = axios.create({
  baseURL: base,
  timeout: 5000 // 请求超时时间
})

// request拦截器
ax.interceptors.request.use(config => {
  // set common config
  return config
}, error => {
  logSome(error) // for debug
  Promise.reject(error)
})

export const get = (url, config) => {
  return new Promise((resolve, reject) => {
    ax.get(url, config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        logSome(`====== get error for url: [${url}] ======`)
        logSome(err.response)
        reject(err)
      })
  })
}

export const post = (url, data, config) => {
  return new Promise((resolve, reject) => {
    ax.post(url, data, config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        logSome(`====== post error for url: [${url}] ======`)
        logSome(err.response)
        reject(err)
      })
  })
}
