import produce from 'immer'
import { GET_POSTS, GET_POST, RECEIVED_POSTS, RECEIVED_POST } from '../actions/types';

const initialState = {
    loading: false,
}

export default (state=initialState, action) => 
    produce (state, draft => {
        switch (action.type) {
            case GET_POSTS:
                draft.loading = true
                break
            case RECEIVED_POSTS: 
                draft.data = action.payload
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