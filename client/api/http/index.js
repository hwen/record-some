import axios from 'axios';

let base = '/api';
if (process.env.NODE_ENV === 'development') {
  base = 'http://localhost:3000';
}

export const baseHost = base;

const respMiddleware = resp => {
  if (resp.statusCode === 200) {
    return {
      isOk: true,
      ...resp.data
    };
  }
  return {
    isOk: false,
    ...resp.data
  };
};

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
        resolve(respMiddleware(res));
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
        resolve(respMiddleware(res));
      })
      .catch(err => {
        ilog(`====== post error for url: [${url}] ======`);
        ilog(err);
        reject(err);
      });
  });
};
