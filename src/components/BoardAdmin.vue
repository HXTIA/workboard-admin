<template>
  <div>
    <div class="boardAdmin">
      <el-container>

        <!--菜单栏-->
        <el-header class="boardAdmin_header">

          <!--搜索-->
          <el-input
              v-model="query"
              placeholder="请输入内容"
              size="large"
              :maxlength="30"
              :clearable="true"
              class="boardAdmin_search"
          >
            <template #append>
              <el-button :icon="Search">搜索</el-button>
            </template>
          </el-input>
          <!--筛选与添加按钮-->
          <el-button type="primary" :icon="Filter" size="large" class="screen_btn">筛选</el-button>
          <el-button type="primary" :icon="CirclePlus" size="large" @click="addBtn">添加</el-button>
        </el-header>

        <el-container>
          <!--左侧-->
          <el-aside class="boardAdmin_aside">
            <WorkList
              :workDetails="workDetails"
              :workList="workList"
              @clickWorkList="clickWorkList"
            ></WorkList>
          </el-aside>

          <!--右侧-->
          <el-main>

            <div>
              <!--编辑与删除按钮-->
              <div class="main_button_group" v-if="showEditAndDelete">
                <el-button type="primary" :icon="EditPen" round @click="alertEditor">编辑</el-button>
                <el-button type="danger" :icon="Delete" round @click="deleteCard">删除</el-button>
              </div>
              <el-card class="boardAdmin_main_card">

                <template #header>
                  <div>
                    <!--时间-->
                    <span class="main_card_time">发布于：{{ workDetails.time }}</span>
                    <!--标题-->
                    <h3>{{ workDetails.title }}</h3>
                  </div>
                </template>

                <!--正文-->
                <p>{{ workDetails.text }}</p>
                <br>
                <div class="main_image_group">
                  <el-image
                      v-for="(url,index) in workDetails.image"
                      :key="index"
                      :src="url"
                      fit="contain"/>
                </div>
                <br>
                <!--截止时间-->
                <h4>截止时间:{{ workDetails.deadline }}</h4>
                <br>

                <!--标签-->
                <div class="main_tag_group">
                  <el-tag
                      v-for="tag in workDetails.dynamicTags"
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

          </el-main>
        </el-container>
      </el-container>
    </div>

    <!--编辑和添加的表单对话框-->
    <div class="edit_dialog">
      <el-dialog
          v-model="showDialogForm"
          title="作业管理"
          :before-close="closeDialogForm"
          :draggable="true">

        <!--表单-->
        <el-form :model="editForm" :rules="rules" ref="dialogEditForm">

          <!--选择课程-->
          <el-form-item label="课程：" :label-width="formLabelWidth" prop="title">
            <el-cascader
                v-model="editForm.title"
                placeholder="请选择课程"
                :show-all-levels="false"
                :options="titleOptions"
                clearable
                filterable
                :props="titleProps"
            />
          </el-form-item>

          <!--填写作业内容-->
          <el-form-item label="作业内容：" :label-width="formLabelWidth" prop="text">
            <el-input
                v-model="editForm.text"
                maxlength="300"
                show-word-limit
                autosize
                clearable
                type="textarea"
                placeholder="请输入作业内容"
            />
          </el-form-item>

          <!--截止日期-->
          <el-form-item label="截止日期：" :label-width="formLabelWidth" prop="deadline">
            <el-date-picker
                v-model="editForm.deadline"
                type="datetime"
                placeholder="选择截止日期"
            />
          </el-form-item>

          <!--定义标签-->
          <el-form-item label="标签：" :label-width="formLabelWidth">
            <el-tag
                v-for="tag in editForm.dynamicTags"
                :key="tag"
                class="main_tag"
                closable
                :disable-transitions="false"
                effect="dark"
                round
                size="large"
                @close="deleteTag(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
                v-if="inputVisible"
                ref="InputRef"
                v-model="inputValue"
                class="main_add_tag"
                maxlength="30"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
            />
            <el-button
                v-else
                class="main_add_tag"
                @click="showInput"
                round
            >
              + New Tag
            </el-button>
          </el-form-item>
        </el-form>

        <template #footer>
        <span class="edit_dialog_footer">
          <el-button @click="closeDialogForm">取消</el-button>
          <el-button type="primary" @click="saveEdit" v-if="changeButton">
            保存
          </el-button>
          <el-button type="primary" @click="addWork" v-else>
            添加
          </el-button>
        </span>
        </template>

      </el-dialog>
    </div>
  </div>
