<template>
  <div class="layout-wrapper">
    <el-container>
      <!--顶栏-->
      <el-header class="app_header">华信作业板</el-header>

      <!--主体-->
      <el-container>
        <!--左侧-->
        <el-aside width="200px">
          <Menu :menuItems="menuItems"></Menu>
        </el-aside>

        <!--右侧-->
        <el-main>
          <!-- 缓存页面 -->
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component"></component>
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Menu from '@/components/menu/index.vue';
import { computed } from 'vue';
import userStore from '@/store/user';

const store = userStore();

const menuItems1 = [
  {
    id: '60',
    uri: '/UserFeedback',
    icon: 'Reading',
    name: '意见反馈'
  },
  {
    id: '61',
    uri: '/AboutUs',
    icon: 'User',
    name: '关于我们'
  }
];
// 目录数据
const menuItems = computed(() => {
  const routes = JSON.parse(JSON.stringify(store.getRoutes));

  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  menuItems1.unshift(...routes);

  menuItems1.map((value) => {
    const name = value.icon;
    const { [name]: component } = require('@element-plus/icons-vue');
    return (value.icon = component);
  });

  return menuItems1;
});
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
