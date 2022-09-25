<template>
  <div class="app">
    <el-container>

      <!--顶栏-->
      <el-header class="app_header">
        华信作业板
      </el-header>

      <!--主体-->
      <el-container>
        <!--左侧-->
        <el-aside width="200px">

          <el-menu
              default-active="1"
              @select="handleSelect"
              :router="true"
          >
            <el-menu-item
                v-for="item in menu_items"
                :key="item.index"
                :index="item.index"
                :route="item.route"
            >
              <el-icon>
                <component :is="item.icon"/>
              </el-icon>
              <span>{{ item.text }}</span>
            </el-menu-item>
          </el-menu>

        </el-aside>

        <!--右侧-->
        <el-main class="app_main">
          <router-view/>
        </el-main>

      </el-container>

    </el-container>
  </div>
</template>

<script>
import {reactive} from "vue";
import {
  Document,
  Reading,
  User,
  Search
} from '@element-plus/icons-vue'

export default {
  name: 'App',
  components: {
    Document,
    Reading,
    User,
    Search
  },
  setup() {
    // 导航栏
    const menu_items = reactive([
      {
        index: '1',
        route: '/',
        icon: 'document',
        text: '作业板',
      },
      {
        index: '2',
        route: '/UserFeedback',
        icon: 'reading',
        text: '意见反馈',
      },
      {
        index: '3',
        route: './AboutUs',
        icon: 'user',
        text: '关于我们',
      },
    ])
    // 导航选择
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      menu_items,
      handleSelect
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.app_header {
  color: #000;
  line-height: 60px;
  border-bottom: 1px solid #ebeef5;
}

.app_main {
  padding: 0 !important;
}
</style>
