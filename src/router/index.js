import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/view/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'workitem',
        component: () => import('../components/work/index.vue'),
      },
      {
        path: '/UserFeedback',
        name: 'UserFeedback',
        component: () => import('../components/UserFeedback.vue'),
      },
      {
        path: '/AboutUs',
        name: 'AboutUs',
        component: () => import('../components/AboutUs.vue'),
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
