import { GET_TAGS, GET_TAG } from '../actions/types';

const initialState = {}

export default function (state=initialState, action) {
    switch(action.type) {
        case GET_TAG:
            return {
                ...state,
                tag: action.payload
            }
        case GET_TAGS: 
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}