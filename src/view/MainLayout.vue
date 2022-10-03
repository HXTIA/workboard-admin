<template>
  <div class="layout-wrapper">
    <el-container>
      <!--顶栏-->
      <el-header class="app_header">华信作业板</el-header>

      <!--主体-->
      <el-container>
        <!--左侧-->
        <el-aside width="200px">
          <el-menu default-active="1" @select="handleSelect" :router="true">
            <el-menu-item
              v-for="item in menuItems"
              :key="item.index"
              :index="item.index"
              :route="item.route"
            >
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.text }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!--右侧-->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import { Document, Reading, User } from '@element-plus/icons-vue';
const menuItems = reactive([
  {
    index: '1',
    route: '/',
    icon: Document,
    text: '作业板'
  },
  {
    index: '2',
    route: '/UserFeedback',
    icon: Reading,
    text: '意见反馈'
  },
  {
    index: '3',
    route: './AboutUs',
    icon: User,
    text: '关于我们'
  }
]);
// 导航选择
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>
<style scoped>
.layout-wrapper {
  width: 100vw;
  height: 100vh;
}
.el-container {
  width: 100%;
  height: 100%;
}
.app_header {
  color: #000;
  line-height: 60px;
  border-bottom: 1px solid #ebeef5;
}
</style>
