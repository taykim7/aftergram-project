import Vue from 'vue'
import App from './App.vue'
import store from '@/store/index';
import router from '@/routes/index';
import { auth, db } from './plugins/firebase';
import Chart from 'chart.js/auto';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  auth,
  db,
  Chart,
}).$mount('#app')
