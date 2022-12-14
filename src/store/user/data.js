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
    getToken: (state) => state.token || getStorage('token'),
    getAuthPermission: (state) => state.authPermission || [],
    getUserInfo: () => getStorage('userInfo') || {},
    getRoles: () => getStorage('roles') || [],
  }
};
