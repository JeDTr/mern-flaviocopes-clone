import axios from 'axios';
import _isEmpty from 'lodash-es/isEmpty';

export default {
  namespaced: true,
  state: {
    errors: {},
    post: {
      posts: [],
      post: {}
    },

  },
  getters: {
    hasData: state => !_isEmpty(state.post.post)
  },
  mutations: {
    SET_ERRORS(state, errors) {
      state.errors = errors
    },
    GET_POSTS_SUCCESS(state, posts) {
      state.post.posts = posts
      state.errors = {}
    },
    GET_POSTS_FAILURE(state, errors) {
      state.errors = errors;
    },
    GET_POST_SUCCESS(state, post) {
      state.post.post = post
      state.errors = {}
    },
    GET_POST_FAILURE(state, errors) {
      state.errors = errors
    },
  },
  actions: {
    async getPosts({ commit }, tagSlug) {
      try {
        const { data: posts } = await axios.get(tagSlug ? `/post/tag/slug/${tagSlug}` : '/post/all')
        commit('GET_POSTS_SUCCESS', posts)
      } catch (error) {
        commit('GET_POSTS_FAILURE', error.response.data)
      }
    },
    async getPost({ commit }, cuid) {
      try {
        const { data: post } = await axios.get(`/post/cuid/${cuid}`)
        commit('GET_POST_SUCCESS', post)
      } catch (error) {
        commit('GET_POST_FAILURE', error.response.data)
      }
    },
  }
}