<script setup>
import { postGetWorklist } from './api';
import workStore from '@/store/work';
import WorkDesc from '@/components/work/components/workDesc.vue';
import WorkList from '@/components/work/components/workList.vue';
import WorkEdit from '@/components/work/components/workEdit.vue';
import WorkHeader from '@/components/work/components/workHeader.vue';
import WorkPublish from '@/components/work/components/workPublish.vue';

// 标签页默认显示
const activeName = ref('1');

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
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="作业查看" name="1">
          <el-header class="work-wrapper-header">
            <WorkHeader :data="workList"></WorkHeader>
          </el-header>

          <el-container class="work-wrapper-main">
            <!--左侧-->
            <div class="work-wrapper-main-worklist">
              <el-timeline>
                <el-scrollbar class="work-wrapper-main-worklist-scrollbar">
                  <el-empty :image-size="200" description="数据请求中..." v-if="!workList.length" />
                  <WorkList v-for="item in workList" :key="item.id" :workList="item" @clickWork="clickWorkList">
                  </WorkList>
                </el-scrollbar>
              </el-timeline>
            </div>

            <!--右侧-->
            <div class="work-wrapper-main-workdesc">
              <div>
                <WorkDesc :id="id"></WorkDesc>
              </div>
            </div>
            <WorkEdit :data="{}" :isShowDialog="isShowDialog" @changeIsShowDialog="changeIsShowDialog" :isCreate="true">
            </WorkEdit>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="发布作业" name="2">
          <WorkPublish></WorkPublish>
        </el-tab-pane>
      </el-tabs>
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
        height: 65vh;
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
