import axios from 'axios';
import jwt_decode from 'jwt-decode';
import _isEmpty from 'lodash-es/isEmpty';

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
        const { data: { token } } = await axios.post('/user/login', data)
        axios.defaults.headers.common['Authorization'] = token;
        localStorage.setItem('jwtToken', token);
        const user = jwt_decode(token);
        commit('SET_CURRENT_USER', user);

      } catch (error) {
        commit('SET_ERRORS', error.response.data)
      }
    },
    init() {
      // axios
      axios.defaults.baseURL = "http://localhost:5000/api"

      // update user data from web storage
      const token = localStorage.getItem('jwtToken');
      const user = jwt_decode(token);

      if (user.exp > Date.now() / 1000) {
        axios.defaults.headers.common['Authorization'] = token;
        this.commit('SET_CURRENT_USER', user)
      }
      else {
        localStorage.removeItem('jwtToken')
      }
    },
  }
}