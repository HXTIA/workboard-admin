<template>
  <div class="organization-wrapper">
    <input type="file" @change="change"/>
  </div>
</template>

<script setup>
import request from '@/services';
const change = async (e) => {
  const file = e.target.files[0];
  const formdata = new FormData();
  formdata.append('id', '33');
  formdata.append('name', 'file');
  formdata.append('backgroundFile', file);
  console.log(file);
  const res = await request({
    url: '/admin/organizations/update',
    method: 'POST',
    data: {
      id: 33,
      name: '第33组织',
      // backgroundFile: file
    }
    // data: formdata
  });
  console.log(res);
};
</script>

<style lang="scss" scoped>
.organization-wrapper {
}
</style>
