import { handleRoutes } from '@/utils/routes';
import { dynamicRoutes } from '@/data/work.js';
import 'element-plus/es/components/message/style/css';
import { ElMessage } from 'element-plus';
import { removeStorage } from '@/utils/cache';

export const requestRoutes = async (store, router) => {
  // const res = await request({
  //   url: 'http://localhost:3000/api/data/getRouters',
  //   method: 'GET',
  // });
  // 处理路由表请求问题 -> 如果是没有权限 -> token过期 -> 重新登录
  const res1 = 1;
  if (!res1) {
    ElMessage.success({
      message: '登录态已过期，前往登录！',
    });

    // 清除token
    removeStorage('token');

    // 宏任务等storage清除之后再跳转
    setTimeout(() => {
      // 登陆界面
      router.push({ name: 'login' });
      // 返回
      return false;
    }, 0);
  }
  const res = dynamicRoutes;
  store.setRoutes(res);
  const Res = handleRoutes(res);
  Res.forEach((value) => {
    router.addRoute('Home', value);
  });
  return true;
};
