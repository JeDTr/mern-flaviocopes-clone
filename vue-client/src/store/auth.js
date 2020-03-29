import _isEmpty from 'lodash-es/isEmpty';

import service from '@/service';

export default {
  namespaced: true,
  state: {
    errors: {},
    auth: {
      isAuthenticated: false,
      user: {}
    },
  },
  getters: {
    hasErrors: state => !_isEmpty(state.errors)
  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.auth.isAuthenticated = _isEmpty(user)
      state.auth.user = user;
      state.errors = {}
    },
    SET_ERRORS(state, errors) {
      state.errors = errors;
    }
  },
  actions: {
    async login({ commit }, data) {
      try {
        const { token } = await service.post('/user/login', data)

        service.setHeaderToken(token);
        service.saveToken(token);
        const user = service.getUserData(token);

        commit('SET_CURRENT_USER', user);
      } catch (error) {
        commit('SET_ERRORS', error)
      }
    },
    init() {
      // update user data from web storage
      const user = service.getUserData();

      if (!service.isTokenExpired) {
        service.setHeaderToken();
        this.commit('SET_CURRENT_USER', user)
      }
      else {
        service.clearToken();
      }
    },
  }
}