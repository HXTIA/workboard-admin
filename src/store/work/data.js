export default {
  state: () => ({
    worklist: [],
    count: 1
  }),
  getters: {
    getWorklist: (state) => state.worklist || [],
    getCount: (state) => state.count || 1,
  }
};
