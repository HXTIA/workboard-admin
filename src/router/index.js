import { createRouter, createWebHistory } from 'vue-router';
import userStore from '@/store/user';
// import request from '@/services';
import { handleRoutes } from '@/utils/routes';
import { dynamicRoutes } from '@/data/work.js';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/view/layout/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'workitem',
        component: () => import('@/components/work/index.vue'),
      },
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const store = userStore();
  if (!store.getRoutes.length) {
    // const res = await request({
    //   url: 'http://localhost:3000/api/data/getRouters',
    //   method: 'GET',
    // });
    const res = dynamicRoutes;
    store.setRoutes(res);
    const Res = handleRoutes(res);
    Res.forEach((value) => {
      router.addRoute('Home', value);
    });
    next({ path: to.path });
  } else {
    next();
  }
});

export default router;
