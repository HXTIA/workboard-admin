import request from '@/services';
import 'element-plus/es/components/message/style/css';
import { ElMessage } from 'element-plus';
import userStore from '@/store/user';
// import orgStore from '@/store/organization';
const userstore = userStore();
// const orgstore = orgStore();

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

  // 请求失败 -> 返回false
  if (res.code !== 1) return { ok: false };

  // 存储token
  await userstore.setToken(res.data.token);

  // 存储登录时 的用户信息
  await userstore.setUserInfo(res.data);

  // 通过id发起所有信息请求 -> 返回值为Boolean -> 是否完善信息
  const allInfo = await getUserInfo({ id: res.data.id });

  return { ok: true, isComplete: allInfo };
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

// 获取用户信息
export const getUserInfo = async({ id }) => {
  const { code, data } = await request({
    url: `/admin/users/${id}`,
    method: 'GET',
  });
  // 解构
  const { roles } = data;

  // 存储角色信息
  userstore.setRoles(roles);

  // 提示组织信息
  if (code === 1 && !data.orgVo) {
    ElMessage.error({
      message: '先补充你的组织信息吧！'
    });
    return false;
  }

  return code === 1;
};
