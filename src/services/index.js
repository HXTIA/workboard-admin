import axios from 'axios';
import userStore from 'store/user';
import router from 'router';

const backendURL = 'http://119.29.157.231:8888';

// 创建axios实例
const http = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND,
  baseURL: backendURL,
  timeout: 5000,
});

// 枚举状态码
http.httpCode = {
  SUCCESS: 1, // 成功
  FAIL: 400, // 失败
  UNAUTHORIZED: 401, // 没有权限
  NOFOUNDUSERL: 50001
};

// 请求拦截器
http.interceptors.request.use((config) => {
  const store = userStore();
  const token = store.getToken;

  if (token) {
    config.headers.common.token = token;
  }
  return config;
});

// 响应拦截器
http.interceptors.response.use(
  (res) => {
    // OK
    return Promise.resolve(res);
  },
  (err) => {
    // 错误
    const res = err.response;
    if (res.data.code === http.httpCode.UNAUTHORIZED) {
    // 权限不够，返回登录页
      router.push('/login');
      return Promise.resolve(res);
    }
    return Promise.resolve(res);
  }
);

const request = (params) => {
  // 转换method为大写 -> 同时处理请求方式
  const method = params.method.toUpperCase();
  if (method === 'GET' || method === 'DELETE') {
    params.param = params.data;
    delete params.data;
  }

  // 发起请求
  return new Promise((resolve, reject) => {
    http(params)
      .then((res) => resolve(res.data))
      .catch((err) => {
        reject(err.response ? err.response.data : err.data);
      });
  });
};

// 请求函数 -> 默认导出
export default request;
