import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects'
import { GET_TAG, RECEIVED_TAG, GET_TAGS, RECEIVED_TAGS, GET_ERRORS, CREATE_TAG } from '../actions/types';

function* getTags () {
    try {
        const res = yield axios.get('/api/tag/all')
        yield put({
            type: RECEIVED_TAGS,
            payload: res.data,
        })
    }
    catch (error) {
        yield put({type: GET_ERRORS, payload: error.response.data})
    }
}

export function* getTagsWatcher () {
    yield takeLatest(GET_TAGS, getTags)
}

function* createTag ({tagData, history}) {
    try {
        const res = yield axios.post('/api/tag', tagData)
        history.push(`/edit-tag/id/${res.data._id}`)
    }
    catch(error) {
        yield put({type: GET_ERRORS, payload: error.response.data})
    }
}

export function* createTagWatcher () {
    yield takeLatest(CREATE_TAG, createTag)
}

function* getTag ({tagId}) {
    try {
        const res = yield axios.get(`/api/tag/id/${tagId}`)
        yield put({ type: RECEIVED_TAG, payload: res.data})
    }
    catch (error) {
        yield put({type: GET_ERRORS, payload: error.response.data})
    }
}

export function* getTagWatcher() {
    yield takeLatest(GET_TAG, getTag)
}