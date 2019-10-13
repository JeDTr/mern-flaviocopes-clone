import produce from 'immer'
import {
  GET_POSTS,
  GET_POST,
  RECEIVED_POSTS,
  RECEIVED_POST,
} from '../actions/types'
import { PostState } from '../types/postTypes'

const initialState: PostState = {
  loading: false,
  data: [],
  page: 1,
}

export default (state = initialState, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_POSTS:
        draft.loading = true
        break
      case RECEIVED_POSTS:
        draft.data = draft.data.concat(action.payload)
        draft.page += 1
        draft.loading = false
        break
      case GET_POST:
        draft.loading = true
        break
      case RECEIVED_POST:
        draft.post = action.payload
        draft.loading = false
        break
      default:
        break
    }
  })
