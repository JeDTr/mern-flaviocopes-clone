import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import tagReducer from './tagReducer';
import postReducer from './postReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    tags: tagReducer,
    posts: postReducer
})