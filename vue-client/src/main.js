import Vue from "vue";
import VueCompositionApi from '@vue/composition-api';
// import { VuelidatePlugin } from '@vuelidate/core';
import Vuelidate from 'vuelidate';

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
// Vue.use(VuelidatePlugin);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
