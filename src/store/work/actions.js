export default {
  actions: {
    setWorklist(data) {
      this.clearWorklist();
      this.worklist.push(...data);
    },
    clearWorklist() {
      const length = this.worklist.length;
      this.worklist.splice(0, length);
    }
  }
};
