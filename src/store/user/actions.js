import { setStorage } from '@/utils/cache';
import { handleAuthPermission } from '@/utils/routes/handlePermission.js';
import { ls } from '@/utils/secureLS';

export default {
  actions: {
    // 保存路由表
    setRoutes(data) {
      // 保存路由表
      this.authRoutes.push(...data);
      // 保存各模块的权限
      this.setAuthPermission(data);
    },

    // 保存token
    setToken(token) {
      this.token = token;
      // ls.set('token', this.token);
      setStorage('token', token);
    },

    // 保存用户信息
    setUserInfo(res) {
      // 存储用户信息
      Object.keys(res).forEach((key) => {
        const value = res[key];
        this.userInfo[key] = value;
      });
      ls.set('userInfo', this.userInfo);
    },

    // 保存各模块权限
    setAuthPermission(data) {
      // 存储各模块权限
      const authPermission = handleAuthPermission(data);
      this.authPermission.push(...authPermission);
    },

    // 保存角色信息
    setRoles(data) {
      this.roles.push(...data);
      ls.set('roles', this.roles);
    }
  }
};
