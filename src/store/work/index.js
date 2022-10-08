import { defineStore } from 'pinia';

// 自动导入同目录下所有js文件进行创建
const context = require.context('./', false, /\\*.js/);
const store = {};
const options = [];

context.keys().forEach(k => {
  options.push(context(k));
});

options.map((value) => {
  return Object.assign(store, value.default);
});

export default defineStore('workStore', store);
