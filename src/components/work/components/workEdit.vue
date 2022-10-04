<template>
  <div class="workedit-wrapper">
    <div class="edit_dialog">
      <el-dialog
        v-model="showDialogForm"
        title="作业管理"
        width="90vw"
        top="5vh"
        :show-close="false"
        :close-on-click-modal="false"
      >
        <el-form :model="form" label-width="120px">
          <el-form-item label="作业标题">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="作业学年">
            <el-select v-model="form.semesterId" placeholder="选择学期">
              <el-option label="第一学期" value="1" />
              <el-option label="第二学期" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="截至日期">
            <el-date-picker
              v-model="form.deadline"
              type="datetime"
              placeholder="选择截止日期"
            />
          </el-form-item>
          <el-form-item label="教学班级">
            <el-select v-model="form.courseId" placeholder="选择教学班">
              <el-option
                v-for="item in courseClass"
                :key="item.courseId"
                :label="item.name"
                :value="item.courseId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              ref="uploadFile"
              v-model="form.pictureFiles"
              list-type="picture-card"
              :http-request="upload"
              :multiple="true"
              :limit="6"
              :on-preview="handlePictureCardPreview"
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
          </el-form-item>
          <el-form-item label="内容描述">
            <el-input v-model="form.detail" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button @click="onCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';
import { courseClass } from '@/data/work.js';
import { reactive, defineProps, defineEmits, toRefs, watchEffect } from 'vue';
// import request from '@/services';

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  isCreate: {
    type: Boolean,
    default: () => true
  },
  isShowDialog: {
    type: Boolean,
    default: () => {}
  }
});

const { isShowDialog } = toRefs(props);

// eslint-disable-next-line prefer-const
let showDialogForm = computed({
  get() {
    return isShowDialog.value;
  },
  set() {}
});

const emits = defineEmits(['changeIsShowDialog']);

// 表单
const form = reactive({
  title: '',
  courseId: '',
  detail: '',
  deadline: '',
  semesterId: '',
  pictureFiles: []
});

// 监视数据变化 -> 理论上讲computed更好，暂时先在此处做临时
watchEffect(() => {
  if (props.data.id) {
    Object.assign(form, props.data);
  }
});

// eslint-disable-next-line prefer-const
let dialogVisible = ref(false);

// eslint-disable-next-line prefer-const
let dialogImageUrl = ref('');

// 预览图片
const handlePictureCardPreview = (uploadFile) => {
  dialogVisible.value = true;
  dialogImageUrl.value = uploadFile.url;
};

// 文件上传的模板实例
const uploadFile = ref();

// 存储二进制数据

// eslint-disable-next-line prefer-const
let files = [];
// 存储formData
// const formData = new FormData();

const upload = (file) => {
  files.push(file.file);
};

// 提交作业 -> 手动请求
const onSubmit = async () => {
  console.log(files);
  // const res = await request({
  //   url: 'http://119.29.157.231:8888/admin/works/create'
  // });
  // console.log(res);
  console.log(props.isCreate);
};

// 取消
const onCancel = () => {
  emits('changeIsShowDialog');
};
</script>

<style scoped lang="scss">
.workedit-wrapper {
  .dialogImage {
    width: 100%;
    height: 100%;
  }
}
</style>
