<template>
  <div class="breadCrumb-wrapper">
    <!-- <span v-for="item in router.currentRoute.value.matched" :key="item.path"
      >{{ item.name }} /</span
    > -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in matched" :key="item.name">{{
        item.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import router from '@/router';
const matched = reactive([]);
watchEffect(() => {
  matched.splice(0, matched.length, ...router.currentRoute.value.matched);
});
</script>

<style lang="scss" scoped></style>
