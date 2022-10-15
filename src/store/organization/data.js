
export default {
  state: () => ({
    orgInfo: {}
  }),
  getters: {
    getOrgInfo: (state) => state.orgInfo || {},
  }
};
