import { createRouter, createWebHistory } from 'vue-router';
import userStore from '@/store/user';
// import { handleRoutes } from '@/utils/routes';
// import { dynamicRoutes } from '@/data/work.js';
import { requestRoutes } from '@/utils/routes/requestRoutes.js';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/view/layout/MainLayout.vue'),
    children: [
      {
        path: '/UserFeedback',
        name: 'UserFeedback',
        component: () => import('@/components/UserFeedback.vue'),
      },
      {
        path: '/AboutUs',
        name: 'AboutUs',
        component: () => import('@/components/AboutUs.vue'),
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/view/NotFound/index.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 全局路由前置守卫
router.beforeEach(async (to, from, next) => {
  const store = userStore();

  // 是否存在token -> 不存在直接去登录
  if (!store.getToken) {
    // 未登录 -> 重定向至登陆界面
    if (to.path !== '/login') {
      return next({ path: '/login' });
    }
  }

  // 存在token但是不存在路由表 -> 处理没有路由表
  if (!store.getRoutes.length) {
    // 如果token不对，取不到目标路由表 -> 返回false ， 那么去到登录页
    const res = requestRoutes(store, router);
    if (res) {
      console.log(router.getRoutes());
      return next({ path: to.path });
    }
  } else {
    next();
  }
});

export default router;
