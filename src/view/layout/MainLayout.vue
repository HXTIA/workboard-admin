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
        <el-main class="el-main">
          <!-- 缓存页面 -->
          <div class="el-main-bread">
            <breadCrumb></breadCrumb>
          </div>
          <div class="el-main-routerView">
            <router-view v-slot="{ Component }">
              <KeepAlive>
                <component :is="Component"></component>
              </KeepAlive>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Menu from '@/components/menu/index.vue';
import breadCrumb from '@/components/breadCrumb/index.vue';

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
  },
  {
    id: '62',
    uri: '/userInfo',
    icon: 'User',
    name: '个人信息'
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
<style scoped lang="scss">
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

.el-main {
  &-bread {
    margin: 5px;
    padding: 5px;
    border-bottom: 1px solid rgb(228, 227, 227);
  }
}
</style>
