import axios from 'axios';

import { GET_POSTS, GET_ERRORS, GET_POST } from './types';

export const getPosts = () => dispatch => {
    axios.get('/api/post/all')
        .then(res => {
            dispatch({
            type: GET_POSTS,
            payload: res.data
        })
        }   
        )
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const getPost = (postCuid) => dispatch => {
    axios.get(`/api/post/cuid/${postCuid}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const getPostsByTagSlug = (tagSlug) => dispatch => {
    axios.get(`/api/post/tag/slug/${tagSlug}`)
    .then(res => {
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    }   
    )
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

export const createPost = (postData, history) => dispatch => {
    axios.post('/api/post', postData)
        .then(res => history.push(`/edit-post/cuid/${res.data.cuid}`))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const editPost = (postCuid, postData) => dispatch => {
    axios.put(`/api/post/cuid/${postCuid}`, postData)
        .then(res => window.location.reload())
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}