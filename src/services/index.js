import axios from 'axios';
import router from 'router';
import { getStorage } from '@/utils/cache';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';

const backendURL = 'http://119.29.157.231:8888';

// 创建axios实例
const http = axios.create({
  baseURL: backendURL,
  timeout: 5000,
});

// 枚举状态码
http.httpCode = {
  SUCCESS: 1, // 成功
  FAIL: 400, // 失败
  UNAUTHORIZED: 401, // 没有权限，不存在token
  TOKEN_TIMEOUT: 60002, // token 过期
  NOFOUNDUSER: 50001 // 不存在该用户
};

export const rootUrl = 'http://119.29.157.231:8888/';

// 请求拦截器
http.interceptors.request.use((config) => {
  const token = getStorage('token');
  console.log(token, 'token');
  if (token) {
    config.headers.common.token = token;
  }
  return config;
});

// 响应拦截器
http.interceptors.response.use(
  (res) => {
    // OK
    const response = res.data;
    console.log(response);

    // 做出提示
    if (response.code === http.httpCode.SUCCESS) {
      ElMessage.success({
        message: res.data.msg || '数据链路请求成功!'
      });
    }
    return Promise.resolve(res);
  },
  (err) => {
    // 错误
    const res = err.response;
    console.log('service error: ' + err.response, err);
    ElMessage.error({
      message: res.data.msg || '出现错误!'
    });
    if (res.data.code === http.httpCode.UNAUTHORIZED) {
    // 权限不够，返回登录页
      router.push({ path: '/login' });
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
