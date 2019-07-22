import produce from 'immer'
import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../util/isEmpty';

const initialState = {
    isAuthenticated: false,
}

export default (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_CURRENT_USER:
                draft.isAuthenticated = !isEmpty(action.payload)
                draft.user = action.payload
                break
            default:
                break
        }
    })