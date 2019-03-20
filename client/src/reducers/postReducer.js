import { GET_POSTS, GET_POST } from '../actions/types';

const initialState = {}

export default function (state=initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                data: action.payload
            }
        case GET_POST:
            return {
                ...state,
                post: action.payload
            }
        default:
            return state;
    }
}