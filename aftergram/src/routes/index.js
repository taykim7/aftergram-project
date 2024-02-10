import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/MainPage.vue'),
    },
    {
      path: '/analyze',
      name: 'analyze',
      component: () => import('@/views/AnalyzePage.vue'),
    },
  ]
})