<template>
  <div @click="sendReq">关于我们</div>
</template>

<script setup>
import request from 'request';
import userStore from 'store/user';

const sendReq = async () => {
  const store = userStore();
  console.log(store.getName);
  const res = await request({
    param: {
      name: 'SG'
    },
    method: 'GET',
    url: 'getMessage'
  });
  console.log(res);
};

</script>

<style scoped>

</style>
