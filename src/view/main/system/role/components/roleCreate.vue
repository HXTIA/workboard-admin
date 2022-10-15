<template>
  <div class="roleCreate-wrapper">
    <el-form
      :rules="rules"
      ref="loginForm"
      :model="form"
      label-width="120px"
      class="roleCreate-wrapper-form"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="角色介绍" prop="intro">
        <el-input v-model="form.intro" />
      </el-form-item>
      <el-form-item label="权限分配" prop="resource">
        <el-cascader
          :options="options"
          v-model="form.resource"
          :props="{ multiple: true }"
          collapse-tags
          clearable
          @change="getNode"
          placeholder="权限分配"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          v-permission="{ action: 'create', effect: 'disabled' }"
          @click="onSubmit"
          >创建角色</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { options } from '../options.js';
import { postCreateRole } from '../api';

const emits = defineEmits(['refresh']);

const form = reactive({
  name: '',
  intro: ''
});

// eslint-disable-next-line no-unused-vars
let assignIds;

// 选择后取到对应的列表
const getNode = (data) => {
  assignIds = JSON.parse(JSON.stringify(data));
};

const loginForm = ref(null);
const onSubmit = async () => {
  loginForm.value.validate(async (valid) => {
    if (valid) {
      const res = await postCreateRole(form, assignIds);
      console.log(res);
      if (res) {
        emits('refresh');
      }
    } else {
      ElMessage.error('请检查输入');
    }
  });
};

// 表单校验规则
const rules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  intro: [{ message: '请输入用户名', trigger: 'blur' }],
  resource: [{ required: true, message: '请分配权限', trigger: 'blur' }]
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
