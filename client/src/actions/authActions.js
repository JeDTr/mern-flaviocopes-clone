import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from './types';

export const loginUser = userData => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    })
    axios.post('/api/user/login', userData)
    .then(res => {
        const { token } = res.data;
        axios.defaults.headers.common['Authorization'] = token;
        localStorage.setItem('jwtToken', token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));

    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

export const logoutUser = () => dispatch => {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('jwtToken');
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (userData) => {
    return {
        type: SET_CURRENT_USER,
        payload: userData
    }
}