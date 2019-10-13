import produce from 'immer'
import { SET_CURRENT_USER } from '../actions/types'
import isEmpty from '../util/isEmpty'
import { AuthState } from '../types/authTypes'

const initialState: AuthState = {
  isAuthenticated: false,
}

export default (state = initialState, action: any) =>
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
