<template>
  <div class="role-wrapper">
    <div class="role-wrapper-top">
      <userCreate @refresh="refreshData"></userCreate>
    </div>
    <div class="role-wrapper-bottom">
      <userList :tableData="rolelist" @refresh="refreshData"></userList>
    </div>
  </div>
</template>

<script setup>
import userList from '@/view/main/system/adminUser/components/userList';
import userCreate from '@/view/main/system/adminUser/components/userCreate';
// import { getRoleList } from './api';

// 角色列表
const rolelist = reactive([]);

// 获取最新角色信息
const refreshData = async () => {
  // rolelist.splice(0, rolelist.length, ...(await getRoleList()));
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
