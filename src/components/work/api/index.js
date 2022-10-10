import userStore from '@/store/user';
import workStore from '@/store/work';

// import { worklist } from '@/data/work.js';
import { copy } from '@/utils/shared/dash.js';
import request from '@/services';
const workstore = workStore();

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

// 请求作业数据
export const postGetWorklist = async () => {
  // await request
  const res = await request({
    url: '/admin/works/searchPageList',
    method: 'POST',
    data: {}
  });

  // 拆分图片uri地址
  // 为每个uri拼接服务器跟地址
  res.data.forEach((value) => {
    // 未空则为没有图片
    if (value.pictures === '') {
      value.pictures = [];
      return;
    };
    // 分割数组
    value.pictures = value.pictures.split(',');
  });
  workstore.setWorklist(res.data);
};

// 根据id查询详细数据
export const getDataByID = async (workId) => {
  return await request({
    url: '/admin/works/searchOne',
    method: 'GET',
    params: {
      workId
    }
  });
};

// 发起新建作业请求
export const postCreateWork = async (form) => {
  const formData = createFormData(form);

  await request({
    url: '/admin/works/create',
    method: 'POST',
    header: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  });
};

// 发起编辑作业请求
export const postEditWork = async (form, matchMap) => {
  // 首先要判断图片是否被更改 -> 判断map是否存在值为1
  // 被更改 -> 先发起多图片编辑接口
  let flag = false;
  matchMap.forEach((value) => {
    if (value) {
      flag = true;
    }
  });
  if (flag) {
    // 图片被编辑
    // 取出对标数组
    const matchIndex = Array.from(matchMap, (value) => value[1]);
    // 原图片url数组 -> 从store中取出
    const pictures = workstore.getWorklist.filter((value) => value.id === form.id)[0].pictures;
    // 新图片数据
    const picturesFiles = form.pictureFiles;
    console.log(picturesFiles);
    // 临时form对象
    const tempForm = {
      id: form.id,
      matchIndex,
      pictures: pictures[0],
      picturesFiles
    };

    // 构造formdata对象发起多图片编辑请求
    const formData = createFormData(tempForm);

    const res = await request({
      url: '/admin/works/editPictureUpload',
      method: 'POST',
      data: formData
    });
    console.log(res);
  } else {
    const formData = createFormData(form);
    await request({
      url: '/admin/works/update',
      method: 'POST',
      data: formData
    });
  }
};

// 删除作业
export const postDeleteWork = async (id) => {
  const formData = new FormData();
  formData.append('ids', id);

  await request({
    url: '/admin/works/remove',
    method: 'POST',
    data: formData
  });
};

// 构造新建和编辑的formdata
function createFormData(form) {
  const formData = new FormData();
  Object.keys(form).forEach((key) => {
    const value = form[key];
    if (key === 'pictureFiles') {
      for (let i = 0; i < value.length; i++) {
        formData.append('pictureFiles', value[i]);
      }
    } else {
      console.log(value);
      formData.append(key, value);
    }
  });
  return formData;
}
