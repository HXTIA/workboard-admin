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
              <span>{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
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
import { computed } from 'vue';
import userStore from '@/store/user';

const store = userStore();

const menuItems1 = [
  {
    id: '10',
    uri: '/work',
    icon: 'Document',
    name: '作业板'
  },
  {
    id: '11',
    uri: '/UserFeedback',
    icon: 'Reading',
    name: '意见反馈'
  },
  {
    id: '12',
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
