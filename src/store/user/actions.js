export default {
  actions: {
    setRoutes(data) {
      // 这一步根据后端的icon数据动态引入组件
      data.map((value) => {
        const name = value.icon;
        const { [name]: component } = require('@element-plus/icons-vue');
        // eslint-disable-next-line no-return-assign
        return value.icon = component;
      });
      this.authRoutes.push(...data);
    }
  }
};
