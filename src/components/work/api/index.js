import workStore from '@/store/work';
import { toRaw } from 'vue';

import { copy } from '@/utils/shared/dash.js';
import request from '@/services';
import { createFormData } from '@/utils/shared/request.js';
const workstore = workStore();

// 请求作业数据
export const postGetWorklist = async () => {
  const res = await request({
    url: '/admin/works/searchPageList',
    method: 'POST',
    data: {}
  });

  const result = slpitPictures(res.data);

  // 存储作业列表
  workstore.setWorklist({ data: result, count: res.count });
};

// 根据id查询详细数据
export const getDataByID = async (workId) => {
  if (!workId) return;

  const res = await request({
    url: '/admin/works/searchOne',
    method: 'GET',
    params: {
      workId
    }
  });

  const result = slpitPictures(res.data)[0];

  return result;
};

// 发起新建作业请求
export const postCreateWork = async (form) => {
  const formData = createFormData(form);

  await request({
    url: '/admin/works/create',
    method: 'POST',
    data: formData
  });

  postGetWorklist();
};

// 发起编辑作业请求
export const postEditWork = async (form, matchMap) => {
  // 首先要判断图片是否被更改 -> 判断map是否存在值为1
  // 被更改 -> 先发起多图片编辑接口
  let flag = false;

  // 如果图片被删除了
  matchMap.forEach((value) => {
    if (value) {
      flag = true;
    }
  });

  if (form.pictureFiles.length > 0) {
    flag = true;
  }

  if (flag) {
    // 图片被删除
    // 取出对标数组
    const matchIndex = Array.from(matchMap, (value) => value[1]);
    // 原图片url数组 -> 从store中取出
    const pictures = workstore.getWorklist.filter((value) => value.id === form.id)[0].pictures;
    // 新图片数据
    const picturesFiles = form.pictureFiles;

    // 临时form对象
    const tempForm = {
      id: form.id,
      matchIndex,
      pictures: copy(pictures).join(','),
      picturesFiles: toRaw(picturesFiles)
    };

    // 构造formdata对象发起多图片编辑请求
    const formData = createFormData(tempForm);

    const res = await request({
      url: '/admin/works/editPictureUpload',
      method: 'POST',
      data: formData
    });
    console.log(res);
  }

  // 无论图片有没有被删除，都要发起编辑作业接口
  const { title, courseId, detail, deadline, semesterId, id } = form;
  const res = await request({
    url: '/admin/works/update',
    method: 'POST',
    data: {
      title,
      courseId,
      detail,
      deadline,
      semesterId,
      id
    }
  });
  console.log(res);
  if (res.code === 1) {
    postGetWorklist();
  }
};

// 删除作业
export const postDeleteWork = async (id) => {
  const formData = new FormData();
  formData.append('ids', id);

  const res = await request({
    url: '/admin/works/remove',
    method: 'POST',
    data: formData
  });

  if (res.code === 1) {
    postGetWorklist();
  }
};

// 处理响应值 -> 照片拆分
function slpitPictures(res) {
  let data = copy(res);
  if (!Array.isArray(data)) {
    data = [data];
  }
  data.forEach((value) => {
    // 未空则为没有图片
    if (value.pictures === '') {
      value.pictures = [];
    } else {
      value.pictures = value.pictures.split(',');
    }
  });

  return data;
}
