import request from '@/services';
import 'element-plus/es/components/message/style/css';
// import { ElMessage } from 'element-plus';

export const loginReq = async ({ username, password, captcha }) => {
  const res = await request({
    url: '/admin/users/login',
    method: 'POST',
    data: {
      password,
      username,
      captcha,
    },
  });
  if (Number(res.code) !== 1) {
    ElMessage.success({
      message: res.msg + ' login failed,  login again',
    });
    return false;
  }
  ElMessage.success({
    message: '登录成功！',
  });
  return res.data;
};
