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
              <el-option label="第一学期" :value="1" />
              <el-option label="第二学期" :value="2" />
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
            <Uploader
              :fileList="form.pictures"
              @upload="upload"
              @delete="deletePic"
            ></Uploader>
          </el-form-item>
          <el-form-item label="内容描述">
            <el-input v-model="form.detail" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              v-permission="{ action: 'create', effect: 'disabled' }"
              >Create</el-button
            >
            <el-button @click="onCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { courseClass } from '@/data/work.js';
import Uploader from '@/components/shared/Uploader/index.vue';
import { postCreateWork, postEditWork } from '../api';

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  isCreate: {
    type: Boolean,
    default: () => true
  }
});

// 接受传递的变量 -> 控制开闭
const showDialogForm = inject('isShowDialog');
// 控制关闭模态框
const changeIsShowDialog = inject('changeIsShowDialog');

// 表单
const form = reactive({
  title: '',
  courseId: 1,
  detail: '',
  deadline: '',
  semesterId: 1,
  pictureFiles: []
});

// 对标数组
// eslint-disable-next-line prefer-const
let matchMap;

// 监视数据变化 -> 理论上讲computed更好，暂时先在此处做临时
watchEffect(() => {
  if (props.data.id) {
    // 先赋给form
    Object.assign(form, JSON.parse(JSON.stringify(props.data)));
    // 创建最新的对标集合
    matchMap = new Map();
    props.data.pictures.forEach((value) =>
      matchMap.set(`http://119.29.157.231:8888/${value}`, 0)
    );
  }
});

// 接收uploader数据
const files = [];
const upload = (data) => {
  files.splice(0, files.length, ...data);
};

// 由于子组件不可直接删除props数据，所以传递函数，在父组件进行删除
// 此外由于触发此函数，说明该次行为是编辑作业，所以还要同时记录对标数组
const deletePic = (index, url) => {
  // 更改对标数组
  matchMap.set(url, 1);
  // 删除图片列表
  form.pictures.splice(index, 1);
};

// 提交作业 -> 手动请求
const onSubmit = async () => {
  // 无论是新建还是编辑都是需要先push进数组中
  form.pictureFiles.splice(0, form.pictureFiles.length, ...files);
  if (props.isCreate) {
    // 新建作业
    form.deadline = form.deadline.getTime();
    // 发起请求
    postCreateWork(form);
  } else {
    // 编辑作业：
    // 1. 不更改图片 2. 更改图片
    // 编辑图片的话要发起多图片编辑请求
    postEditWork(form, matchMap);
  }

  // form.pictures.splice(0, form.pictures.length);
  changeIsShowDialog();
};

// 取消
const onCancel = () => {
  console.log(matchMap);
  changeIsShowDialog(false);
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
