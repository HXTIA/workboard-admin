<template>
  <div class="login-wrapper">
    <div class="login-wrapper-form">
      <el-form
        :model="loginData"
        :rules="rules"
        ref="loginForm"
        label-position="top"
        :hide-required-asterisk="true">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="loginData.username" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="loginData.password" placeholder="请输入密码" type="password" />
        </el-form-item>
        <el-form-item prop="captcha" label="验证码" class="login-wrapper-form-captcha">
          <el-input v-model="loginData.captcha" placeholder="请输入验证码" />
          <el-button link type="primary" @click="getCode">
            <el-icon>
              <Refresh />
            </el-icon>
            刷新验证码
          </el-button>
          <el-image :src="base64image" fit="fill" />
        </el-form-item>
        <el-button type="primary" @click="login" class="login-wrapper-form-loginBtn">登录</el-button>
        <div class="login-wrapper-form-forgetBtn">
          <el-button link type="primary">忘记密码</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import userStore from '@/store/user';
import router from '@/router';

import { defineProps, reactive, ref } from 'vue';
import { getCaptcha, loginReq } from '@/view/login/api';
import { Refresh } from '@element-plus/icons-vue';
import Md5 from 'js-md5';

const store = userStore();

// 加密后的密码
const password = ref('');
const login = async () => {
  loginForm.value.validate(async (valid) => {
    if (valid) {
      password.value = Md5(loginData.password);
      const res = await loginReq({
        username: loginData.username,
        password: password.value,
        captcha: loginData.captcha,
        verifyKey: loginData.verifyKey,
      });
      // 请求失败
      if (!res) return;
      // 存储token -> 要存储个人信息 -> 所以token先做临时
      store.setUserInfo(res.token);
      console.log(router.getRoutes());
      router.push({ path: '/', replace: true });
    } else {
      ElMessage.error('请检查输入');
      return false;
    }
  });
};

const loginData = reactive({
  username: '',
  password: '',
  captcha: '',
  verifyKey: '',
});
const loginForm = ref(null);

const base64image = ref(''); // 验证码图片
// 获取验证码
const getCode = () => {
  getCaptcha().then((res) => {
    loginData.verifyKey = res.verifyKey;
    base64image.value = res.base64image;
  });
};
getCode();

// 注册成功后自动输入用户名和密码
const props = defineProps({
  registerSuccessData: {
    type: Object,
    default: () => {
    },
  },
});
loginData.username = JSON.parse(JSON.stringify(props.registerSuccessData.username));
loginData.password = JSON.parse(JSON.stringify(props.registerSuccessData.password));

const rules = reactive({
  username: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    // { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
});
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 100%;
  height: 100%;

  &-form {
    width: 330px;
    margin: 0 auto;
    padding: 16px;
    background-color: #f6f8fa;
    border: #d5dbe2 solid 1px;
    border-radius: 6px;

    &-captcha {
      .el-input {
        width: 50%;
      }
    }

    &-forgetBtn {
      text-align: right;
      margin-bottom: 16px;
    }

    &-loginBtn {
      width: 100%;
    }
  }
}
</style>
