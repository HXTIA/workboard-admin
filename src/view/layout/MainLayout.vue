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
              :key="item.id"
              :index="String(item.id)"
              :route="item.uri"
            >
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.title }}</span>
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
import { computed } from 'vue';
import userStore from '@/store/user';
// import { Document, Reading, User } from '@element-plus/icons-vue';
const { Document, Reading, User } = require('@element-plus/icons-vue');
const store = userStore();
const menuItems1 = [
  {
    id: '10',
    uri: '/',
    icon: Document,
    title: '作业板'
  },
  {
    id: '11',
    uri: '/UserFeedback',
    icon: Reading,
    title: '意见反馈'
  },
  {
    id: '12',
    uri: '/AboutUs',
    icon: User,
    title: '关于我们'
  }
];
// 目录
const menuItems = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  menuItems1.push(...store.getRoutes);
  return menuItems1;
});
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
