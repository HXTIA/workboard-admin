<template>
  <el-timeline>
    <el-scrollbar :height="height" class="boardAdmin_scrollbar">
      <el-timeline-item
        v-for="(item,index) in workList"
        :key="index"
        :timestamp="item.time"
        :color="timelineColor[index%(timelineColor.length)]"
        placement="top">
        <el-card class="boardAdmin_timeline_card" @click="clickWorkList(index)">
          <h4>{{ item.title }}</h4>
          <p>{{ item.text }}</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item placement="top"></el-timeline-item>

    </el-scrollbar>

  </el-timeline>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'WorkList',
  props: ['workDetails', 'workList'],
  setup(props, context) {
    // console.log(props, context);
    // 作业列表
    const workList = reactive(props.workList);

    // 设置作业列表高度
    const height = window.innerHeight - 180 + 'px';

    // 点击作业列表
    const clickWorkList = (index) => {
      // 传递列表下标和作业详情信息
      context.emit('clickWorkList', index, workList[index]);
    };

    // 时间轴颜色
    const timelineColor = reactive([
      '#FF0000', '#FF7F00', '#FFFF00',
      '#00FF00', '#0000FF', '#4B0082',
      '#8B00FF', '#000000', '#FFFFFF',
    ]);

    return {
      height,
      clickWorkList,
      timelineColor,
    };
  }
};
</script>

<style scoped>

.boardAdmin_scrollbar .el-timeline-item {
  margin: 0 20px;
}

.boardAdmin_timeline_card {
  cursor: pointer;
}
</style>
