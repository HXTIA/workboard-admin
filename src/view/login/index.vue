<template>
  <div class="login-wrapper">
    <button @click="login">登录</button>
  </div>
</template>

<script setup>
import userStore from '@/store/user';
import router from '@/router';
import { loginReq } from './api';

const store = userStore();
const login = async () => {
  const res = await loginReq({ username: 'sg@qq.com', password: '1' });
  // 请求失败
  if (!res) return;
  // 存储token -> 要存储个人信息 -> 所以token先做临时
  store.setUserInfo(res.token);
  console.log(router.getRoutes());
  router.push({ path: '/', replace: true });
};
</script>

<style lang="scss" scoped></style>
