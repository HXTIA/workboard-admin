<template>
  <div class="roleCreate-wrapper">
    <el-form
      :rules="rules"
      :model="form"
      label-width="120px"
      ref="loginForm"
      class="roleCreate-wrapper-form"
    >
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="分配角色" prop="roleIds">
        <el-select v-model="form.roleIds" placeholder="分配角色">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          v-permission="{ action: 'create', effect: 'disabled' }"
          @click="onSubmit"
          >创建用户</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getRoleList, postCreateUser } from '../api';

// const emits = defineEmits(['refresh']);

const form = reactive({
  nickname: '',
  password: '',
  roleIds: '',
  username: ''
});

const roleList = reactive([]);
// 获取角色列表
getRoleList().then((res) => {
  roleList.push(...res);
});

const loginForm = ref(null);
// 提交
const onSubmit = async () => {
  loginForm.value.validate(async (valid) => {
    if (valid) {
      const res = await postCreateUser(form);
      console.log(res);
      // if (res) {
      //   emits('refresh');
      // }
    } else {
      ElMessage.error('请检查输入');
    }
  });
};

// 表单校验规则
const rules = {
  nickname: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  roleIds: [{ required: true, message: '请选择角色', trigger: 'blur' }]
};
</script>

<style lang="scss" scoped>
.roleCreate-wrapper {
  width: 100%;
  height: 100%;

  &-form {
    width: 50%;
  }
}
</style>
