import Vue from "vue";
import Vuex from "vuex";

import auth from './auth';
import post from './post';
import tag from './tag';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    post,
    tag,
  },
});