</template>

<script>
// 手动引入，自动按需引入插件似乎引入不了这个组件
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';
import { ElMessage, ElMessageBox } from 'element-plus';
import deliveryDetails from '../../utils/WorkList/deliveryDetails';
import getSystemTime from '../../utils/WorkList/getSystemTime';

import { reactive, ref, nextTick } from 'vue';
import {
  Search,
  Filter,
  CirclePlus,
  EditPen,
  Delete,
  Select,
  CloseBold,
} from '@element-plus/icons-vue';

export default {
  name: 'BoardAdmin',
  setup() {
    // 搜索内容
    const query = ref('');

    // 空表单（用于初始化）
    const emptyForm = reactive({
      time: '',
      title: '',
      text: '',
      dynamicTags: [''],
      deadline: '',
      image: [''],
    });

    // 切换对话框的添加按钮与保存按钮(true:保存,false:添加)
    const changeButton = ref(true);

    // 菜单栏的添加按钮
    const addBtn = () => {
      // 切换为添加按钮
      changeButton.value = false;
      // 弹出对话框
      showDialogForm.value = true;
    };

    // 添加作业
    const addWork = () => {
      dialogEditForm.value.validate((valid) => {
        if (valid) {
          // 获取系统时间
          editForm.time = getSystemTime();
          // 添加到作业列表
          workList.push(editForm);
          // 关闭对话框
          showDialogForm.value = false;
          // 清空表单
          editForm.value = { ...emptyForm };
        } else {
          ElMessage({
            message: '请正确填写表单',
            type: 'warning',
          });
          return false;
        }
      });
    };

    // 作业列表
    const workList = reactive([
      {
        time: '2018-4-12 13:34:22',
        title: '计算机网络-1班',
        text: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
        dynamicTags: ['作业一', '命名格式：学号+姓名', '提交给：学委'],
        deadline: '2021-4-12 13:34:22',
        image: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        ],
      },
      {
        time: '2018-4-12 13:34:22',
        title: '计算机网络-2班',
        text: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
        dynamicTags: ['作业二', '命名格式：学号+姓名', '提交给：学委'],
        deadline: '2021-4-12 13:34:22',
        image: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        ],
      },
      {
        time: '2018-4-12 13:34:22',
        title: '计算机网络-3班',
        text: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
        dynamicTags: ['作业三', '命名格式：学号+姓名', '提交给：学委'],
        deadline: '2021-4-12 13:34:22',
        image: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        ],
      },
      {
        time: '2018-4-12 13:34:22',
        title: '计算机网络-4班',
        text: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
        dynamicTags: ['作业四', '命名格式：学号+姓名', '提交给：学委'],
        deadline: '2021-4-12 13:34:22',
        image: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        ],
      },
      {
        time: '2018-4-12 13:34:22',
        title: '计算机网络-5班',
        text: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
        dynamicTags: ['作业五', '命名格式：学号+姓名', '提交给：学委'],
        deadline: '2021-4-12 13:34:22',
        image: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        ],
      },
      {
        time: '2018-4-12 13:34:22',
        title: '计算机网络-6班',
        text: '第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己做第2章1、2、3、5、7、8题，第一题要自己做，第一题要自己做，第一题要自己做，第一题要自己.....',
        dynamicTags: ['作业六', '命名格式：学号+姓名', '提交给：学委'],
        deadline: '2021-4-12 13:34:22',
        image: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        ],
      },
    ]);

    // 作业列表索引
    const cardIndex = ref(-1);

    // 作业详情
    const workDetails = reactive({
      time: '2022-9-25 00:00:00',
      title: '欢迎使用华信作业板管理系统',
      text: '来者皆是客，进了别想走(≧∇≦)ﾉ',
      dynamicTags: ['华信', '科协', '作业板'],
      deadline: '9999-99-99 00:00:00',
      image: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      ],
    });

    // 点击作业列表
    const clickWorkList = (index, workList) => {
      // 保存索引值，显示操作按钮
      cardIndex.value = index;
      showEditAndDelete.value = true;
      // 传递作业详情信息
      deliveryDetails(workDetails, workList);
    };

    // 控制编辑对话框的显示与隐藏
    const showDialogForm = ref(false);

    // 表单标签的宽度
    const formLabelWidth = '140px';

    // 编辑的对话框的表单数据
    const editForm = reactive({
      time: '',
      title: '',
      text: '',
      dynamicTags: [],
      deadline: '',
      image: [],
    });

    // 作业标题选择框的配置
    const titleProps = {
      checkStrictly: true, // 子节点与父级不互相关联
      emitPath: false, // 只返回该节点的值
    };

    // 作业标题下拉框的选项（示例）
    const titleOptions = [
      {
        value: '壹',
        label: '壹',
        children: [
          {
            value: '一',
            label: '一',
            children: [
              {
                value: '计算机网络-1班',
                label: '计算机网络-1班',
              },
              {
                value: '计算机网络-2班',
                label: '计算机网络-2班',
              },
            ],
          },
        ],
      },
      {
        value: '贰',
        label: '贰',
        children: [
          {
            value: '一',
            label: '一',
            children: [
              {
                value: '计算机网络-3班',
                label: '计算机网络-3班',
              },
              {
                value: '计算机网络-4班',
                label: '计算机网络-4班',
              },
            ],
          },
          {
            value: '二',
            label: '二',
            children: [
              {
                value: '计算机网络-5班',
                label: '计算机网络-5班',
              },
              {
                value: '计算机网络-6班',
                label: '计算机网络-6班',
              },
            ],
          },
          {
            value: '三',
            label: '三',
            children: [
              {
                value: '1',
                label: '1',
              },
              {
                value: '2',
                label: '2',
              },
            ],
          },
        ],
      },
      {
        value: '叄',
        label: '叄',
        children: [
          {
            value: '一',
            label: '一',
          },
          {
            value: '二',
            label: '二',
          },
          {
            value: '三',
            label: '三',
          },
        ],
      },
    ];

    // 弹出编辑对话框
    const alertEditor = () => {
      // 传递作业详情信息
      deliveryDetails(editForm, workList[cardIndex.value]);
      // 切换为保存按钮
      changeButton.value = true;
      // 弹出对话框
      showDialogForm.value = true;
    };

    // 保存编辑作业详情
    const saveEdit = () => {
      dialogEditForm.value.validate((valid) => {
        if (valid) {
          // 获取当前日期与时间
          editForm.time = getSystemTime();
          // 传递作业详情信息
          deliveryDetails(workList[cardIndex.value], editForm);
          deliveryDetails(workDetails, editForm);
          // 关闭对话框
          showDialogForm.value = false;
          // 清空表单
          deliveryDetails(editForm, emptyForm);
        } else {
          ElMessage({
            message: '请正确填写表单',
            type: 'warning',
          });
          return false;
        }
      });
    };

    // 关闭编辑对话框的回调
    const closeDialogForm = () => {
      // 关闭对话框
      showDialogForm.value = false;
      // 重置表单（清空检验）
      dialogEditForm.value.resetFields();
      // 当前对话框为编辑对话框则清除表单
      if (changeButton.value) {
        // 清空表单
        deliveryDetails(editForm, emptyForm);
      }
    };

    // 控制删除按钮的显示与隐藏
    const showEditAndDelete = ref(false);

    // 删除该作业
    const deleteCard = () => {
      // -1表示没有选中任何作业
      if (cardIndex.value !== -1) {
        ElMessageBox.confirm(
          '确认删除?',
          '提示',
          {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
          .then(() => {
            workList.splice(cardIndex.value, 1);
            workDetails.time = '2022-9-25 00:00:00';
            workDetails.title = '欢迎使用华信作业板管理系统';
            workDetails.text = '怎么就删了呢？(´･ω･`)?';
            workDetails.dynamicTags = ['华信', '科协', '作业板'];
            workDetails.deadline = '9999-99-99 00:00:00';
            workDetails.image = [
              'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            ];
            // 删除后隐藏操作按钮
            cardIndex.value = -1;
            showEditAndDelete.value = false;
            // 提示成功
            ElMessage({
              type: 'success',
              message: '删除成功!',
            });
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消操作',
            });
          });
      }
    };

    // 控制添加标签输入框和按钮的显示隐藏
    const inputVisible = ref(false);

    // 添加标签的输入框
    const InputRef = ref(null);

    // 添加标签的输入框的值
    const inputValue = ref('');

    // 删除标签
    const deleteTag = (tag) => {
      editForm.dynamicTags.splice(editForm.dynamicTags.indexOf(tag), 1);
    };

    // 添加标签的按钮
    const showInput = () => {
      inputVisible.value = true; // 切换输入框与按钮
      nextTick(() => {
        InputRef.value.input.focus(); // 鼠标聚焦到输入框
      });
    };

    // 添加标签输入框失去焦点或确认添加
    const handleInputConfirm = () => {
      // 判断输入框是否为空
      if (inputValue.value) {
        editForm.dynamicTags.push(inputValue.value); // 添加标签
      }
      inputVisible.value = false; // 切换输入框与按钮
      inputValue.value = ''; // 清空输入框
    };

    // 表单的ref
    const dialogEditForm = ref(null);

    // 对话框校验规则
    const rules = reactive({
      title: [{ required: true, message: '不能为空', trigger: 'change' }],
      text: [{ required: true, message: '不能为空', trigger: 'blur' }],
      deadline: [{ required: true, message: '不能为空', trigger: 'change' }],
    });

    return {
      // 图标
      Search,
      Filter,
      CirclePlus,
      EditPen,
      Delete,
      Select,
      CloseBold,

      // 菜单栏
      query, // 搜索内容
      changeButton, // 切换对话框的添加按钮与保存按钮
      addBtn, // 菜单栏的添加按钮
      addWork, // 添加作业

      // 左侧
      workList, // 作业列表
      cardIndex, // 作业列表索引
      clickWorkList, // 点击获取作业详情

      // 右侧
      workDetails, // 作业详情
      saveEdit, // 保存编辑作业详情
      showDialogForm, // 控制编辑对话框的显示与隐藏
      formLabelWidth, // 表单标签的宽度
      editForm, // 编辑的对话框的表单数据
      titleProps, // 作业标题下拉框的配置
      titleOptions, // 作业标题下拉框的选项
      alertEditor, // 弹出编辑对话框
      closeDialogForm, // 关闭编辑对话框
      showEditAndDelete, // 控制删除按钮的显示与隐藏
      deleteCard, // 删除该作业

      inputVisible, // 控制添加标签输入框和按钮的显示隐藏
      InputRef, // 添加标签的输入框
      inputValue, // 添加标签输入框的值
      deleteTag, // 删除标签
      showInput, // 添加标签的按钮
      handleInputConfirm, // 确认添加标签

      dialogEditForm, // 表单的ref
      rules, // 对话框校验规则
    };
  },
};
</script>

<style scoped>
/* 菜单栏 */
.boardAdmin_header {
  line-height: 60px;
  border-bottom: 1px solid #ebeef5;
}

.boardAdmin_search {
  width: 400px;
  margin-right: 40px;
}

.screen_btn {
  margin-right: 40px;
}

/* 左侧 */
.boardAdmin_aside {
  width: 50%;
  padding: 20px 0;
  border-right: 1px solid #ebeef5;
}

/* 编辑和删除按钮 */
.main_button_group {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

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
.main_tag_group, .main_tag, .main_add_tag {
  margin: 0 10px 5px 10px;
}

.main_add_tag {
  width: 107px !important;
}

/* 编辑对话框 */
.edit_dialog .el-input {
  width: 300px;
}

.edit_dialog_footer button:first-child {
  margin-right: 10px;
}
</style>
