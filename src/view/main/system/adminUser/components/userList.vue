<template>
  <div class="roleList-wrapper">
    <el-table
      :data="filterTableData"
      style="width: 100%"
      height="400"
      :stripe="true"
    >
      <el-table-column label="Id" prop="id" />
      <el-table-column label="角色" prop="name" />
      <el-table-column label="描述" prop="intro" />
      <el-table-column align="right" fixed="right">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="Type to search"
          />
        </template>
        <template #default="scope">
          <el-button
            size="small"
            v-permission="{ action: 'update', effect: 'disabled' }"
            :disabled="scope.row.id === 1"
            @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            v-permission="{ action: 'delete', effect: 'disabled' }"
            :disabled="scope.row.id === 1"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <roleEdit :data="data"></roleEdit>
  </div>
</template>

<script setup>
import roleEdit from '@/view/main/system/role/components/roleEdit';

import { postRemoveRole } from '../api';

const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  }
});
const emits = defineEmits(['refresh']);

const search = ref('');
const filterTableData = computed(() =>
  props.tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const data = reactive({
  isShowDialog: false,
  roleData: {}
});

const handleEdit = (index, row) => {
  // 编辑管理员
  data.isShowDialog = !data.isShowDialog;
  data.roleData = row;
};

const handleDelete = async (index, row) => {
  // 删除管理员
  const res = await postRemoveRole(row.id);
  if (res) {
    emits('refresh');
  }
};
</script>

<style lang="scss" scoped>
.roleList-wrapper {
  height: 100%;
}
</style>
