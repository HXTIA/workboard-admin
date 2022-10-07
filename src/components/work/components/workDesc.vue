<template>
  <div class="workdesc-wrapper">
    <div class="work-wrapper-main-button_group">
      <el-button type="primary" round @click="editWork">编辑</el-button>
      <el-button type="danger" round @click="deleteCard">删除</el-button>
    </div>
    <el-card class="boardAdmin_main_card">
      <template #header>
        <div>
          <span class="main_card_time"
            >发布于：{{ timeFormat(data.time) }}</span
          >
          <h3>{{ data.title }}</h3>
        </div>
      </template>
      <workEdit
        :data="data"
        :isShowDialog="isShowDialog"
        @changeIsShowDialog="changeIsShowDialog"
        :isCreate="false"
      ></workEdit>
      <!--正文-->
      <p>{{ data.detail }}</p>
      <br />
      <div class="main_image_group">
        <el-image
          v-for="(url, index) in data.pictureFiles"
          :key="index"
          :src="url"
          fit="contain"
        />
      </div>
      <br />
      <!--截止时间-->
      <h4>截止时间:{{ timeFormat(data.deadline) }}</h4>
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
  </div>
</template>

<script setup>
import { defineProps, ref, watchEffect } from 'vue';
import { timeFormat } from '@/utils/format/index.js';
import workEdit from '@/components/work/components/workEdit';

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
});

watchEffect(() => {
  console.log(props.data, 111);
});

// eslint-disable-next-line prefer-const
let isShowDialog = ref(false);
const changeIsShowDialog = () => {
  isShowDialog.value = false;
};

provide('isShowDialog', isShowDialog);
provide('changeIsShowDialog', changeIsShowDialog);

// 编辑
const editWork = () => {
  isShowDialog.value = true;
};

// 删除
const deleteCard = () => {
  console.log('删除,通过id先删除本地-> 再删除远端请求', props.data);
};
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
