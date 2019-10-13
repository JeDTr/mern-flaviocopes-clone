import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'
import {
  GET_POSTS,
  GET_POSTS_BY_TAG_SLUG,
  RECEIVED_POSTS,
  GET_POST,
  RECEIVED_POST,
  CREATE_POST,
  EDIT_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
} from '../actions/types'
import { Action } from 'redux'
import { PostData } from '../types/postTypes'
import { History } from 'history'

function* getPosts({ page }: { type: string; page: number }) {
  try {
    const res = yield axios.get(`/api/post/all${page ? `?page=${page}` : ''}`)
    yield put({ type: RECEIVED_POSTS, payload: res.data })
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data })
  }
}

export function* getPostsWatcher() {
  yield takeLatest(GET_POSTS, getPosts)
}

function* getPostsByTagSlug({ tagSlug }: { type: string; tagSlug: string }) {
  try {
    const res = yield axios.get(`/api/post/tag/slug/${tagSlug}`)
    yield put({ type: RECEIVED_POSTS, payload: res.data })
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data })
  }
}

export function* getPostsByTagSlugWatcher() {
  yield takeLatest(GET_POSTS_BY_TAG_SLUG, getPostsByTagSlug)
}

function* getPost({ postCuid }: { type: string; postCuid: string }) {
  try {
    const res = yield axios.get(`/api/post/cuid/${postCuid}`)
    yield put({ type: RECEIVED_POST, payload: res.data })
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data })
  }
}

export function* getPostWatcher() {
  yield takeLatest(GET_POST, getPost)
}

function* createPost({
  postData,
  history,
}: {
  type: string
  postData: PostData
  history: History
}) {
  yield put({ type: CLEAR_ERRORS })
  try {
    const res = yield axios.post('/api/post', postData)
    history.push(`/edit-post/cuid/${res.data.cuid}`)
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data })
  }
}

export function* createPostWatcher() {
  yield takeLatest(CREATE_POST, createPost)
}

function* editPost({
  postCuid,
  postData,
}: {
  type: string
  postCuid: string
  postData: PostData
}) {
  console.log('EDIT POST')
  try {
    yield axios.put(`/api/post/cuid/${postCuid}`, postData)
    window.location.reload()
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data })
  }
}

export function* editPostWatcher() {
  yield takeLatest(EDIT_POST, editPost)
}
