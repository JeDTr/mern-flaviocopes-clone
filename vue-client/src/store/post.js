import _isEmpty from 'lodash-es/isEmpty';

import service from '@/service';

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
        const posts = await service.get(tagSlug ? `/post/tag/slug/${tagSlug}` : '/post/all')
        commit('GET_POSTS_SUCCESS', posts)
      } catch (error) {
        commit('GET_POSTS_FAILURE', error)
      }
    },
    async getPost({ commit }, cuid) {
      try {
        const post = await service.get(`/post/cuid/${cuid}`)
        commit('GET_POST_SUCCESS', post)
      } catch (error) {
        commit('GET_POST_FAILURE', error)
      }
    },
  }
}