import { createRouter, createWebHistory } from 'vue-router';
import userStore from '@/store/user';
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
        component: () => import('@/components/feedback/index.vue'),
      },
      {
        path: '/AboutUs',
        name: 'AboutUs',
        component: () => import('@/components/about/index.vue'),
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
    console.log('没有token');
    // 未登录 -> 重定向至登陆界面
    if (to.path !== '/login') {
      return next({ path: '/login' });
    }
    return next();
  }

  // 存在token但是不存在路由表 -> 处理没有路由表
  if (!store.getRoutes.length) {
    // 如果token不对，取不到目标路由表 -> 返回false ， push登录页
    const res = await requestRoutes(store, router);
    // 如果是false -> token不对，重新去登录
    if (!res) {
      return next({ path: '/login', replace: true });
    } else {
      // 路由表获取正常 -> 正常跳转
      next({ path: to.path, replace: true });
    }
  } else {
    next();
  }
});

export default router;
