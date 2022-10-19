import workStore from '@/store/work';

import { copy } from '@/utils/shared/dash.js';
import request from '@/services';
// import { createFormData } from '@/utils/shared/request.js';
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
