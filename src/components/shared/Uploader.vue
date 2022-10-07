<template>
  <div>
    <el-upload
      ref="uploadFile"
      v-bind:file-list="filelist"
      list-type="picture-card"
      :http-request="upload"
      :multiple="true"
      :limit="6"
      :on-preview="handlePictureCardPreview"
      :on-remove="handlePictureCardRemove"
    >
      +
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img
        w-full
        :src="dialogImageUrl"
        class="dialogImage"
        alt="Preview Image"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, defineEmits } from 'vue';

const props = defineProps({
  fileList: {
    type: Array,
    default: () => []
  }
});

const emits = defineEmits(['upload', 'delete']);

const filelist = computed(() => {
  // 要对照片数组进行处理
  const temp = props.fileList;
  const object = [];
  temp.forEach((value, i) => {
    const obj = {
      name: i,
      url: value
    };
    object.push(obj);
  });
  return object;
});

const files = [];

// 文件上传
const upload = (file) => {
  files.push(file.file);
  console.log(files);
  emits('upload', files);
};

// eslint-disable-next-line prefer-const
let dialogImageUrl = ref('');

// eslint-disable-next-line prefer-const
let dialogVisible = ref(false);

// 预览
const handlePictureCardPreview = (e) => {
  dialogImageUrl.value = e.url;
  dialogVisible.value = true;
};

// 删除
const handlePictureCardRemove = (e) => {
  if (e.raw) {
    // 说明是新增加的内容 -> 所以删掉files
    const index = files.findIndex((value) => value.uid === e.uid);
    files.splice(index, 1);
    emits('upload', files);
  } else {
    // 删掉的是原图片
    const index = props.fileList.findIndex((value) => value === e.url);
    emits('delete', index, e.url);
  }
};
</script>

<style lang="scss" scoped>
.workedit-wrapper {
  .dialogImage {
    width: 100%;
    height: 100%;
  }
}
</style>
