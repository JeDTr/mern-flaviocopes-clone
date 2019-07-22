import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects'
import jwt_decode from 'jwt-decode';

import { CLEAR_ERRORS, SET_CURRENT_USER, USER_LOGIN, USER_LOGOUT, GET_ERRORS } from '../actions/types';

function* loginUser (action) {
    try {
        yield put({type: CLEAR_ERRORS})
        const res = yield axios.post('/api/user/login', action.userData)
        const { token } = res.data;
        axios.defaults.headers.common['Authorization'] = token;
        localStorage.setItem('jwtToken', token);
        const decoded = jwt_decode(token);
        yield put({type: SET_CURRENT_USER, payload: decoded})
    }
    catch(error) {
        yield put({type: GET_ERRORS, payload: error.response.data})
    }
}

export function* loginUserWatcher () {
    yield takeLatest(USER_LOGIN, loginUser)
}

function* logoutUser () {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('jwtToken');
    yield put({type: SET_CURRENT_USER, payload: {}})
}

export function* logoutUserWatcher() {
    yield takeLatest(USER_LOGOUT, logoutUser)
}
