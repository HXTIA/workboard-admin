export default {
  state() {
    return {
      name: 'SG'
    };
  },
  getters: {
    getName: (state) => state.name || undefined,
  }
};
