import { SET_CURRENT_USER, USER_LOGIN, USER_LOGOUT } from './types';

export const loginUser = userData => ({
    type: USER_LOGIN,
    userData
})

export const logoutUser = () => ({
    type: USER_LOGOUT
})

export const setCurrentUser = (userData) => {
    return {
        type: SET_CURRENT_USER,
        payload: userData
    }
}