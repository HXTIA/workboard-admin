<template>
  <el-card class="boardAdmin_main_card">
    <template #header>
      <div>
        <!--时间-->
        <span class="main_card_time">发布于：{{ timeFormat(data.time) }}</span>
        <!--标题-->
        <h3>{{ data.title }}</h3>
      </div>
    </template>

    <!--正文-->
    <p>{{ data.desc }}</p>
    <br />
    <div class="main_image_group">
      <el-image
        v-for="(url, index) in data.urls"
        :key="index"
        :src="url"
        fit="contain"
      />
    </div>
    <br />
    <!--截止时间-->
    <h4>截止时间:{{ timeFormat(data.ddl) }}</h4>
    <br />

    <!--标签-->
    <div class="main_tag_group">
      <el-tag
        v-for="tag in data.tag"
        :key="tag"
        class="main_tag"
        effect="dark"
        size="large"
        round
      >
        {{ tag }}
      </el-tag>
    </div>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue';
import { timeFormat } from '@/utils/format/index.js';

defineProps({
  data: {
    type: Object,
    default: () => {}
  }
});
</script>

<style scoped lang="scss">
/* 发布时间 */
.main_card_time {
  color: #909399;
  line-height: 1;
  font-size: 13px;
}

/* 图片 */
.main_image_group {
  text-align: center;
}

.main_image_group .el-image {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

/* 标签 */
.main_tag_group,
.main_tag,
.main_add_tag {
  margin: 0 10px 5px 10px;
}

.main_add_tag {
  width: 107px !important;
}
</style>
