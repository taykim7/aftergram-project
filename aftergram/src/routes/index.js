import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

const router = new VueRouter({
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
      path: '/signup',
      component: ()=> import('@/views/SignupPage.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/MainPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/analyze',
      name: 'analyze',
      component: () => import('@/views/AnalyzePage.vue'),
      meta: { auth: true },
    },
  ]
});

// 네비게이션 가드
router.beforeEach((to, from, next) => { 
  if (to.meta.auth && !store.getters.isLogin) { 
    next('/login');
    return;
  }
  next();
})

export default router;