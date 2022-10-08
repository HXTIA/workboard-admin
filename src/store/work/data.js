export default {
  state: () => ({
    worklist: []
  }),
  getters: {
    getWorklist: (state) => state.worklist || [],
  }
};
