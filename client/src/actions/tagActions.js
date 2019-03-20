import axios from 'axios';

import { GET_TAG, GET_TAGS, GET_ERRORS } from './types';

export const getTags = () => dispatch => {
    axios.get('/api/tag/all')
        .then(res => dispatch({
            type: GET_TAGS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const createTag = tagData => dispatch => {
    axios.post('/api/tag', tagData)
        .then(res => dispatch({
            type: 'ADD_TAG'
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const loadTagData = (tagId) => dispatch => {
    axios.get(`/api/tag/id/${tagId}`)
        .then(res => dispatch({
            type: GET_TAG,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const editTag = (tagId, tagData) => dispatch => {
    axios.put(`/api/tag/id/${tagId}`, tagData)
        .then(res => window.location.reload())
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}