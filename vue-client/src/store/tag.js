import axios from 'axios';

export default {
  namespaced: true,
  state: {
    errors: {},
    tag: {
      tags: [],
      tag: {}
    }
  },
  mutations: {
    SET_ERRORS(state, errors) {
      state.errors = errors
    },
    GET_TAGS_SUCCESS(state, tags) {
      state.tag.tags = tags
      state.errors = {}
    },
    GET_TAGS_FAILURE(state, errors) {
      state.errors = errors;
    }
  },
  actions: {
    async getTags({ commit }) {
      try {
        const { data: tags } = await axios.get('/tag/all')
        commit('GET_TAGS_SUCCESS', tags)
      } catch (error) {
        commit('GET_TAGS_FAILURE', error.response.data)
      }
    }
  },
}