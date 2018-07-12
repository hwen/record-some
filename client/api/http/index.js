import axios from 'axios';

let base = 'http://localhost:3000';

export const baseHost = base;

// 创建 request 实例
const ax = axios.create({
  baseURL: base,
  timeout: 5000 // 请求超时时间
});

// request拦截器
ax.interceptors.request.use(
  config => {
    // set common config
    return config;
  },
  error => {
    ilog(error); // for debug
    Promise.reject(error);
  }
);

export const get = (url, config) => {
  return new Promise((resolve, reject) => {
    ax.get(url, config)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        ilog(`====== get error for url: [${url}] ======`);
        ilog(err);
        reject(err);
      });
  });
};

export const post = (url, data, config) => {
  return new Promise((resolve, reject) => {
    ax.post(url, data, config)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        ilog(`====== post error for url: [${url}] ======`);
        ilog(err);
        reject(err);
      });
  });
};
