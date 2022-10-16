import { getStorage } from '@/utils/cache';
export default {
  state: () => ({
    authRoutes: [],
    authPermission: [],
    token: '',
    userInfo: {},
    roles: []
  }),
  getters: {
    getRoutes: (state) => state.authRoutes || [],
    getToken: (state) => getStorage('token') || '',
    getAuthPermission: (state) => state.authPermission || [],
    getUserInfo: () => getStorage('userInfo') || {},
    getRoles: () => getStorage('roles') || [],
  }
};
