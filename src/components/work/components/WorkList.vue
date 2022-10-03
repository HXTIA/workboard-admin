<template>
  <el-timeline-item
    :timestamp="timeFormat(workList.time)"
    :color="timelineColor[workList.id % timelineColor.length]"
    placement="top"
  >
    <el-card
      class="boardAdmin_timeline_card"
      @click="clickWorkList(workList.id)"
    >
      <h4>{{ workList.title }}</h4>
      <p>{{ workList.desc }}</p>
    </el-card>
  </el-timeline-item>
</template>

<script setup>
import { timelineColor } from '@/data/work.js';
import { timeFormat } from '@/utils/format/index.js';

const props = defineProps({
  workList: {
    type: Object,
    default: () => {}
  }
});

const emits = defineEmits(['clickWork']);

// 点击作业列表
const clickWorkList = (id) => {
  emits('clickWork', id, props.workList);
};
</script>

<style scoped>
.el-timeline-item {
  margin: 0 20px;
}

.boardAdmin_timeline_card {
  cursor: pointer;
}
</style>
