// 组件解析

// import path from 'path';
const path = require('path');
const { defineConfig } = require('@vue/cli-service');
// element-plus
const AutoImport = require('unplugin-auto-import/webpack'); // 自动引入
const Components = require('unplugin-vue-components/webpack'); // 组件注册
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    // element-plus自动引入插件
    plugins: [
      AutoImport({
        imports: ['vue'],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': getPath('src'),
        view: getPath('src/view'),
        store: getPath('src/store'),
        comp: getPath('src/components'),
        router: getPath('src/router'),
        request: getPath('src/services'),
      },
      extensions: ['.vue', '.js', '.jsx'],
    }
  }

});

function getPath(pathName = '') {
  return path.resolve(__dirname, pathName);
}
