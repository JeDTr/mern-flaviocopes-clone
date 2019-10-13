import { all } from 'redux-saga/effects'
import {
  getPostsWatcher,
  getPostsByTagSlugWatcher,
  getPostWatcher,
  createPostWatcher,
} from './post'
import { getTagWatcher, getTagsWatcher, createTagWatcher } from './tag'
import { loginUserWatcher, logoutUserWatcher } from './auth'

export default function* rootSaga() {
  yield all([
    getPostsWatcher(),
    getPostsByTagSlugWatcher(),
    getPostWatcher(),
    createPostWatcher(),
    getTagWatcher(),
    getTagsWatcher(),
    createTagWatcher(),
    loginUserWatcher(),
    logoutUserWatcher(),
  ])
}
