import { setStorage } from '@/utils/cache';
export default {
  actions: {
    setOrgInfo(res) {
      // 存储用户信息
      Object.keys(res).forEach((key) => {
        const value = res[key];
        this.orgInfo[key] = value;
      });
      setStorage('orgInfo', this.getOrgInfo);
    },
  }
};
