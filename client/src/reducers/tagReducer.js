import produce from 'immer'
import { GET_TAGS, RECEIVED_TAGS, GET_TAG, RECEIVED_TAG } from '../actions/types';

const initialState = { loading: false }

export default (state=initialState, action) => 
    produce(state, draft => {
        switch(action.type) {
            case GET_TAG:
                draft.loading = true
                break
            case RECEIVED_TAG:
                draft.tag = action.payload
                draft.loading = false
                break
            case GET_TAGS:
                draft.loading = true
                break
            case RECEIVED_TAGS: 
                draft.data = action.payload
                draft.loading = false
                break
            default:
                break
        }
    })