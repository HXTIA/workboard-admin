<script setup>
// import { ElMessage, ElMessageBox } from 'element-plus';
// import getSystemTime from '@/utils/WorkList/getSystemTime';
// import { reactive, ref, nextTick } from 'vue';
// import { rules, workList } from '@/data/work.js';

import { reactive, ref } from 'vue';
import { workList } from '@/data/work.js';

import {
  Search,
  Filter,
  CirclePlus
  // EditPen,
  // Delete
} from '@element-plus/icons-vue';
import workDesc from './components/workDesc.vue';
import workEdit from './components/workEdit.vue';

// 搜索内容
// eslint-disable-next-line prefer-const
let query = ref('');

// eslint-disable-next-line prefer-const
let isShowDialog = ref(false);
const changeIsShowDialog = () => {
  isShowDialog.value = false;
};

// 菜单栏的添加按钮
const addBtn = () => {
  // TODO: 是在子组件发送请求还是在此处发起请求
  // 目前趋向于子组件请求 -> 通过父组件传递标识进行判断
  isShowDialog.value = true;
};

// 作业详情 -> 默认第一个被展示，深拷贝防止引用类型修改
const workDetails = reactive(JSON.parse(JSON.stringify(workList[0])));

// 点击作业列表
const clickWorkList = (id, data) => {
  // 更换显示的作业item
  Object.assign(workDetails, data);
};
</script>

<template>
  <div>
    <div class="work-wrapper">
      <!--菜单栏-->
      <el-header class="work-wrapper-header">
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
            <el-button :icon="Search">搜索</el-button>
          </template>
        </el-input>
        <!--筛选与添加按钮-->
        <el-button
          type="primary"
          :icon="Filter"
          size="large"
          class="work-wrapper-header-screen_btn"
          >筛选</el-button
        >
        <el-button
          type="primary"
          :icon="CirclePlus"
          size="large"
          @click="addBtn"
          >添加</el-button
        >
      </el-header>

      <el-container class="work-wrapper-main">
        <!--左侧-->
        <div class="work-wrapper-main-worklist">
          <el-timeline>
            <el-scrollbar class="work-wrapper-main-worklist-scrollbar">
              <WorkList
                v-for="item in workList"
                :key="item.id"
                :workList="item"
                @clickWork="clickWorkList"
              ></WorkList>
            </el-scrollbar>
          </el-timeline>
        </div>

        <!--右侧-->
        <div class="work-wrapper-main-workdesc">
          <div>
            <!--编辑与删除按钮-->
            <workDesc :data="workDetails"></workDesc>
          </div>
        </div>
      </el-container>
      <workEdit
        :data="{}"
        :isShowDialog="isShowDialog"
        @changeIsShowDialog="changeIsShowDialog"
        :isCreate="true"
      ></workEdit>
    </div>
  </div>
</template>

<style scoped lang="scss">
.work-wrapper {
  width: 100%;
  height: 100%;

  /* 菜单栏 */
  &-header {
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

  &-main {
    display: flex;
    justify-content: flex-start;
    &-worklist {
      width: 50%;
      height: 100%;
      padding: 20px 0;
      border-right: 1px solid #ebeef5;

      &-scrollbar {
        height: 75vh;
      }
    }

    &-workdesc {
      margin: 20px auto;
      width: 45%;
    }

    &-button_group {
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
    }
  }
}

/* 编辑对话框 */
.edit_dialog .el-input {
  width: 300px;
}

.edit_dialog_footer button:first-child {
  margin-right: 10px;
}
</style>
