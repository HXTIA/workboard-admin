<template>
  <div class="loginMain-wrapper">
    <div class="loginMain-wrapper-container">
      <div class="loginMain-wrapper-container-left">
        <div class="loginMain-wrapper-container-left-img">
          <el-image :src="require('@/assets/hx.jpg')" fit="fill" />
        </div>
        <h2>欢迎使用</h2>
        <h2>华信作业板管理端</h2>
      </div>
      <div class="loginMain-wrapper-container-right">
        <el-tabs v-model="tagIndex" :stretch="true" @tab-change="checkView(tagIndex)">
          <el-tab-pane label="登录" name="0" />
          <el-tab-pane label="注册" name="1" />
        </el-tabs>
        <component :is="loginView.component" @registerSuccess="registerSuccess"
                   :registerSuccessData="registerSuccessData">
        </component>
      </div>
    </div>
  </div>
</template>

<script setup>
import login from './components/login.vue';
import register from './components/register.vue';
import { reactive, ref } from 'vue';

// 页面列表
const loginList = reactive([
  {
    name: 'login',
    component: markRaw(login),
  },
  {
    name: 'register',
    component: markRaw(register),
  },
]);
const tagIndex = ref('0');
// 当前页面
const loginView = reactive({
  component: loginList[0].component,
});

// 切换页面
const checkView = (index) => {
  loginView.component = loginList[index].component;
};
// 注册成功返回的登录数据
const registerSuccessData = reactive({
  username: '',
  password: '',
});
// 注册成功后跳转到登录页面
const registerSuccess = (username, password) => {
  tagIndex.value = '0';
  checkView(0);
  registerSuccessData.username = username;
  registerSuccessData.password = password;
};
</script>

<style lang="scss" scoped>
.loginMain-wrapper {
  min-width: 100vh;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #F7D1D7, #BFE3F1);

  &-container {
    width: 900px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #fff;
    box-shadow: 2px 1px 19px #0000001a;
    padding: 20px;

    &-left {
      width: 50%;
      height: 100%;
      text-align: center;

      &-img {
        width: 100%;
        height: 100%;

        .el-image {
          width: 130px;
          height: 130px;
          border-radius: 50%;
        }
      }

    }

    &-right {
      width: 50%;
      height: 100%;
    }
  }
}
</style>
