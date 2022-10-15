<template>
  <div class="role-wrapper">
    <div class="role-wrapper-top">
      <roleCreate @refresh="refreshData"></roleCreate>
    </div>
    <div class="role-wrapper-bottom">
      <roleList :tableData="rolelist" @refresh="refreshData"></roleList>
    </div>
  </div>
</template>

<script setup>
import roleCreate from '@/view/main/system/role/components/roleCreate';
import roleList from '@/view/main/system/role/components/roleList';

import { getRoleList } from './api';

// 角色列表
const rolelist = reactive([]);

// 获取最新角色信息
const refreshData = async () => {
  rolelist.splice(0, rolelist.length, ...(await getRoleList()));
};

// 初始化挂载请求数据
onMounted(() => {
  refreshData();
});
</script>

<style lang="scss" scoped>
.role-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  &-top {
    height: 40%;
    width: 100%;
  }

  &-bottom {
    height: 60%;
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 3px;
      background-color: rgb(205, 203, 203);
    }
  }
}
</style>
