import { handleRoutes } from '@/utils/routes';
// import { dynamicRoutes } from '@/data/work.js';
import 'element-plus/es/components/message/style/css';
import { ElMessage } from 'element-plus';
import { removeStorage } from '@/utils/cache';
import request from '@/services';

export const requestRoutes = async (store, router) => {
  // 请求路由表
  // 根绝roleid
  const roleIds = store.getRoles[0].id;
  const res = await request({
    url: '/admin/resources/searchMenu',
    method: 'GET',
    params: {
      roleIds
    }
  });

  // 据返回值进行判断
  return await new Promise((resolve, reject) => {
    // 没有权限
    if (Number(res.code) !== 1) {
      ElMessage.success({
        message: '登录态已过期，前往登录！',
      });

      // 清除token
      removeStorage('token');

      // 返回失败
      return resolve(false);
    }
    // 存储路由表
    store.setRoutes(res.data);
    // 引入对应组件
    const Res = handleRoutes(res.data);
    // 添加路由
    Res.forEach((value) => {
      router.addRoute('Home', value);
    });
    // 返回成功
    return resolve(true);
  });
};
