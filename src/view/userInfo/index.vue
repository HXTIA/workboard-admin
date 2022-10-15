<template>
  <div class="userInfo-wrapper">
    <button @click="clearLogout">清空登录态</button>
  </div>
</template>

<script setup>
import router from '@/router';
const clearLogout = () => {
  localStorage.clear();
  router.push('/');
};
onMounted(() => {
  console.log('我挂在了');
});
onActivated(() => {
  console.log('我缓存了');
});
</script>

<style lang="scss" scoped>
.userInfo-wrapper {
}
</style>
