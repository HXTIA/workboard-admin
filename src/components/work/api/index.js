import userStore from '@/store/user';
// import workStore from '@/store/work';

// import { worklist } from '@/data/work.js';
import { copy } from '@/utils/shared/dash.js';

// import request from '@/services';

// 作业管理界面的功能权限
const WORK_CENTER = 13;

// 返回具有的功能权限
export const getAuthPermission = () => {
  const store = userStore();
  const [authPermission] = copy(store.getAuthPermission).filter((value) => value[0].parentId === WORK_CENTER);
  authPermission[1].map((value) => {
    const event = value.permission.split(':')[1];
    value.event = event;
    return value;
  });
  return authPermission[1];
};

// 请求数据
export const getWorklist = async () => {
  // const store = workStore();
  // await request
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     store.setWorklist(worklist);

  //     resolve(store.getWorklist);
  //   }, 2000);
  // });
};
