<template>
  <div class="roleEdit-wrapper">
    <el-dialog
      v-model="isShowDialog"
      title="编辑权限"
      width="60vw"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        label-width="120px"
        class="roleCreate-wrapper-form"
      >
        <el-form-item label="角色名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="角色介绍">
          <el-input v-model="form.intro" />
        </el-form-item>
        <el-form-item label="权限分配">
          <el-cascader
            :options="options"
            :props="{ multiple: true }"
            v-model="form.resource"
            collapse-tags
            clearable
            @change="getNode"
            placeholder="权限分配"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            v-permission="{ action: 'update', effect: 'disabled' }"
            @click="onSubmit"
            >修改角色</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { getSearchMenu, postUpdateRole } from '../api';
import { options } from '../options.js';

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
});

const { isShowDialog } = toRefs(props.data);

const form = reactive({});
// 监视props的数据变化
watchEffect(async () => {
  const data = props.data.roleData;
  if (!data.id) return {};
  // 有数据了
  const { id } = data;
  const res = await getSearchMenu(id);

  // 分配数据
  Object.assign(form, data);
  form.resource = res;
});

// eslint-disable-next-line no-unused-vars
let assignIds;

const getNode = (data) => {
  assignIds = JSON.parse(JSON.stringify(data));
};

const onSubmit = async () => {
  if (!form.name.length) return;

  const res = await postUpdateRole(form, assignIds || form.resource);
  if (res) {
    isShowDialog.value = false;
  }
};
</script>
