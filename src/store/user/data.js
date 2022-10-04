export default {
  state() {
    return {
      authRoutes: [],
    };
  },
  getters: {
    getRoutes: (state) => state.authRoutes || [],
  }
};
