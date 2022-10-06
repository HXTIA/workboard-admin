<template>
  <el-menu default-active="1" @select="handleSelect" :router="true">
    <el-sub-menu
      v-for="item in menuItems"
      :key="item.id"
      :index="String(item.id)"
      :route="item.uri"
    >
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
          >{{ children.name }}</el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>
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
