<template>
  <div class="register-wrapper">
    <div class="register-wrapper-form">
      <el-form
        :model="registerData"
        :rules="rules"
        ref="registerForm"
        label-position="top"
        :hide-required-asterisk="true">
        <el-form-item prop="email" label="用户名">
          <el-input v-model="registerData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="registerData.password" placeholder="密码长度在 6 到 12 个字符" type="password" />
        </el-form-item>
        <el-form-item prop="checkPassword" label="确认密码">
          <el-input v-model="registerData.checkPassword" placeholder="请再次输入密码" type="password" />
        </el-form-item>
        <el-form-item prop="code" label="验证码" class="register-wrapper-form-code">
          <el-input v-model="registerData.code" placeholder="请输入验证码" />
          <el-button link type="primary" @click="getCode" :disabled="codeBtn.disabled">
            <el-icon>
              <Position />
            </el-icon>
            {{ codeBtn.text }}
          </el-button>
        </el-form-item>
        <el-button type="primary" @click="register" class="register-wrapper-form-registerBtn">注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { registerReq, sendEmail } from '@/view/login/api';
import { Position } from '@element-plus/icons-vue';
import Md5 from 'js-md5';

const emits = defineEmits(['registerSuccess']);
// 注册数据
const register = async () => {
  registerForm.value.validate(async (valid) => {
    if (valid) {
      password.value = Md5(registerData.password);
      const res = await registerReq({
        email: registerData.email,
        password: password.value,
        code: registerData.code,
      });
      // 请求失败
      if (!res) return;
      // 注册成功跳转登录并传入注册成功的邮箱和密码
      emits('registerSuccess', registerData.email, registerData.password);
    } else {
      ElMessage.error('请检查输入');
      return false;
    }
  });
};

// 加密后的密码
const password = ref('');

const registerData = reactive({
  email: '',
  password: '',
  checkPassword: '',
  code: '',
});
const registerForm = ref(null);

// 发送验证按钮状态
const codeBtn = reactive({
  disabled: false,
  text: '发送验证码',
});

// 发送邮件验证码
const getCode = () => {
  registerForm.value.validateField('email', async (valid) => {
    if (valid) {
      const res = await sendEmail(registerData.email);
      // 请求失败
      if (!res) return;
      // 发送验证码后60s内不可再次发送
      codeBtn.disabled = true;
      codeBtn.text = '60s后可再次发送';
      let time = 60;
      const timer = setInterval(() => {
        time--;
        codeBtn.text = time + 's后可再次发送';
        if (time === 0) {
          clearInterval(timer);
          codeBtn.disabled = false;
          codeBtn.text = '发送验证码';
        }
      }, 1000);
    } else {
      ElMessage.error('请输入邮箱');
      return false;
    }
  });
};

const validateSurePassword = (rule, value, callback) => {
  if (value !== registerData.password) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};
const rules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ],
  checkPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validateSurePassword, trigger: 'change' },
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'change' }],
});
</script>

<style lang="scss" scoped>
.register-wrapper {
  width: 100%;
  height: 100%;

  &-form {
    width: 330px;
    margin: 0 auto;
    padding: 16px;
    background-color: #f6f8fa;
    border: #d5dbe2 solid 1px;
    border-radius: 6px;

    &-code {
      .el-input {
        width: 50%;
      }
    }

    &-forgetBtn {
      text-align: right;
      margin-bottom: 16px;
    }

    &-registerBtn {
      width: 100%;
    }
  }
}
</style>
