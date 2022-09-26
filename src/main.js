import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import stores from 'store';

const app = createApp(App);

// 完全引入图标库
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
// }

app
// .use(ElementPlus)
  .use(router)
  .use(stores)
  .mount('#app');
