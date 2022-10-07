import { setStorage } from '@/utils/cache';
// import { flatten } from '@/utils/shared/array.js';
export default {
  actions: {
    setRoutes(data) {
      // 保存路由表
      this.authRoutes.push(...data);
      // 保存各模块的权限
      this.setAuthPermission(data);
    },
    setUserInfo(token) {
      // 存储信息的同时，保存登录状态
      setStorage('token', token);
      this.token = token;
    },
    setAuthPermission(data) {
      const authPermission = new Map();
      // const res = flatten(data);
      data.forEach((value) => {
        // const id = value.id;
        const navMenu = value.children || [];
        navMenu.forEach((item) => {
          const obj = {
            originId: value.id,
            originName: value.name,
            parentId: item.id,
            parentName: item.name,
          };
          authPermission.set(obj, item.children);
        });
      });
      this.authPermission.push(...authPermission);
      console.log(this.authPermission);
    }
  }
};
