<template>
  <el-menu default-active="1" @select="handleSelect" :router="true">
    <div v-for="item in menuItems" :key="item.id">
      <template v-if="item.children">
        <el-sub-menu :index="String(item.id)" :route="item.uri">
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="children in item.children"
              :key="children.id"
              :index="String(children.id)"
              :route="children.uri"
            >
              <!-- <el-icon>
                <component :is="children.icon" />
              </el-icon> -->
              <span>{{ children.name }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="String(item.id)" :route="item.uri">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.name }}</span></el-menu-item
        >
      </template>
    </div>
  </el-menu>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  menuItems: {
    type: Array,
    default: () => []
  }
});
// 导航选择
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style></style>
