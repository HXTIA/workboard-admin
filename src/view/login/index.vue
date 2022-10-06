<template>
  <div class="login-wrapper">
    <button @click="login">登录</button>
  </div>
</template>

<script setup>
import userStore from '@/store/user';
import router from '@/router';

const store = userStore();
const login = () => {
  store.setUserInfo();
  router.push({ name: 'workitem' });
};
</script>

<style lang="scss" scoped></style>
