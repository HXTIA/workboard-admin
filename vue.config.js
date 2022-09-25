const {defineConfig} = require('@vue/cli-service')
// element-plus
const AutoImport = require('unplugin-auto-import/webpack')  // 自动引入
const Components = require('unplugin-vue-components/webpack')   // 组件注册
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')  // 组件解析

module.exports = defineConfig({
    transpileDependencies: true,

    configureWebpack: {
        // element-plus自动引入插件
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    }

})