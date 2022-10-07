import userStore from '@/store/user';
import { flatten } from '@/utils/shared/array.js';
// import request from '@/services';
const store = userStore();

// const WORK_
export const a = () => {
  const routes = JSON.parse(JSON.stringify(store.getRoutes));
  const res = flatten(routes);
  console.log(res);
  console.log(store.getRoutes);
};
