// 引入axios
import axios from 'axios';
import {baseUrl} from './env';
import {
    getStore
} from '@/config/mUtils';
import Vue from "vue";

let cancel, promiseArr = {};
const CancelToken = axios.CancelToken;
// 请求拦截器
axios.interceptors.request.use(config => {
  // 发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    // promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel;
  } else {
    promiseArr[config.url] = cancel;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  return response;
}, err => {
  let errorCode = -5;
  let message = 'System Error';
  if (err && err.response) {
    errorCode = err.response.status;
    message = err.response.message;
  } else {
    if (err.message) {
      message = err.message;
      switch (err.message) {
      case 'Network Error':
        errorCode = -5;
      }
    }
  }
  console.error(err.config.url + '  Error Code:' + errorCode + '  Messge:' + message);
  return Promise.resolve({data: {errorCode: errorCode, message: message}});
});

// const token = JSON.parse(getStore('token'));
axios.defaults.baseURL = baseUrl;
// 设置默认请求头
// axios.defaults.headers = {
//   'X-Requested-With': 'XMLHttpRequest'
// };
// if(token) {
//   axios.defaults.headers = Object.assign(axios.defaults.headers, {
//     token: token.token
//   });
// }
axios.defaults.timeout = 15000;

export default {
  // get请求
  get(url, param) {
    const loginInfo = JSON.parse(getStore('loginInfo'));
    let headers = {};
    if(loginInfo) {
      headers = {Authorization: loginInfo.token};
    }
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        headers: headers,
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then((res) => {
        if (res) {
          const data = res.data;
          if(data.errorCode){
            // Vue.prototype.$message.error('Error Code: ' + data.errorCode);
          }
          resolve(data);
        }
      });
    });
  },
  // post请求
  post(url, param, body) {
    const loginInfo = JSON.parse(getStore('loginInfo'));
    let headers = {};
    if(loginInfo) {
      headers = {Authorization: loginInfo.token};
    }
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        params: param,
        headers: headers,
        data: body,
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(res => {
        if (res) {
          const data = res.data;
          if(data.errorCode){
            // Vue.prototype.$message.error('Error Code: ' + data.errorCode);
          }
          resolve(data);
        }
      });
    });
  }
};
