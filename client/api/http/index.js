import axios from 'axios';
import { get as prop } from 'src/utils';

let base = '/api';
if (process.env.NODE_ENV === 'development') {
  base = 'http://localhost:7777';
}

export const baseHost = base;

const respMiddleware = resp => {
  if (resp.statusCode === 200 || prop(resp, 'data.status') === 0) {
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
    ilog.error('axios[interceptors] err: ', error); // for debug
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
        ilog.error(`axios[get] [${url}] error: `, err);
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
        ilog.error(`axios[post] [${url}] error: `, err);
        ilog.error(`axios[post] [${url}] params: `, data);
        reject(err);
      });
  });
};
