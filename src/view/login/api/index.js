import request from '@/services';
import 'element-plus/es/components/message/style/css';
import { ElMessage } from 'element-plus';

// 登录
export const loginReq = async ({ username, password, captcha, verifyKey }) => {
  const res = await request({
    url: '/admin/users/login',
    method: 'POST',
    data: {
      username,
      password,
      captcha,
      verifyKey,
    },
  });

  if (Number(res.code) !== 1) {
    ElMessage.error({
      message: res.msg,
    });
    return false;
  }

  ElMessage.success({
    message: '登录成功！'
  });
  return res.data;
};

// 获取图片验证码
export const getCaptcha = async () => {
  const res = await request({
    url: '/admin/users/captcha',
    method: 'GET',
  });
  return res;
};

// 发送邮箱验证码
export const sendEmail = async (email) => {
  const res = await request({
    url: `/admin/users/sendEmail?email=${email}`,
    method: 'GET',
  });
  if (Number(res.code) !== 1) {
    ElMessage.error({
      message: res.msg,
    });
    return false;
  }
  ElMessage.success({
    message: res.msg,
  });
  return res;
};

// 注册
export const registerReq = async ({ email, password, code }) => {
  const res = await request({
    url: '/admin/users/register',
    method: 'POST',
    data: {
      code,
      email,
      password,
    },
  });
  if (Number(res.code) !== 1) {
    ElMessage.error({
      message: res.msg,
    });
    return false;
  }
  ElMessage.success({
    message: '注册成功！',
  });
  return res;
};
