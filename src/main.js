import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import axios from "axios";
import VueAxios from "vue-axios";
Vue.prototype.axios = axios
Vue.prototype.VueAxios = VueAxios


import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
