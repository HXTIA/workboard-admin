<script setup>
import { getWorklist } from './api';
import workStore from '@/store/work';
import WorkDesc from './components/workDesc.vue';
import WorkEdit from './components/workEdit.vue';
import WorkList from './components/workList.vue';
import WorkHeader from './components/workHeader.vue';

// eslint-disable-next-line prefer-const
let isShowDialog = ref(false);
const changeIsShowDialog = (flag) => {
  isShowDialog.value = flag;
};

// 向子组件注入控制对话框开闭的变量
provide('isShowDialog', isShowDialog);
provide('changeIsShowDialog', changeIsShowDialog);

// 检测store的数据
const store = workStore();
const workList = reactive(store.getWorklist);
const workDetails = reactive(JSON.parse(JSON.stringify(workList[0] || {})));

// 挂载发起请求
onBeforeMount(() => {
  getWorklist();
  console.log('1212121');
});

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
        <WorkHeader :data="workList"></WorkHeader>
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
            <WorkDesc :data="workDetails" v-show="workDetails.id"></WorkDesc>
          </div>
        </div>
      </el-container>
      <WorkEdit
        :data="{}"
        :isShowDialog="isShowDialog"
        @changeIsShowDialog="changeIsShowDialog"
        :isCreate="true"
      ></WorkEdit>
    </div>
  </div>
</template>

<style scoped lang="scss">
.work-wrapper {
  width: 100%;
  height: 100%;

  /* 菜单栏 */

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
</style>
