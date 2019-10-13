import { SET_CURRENT_USER, USER_LOGIN, USER_LOGOUT } from './types'
import { UserData } from '../types/authTypes'

export const loginUser = (userData: UserData) => ({
  type: USER_LOGIN,
  userData,
})

export const logoutUser = () => ({
  type: USER_LOGOUT,
})

export const setCurrentUser = (userData: UserData) => {
  return {
    type: SET_CURRENT_USER,
    payload: userData,
  }
}
