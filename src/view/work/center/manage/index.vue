<script setup>
import { postGetWorklist } from './api';
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

// 挂载发起请求
onBeforeMount(async () => {
  await postGetWorklist();
});

// 向desc组件传递id
const id = reactive({ id: undefined });

// 点击作业列表
const clickWorkList = (clickId, data) => {
  id.id = clickId;
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
              <el-empty
                :image-size="200"
                description="数据请求中..."
                v-if="!workList.length"
              />
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
            <WorkDesc :id="id"></WorkDesc>
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
