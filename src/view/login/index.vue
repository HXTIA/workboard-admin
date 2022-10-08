<template>
  <div class="login-wrapper">
    <button @click="login">登录</button>
    <button @click="getCode">获取图形码</button>
    <input type="text" v-model="captcha" />
    <img :src="img" />
  </div>
</template>

<script setup>
import userStore from '@/store/user';
import router from '@/router';
import { loginReq } from './api';

// eslint-disable-next-line prefer-const
let captcha = ref();
const img = ref('');

const store = userStore();

const login = async () => {
  console.log(captcha.value);
  const res = await loginReq({
    username: 'sg@qq.com',
    password: '1',
    captcha: captcha.value
  });
  // 请求失败
  if (!res) return;
  // 存储token -> 要存储个人信息 -> 所以token先做临时
  store.setUserInfo(res.token);
  router.push({ path: '/', replace: true });
};

let i = 0;
const getCode = () => {
  img.value = `http://119.29.157.231:8888/admin/users/captcha?${i++}`;
};
</script>

<style lang="scss" scoped></style>
