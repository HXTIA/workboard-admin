import {createApp} from 'vue'
// 全局引入ElementUi
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 完全引入图标库
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
// }

app
    // .use(ElementPlus)
    .use(router)
    .mount('#app')
