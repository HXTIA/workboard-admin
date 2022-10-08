<template>
  <div class="work-wrapper-header">
    <!--搜索-->
    <el-input
      v-model="query"
      placeholder="请输入内容"
      size="large"
      :maxlength="30"
      :clearable="true"
      class="work-wrapper-header-search"
    >
      <template #append>
        <el-button @click="search" @keydown.enter="search">搜索</el-button>
      </template>
    </el-input>
    <el-button
      v-if="permisssonList.length"
      type="primary"
      size="large"
      @click="filter"
      >筛选</el-button
    >
    <el-button
      v-if="permisssonList.length"
      type="primary"
      size="large"
      @click="create"
      >添加作业</el-button
    >
  </div>
</template>

<script setup>
import { getAuthPermission } from '../api';
import { copy } from '@/utils/shared/dash.js';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

// 缓存作业列表
const cacheData = copy(props.data);

// 控制关闭模态框
const changeIsShowDialog = inject('changeIsShowDialog');

// 取出在header应该存在的功能 -> 添加作业
const permisssonList = getAuthPermission().filter((value) => value.id === 38);

// 查询字符串
// eslint-disable-next-line prefer-const
let query = ref('');

// 搜做
const search = () => {
  console.log('搜索', cacheData);
};

// 菜单栏的添加按钮
const create = () => {
  changeIsShowDialog(true);
};

// 筛选
const filter = () => {
  console.log('filter');
};
</script>

<style lang="scss" scoped>
.work-wrapper-header {
  display: flex;
  justify-content: flex-start;
  height: 60px;
  align-items: center;
  border-bottom: 1px solid #ebeef5;

  &-search {
    width: 50%;
    margin-right: 40px;
  }

  &-screen_btn {
    margin-right: 40px;
  }
}
</style>
