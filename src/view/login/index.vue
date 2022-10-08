<template>
  <div class="login-wrapper">
    <div class="login-wrapper-img">
      <el-image :src="require('../../assets/hx.jpg')" fit="fill" />
    </div>
    <div class="login-wrapper-container">
      <div class="login-wrapper-container-title">Sign in to WorkBoard</div>
      <div class="login-wrapper-container-form">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginData"
          label-width="0px"
          label-position="top"
          :hide-required-asterisk="true">
          <el-form-item prop="username" label="Email">
            <el-input v-model="loginForm.username" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="Password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <div class="login-wrapper-container-form-link">
            <el-link href="#" type="primary">忘记密码</el-link>
          </div>
          <el-form-item prop="captcha" label="验证码">
            <el-input v-model="loginForm.captcha" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <div id="abc">
            <!--<img src="http://119.29.157.231:8888/admin/users/captcha"-->
            <!--     onclick="javascript:this.src=this.src+'?'+Math.random()" />-->

            <!--问题代码在此-->
            <button @click="getCode">获取图形码</button>
            <img :src="img" alt="">

            <!--<el-image style="width: 100px; height: 100px" :src="captchaUrl" fit="fill" />-->
          </div>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import userStore from '@/store/user';
import router from '@/router';

import { reactive, ref } from 'vue';
import { loginReq } from './api';

// const captchaUrl = ref('http://119.29.157.231:8888/admin/users/captcha?1'); // 验证码地址

// 问题代码在此
const img = ref(''); // 验证码图片
const getCode = async () => {
  let i = 0;
  i++;
  img.value = `http://119.29.157.231:8888/admin/users/captcha?${i}`;
};

const store = userStore();
const login = async () => {
  const res = await loginReq({
    username: loginForm.username,
    password: loginForm.password,
    captcha: loginForm.captcha,
  });
  // 请求失败
  if (!res) return;
  // 存储token -> 要存储个人信息 -> 所以token先做临时
  store.setUserInfo(res.token);
  console.log(router.getRoutes());
  router.push({ path: '/', replace: true });
};

const loginForm = reactive({
  username: '',
  password: '',
  captcha: '',
});

const rules = reactive({
  username: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    // { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ],
});
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 100%;
  height: 100%;

  &-img {
    width: 100%;
    height: 100%;
    text-align: center;

    .el-image {
      width: 100px;
      height: 100px;
    }
  }

  &-container {
    width: 100%;
    height: 100%;

    &-title {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }

    &-form {
      width: 300px;
      margin: 0 auto;
      padding: 16px;
      background-color: #f6f8fa;
      border: #d5dbe2 solid 1px;
      border-radius: 6px;

      &-link {
        text-align: right;
        margin-bottom: 16px;
      }

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
