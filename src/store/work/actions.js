export default {
  actions: {
    setWorklist({ data, count }) {
      this.clearWorklist();
      data.reverse();
      this.worklist.push(...data);
      this.count = count;
    },
    clearWorklist() {
      const length = this.worklist.length;
      this.worklist.splice(0, length);
    }
  }
};
