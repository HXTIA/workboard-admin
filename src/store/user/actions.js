import { setStorage } from '@/utils/cache';
export default {
  actions: {
    setRoutes(data) {
      this.authRoutes.push(...data);
    },
    setUserInfo() {
      // 存储信息的同时，保存登录状态
      setStorage('token', '121212');
      this.token = '121212';
    }
  }
};
