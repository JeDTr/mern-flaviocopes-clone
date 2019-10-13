import axios from 'axios'
import { History } from 'history'
import { TagData } from '../types/tagTypes'
import { Dispatch } from 'redux'

import { GET_TAG, GET_TAGS, CREATE_TAG, GET_ERRORS } from './types'

export const getTags = () => ({
  type: GET_TAGS,
})

export const createTag = (tagData: TagData, history: History) => ({
  type: CREATE_TAG,
  tagData,
  history,
})

export const getTag = (tagId: string) => ({
  type: GET_TAG,
  tagId,
})

export const editTag = (tagId: string, tagData: TagData) => (
  dispatch: Dispatch,
) => {
  axios
    .put(`/api/tag/id/${tagId}`, tagData)
    .then(res => window.location.reload())
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}
