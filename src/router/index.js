import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/BoardAdmin.vue'),
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
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
