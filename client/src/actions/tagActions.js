import axios from 'axios';

import { GET_TAG, GET_TAGS, CREATE_TAG, GET_ERRORS } from './types';

export const getTags = () => ({
    type: GET_TAGS,
})

export const createTag = (tagData, history) => ({
    type: CREATE_TAG,
    tagData,
    history
})

export const getTag = (tagId) => ({
    type: GET_TAG,
    tagId
})

export const editTag = (tagId, tagData) => dispatch => {
    axios.put(`/api/tag/id/${tagId}`, tagData)
        .then(res => window.location.reload())
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}