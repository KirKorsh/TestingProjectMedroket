import "@/assets/styles/main.scss";

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia, PiniaVuePlugin } from 'pinia'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI);
Vue.use(PiniaVuePlugin);

const pinia = createPinia();

Vue.config.productionTip = false;

new Vue({
  router,
  pinia, 
  render: (h) => h(App),
}).$mount("#app");