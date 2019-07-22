import { GET_POSTS, GET_POSTS_BY_TAG_SLUG, GET_POST, CREATE_POST, EDIT_POST } from './types';

export const getPosts = () => ({
    type: GET_POSTS,
})

export const getPost = (postCuid) => ({
    type: GET_POST,
    postCuid: postCuid
})

export const getPostsByTagSlug = (tagSlug) => ({
    type: GET_POSTS_BY_TAG_SLUG,
    tagSlug: tagSlug
})

export const createPost = (postData, history) => ({
    type: CREATE_POST,
    postData, 
    history
})

export const editPost = (postCuid, postData) => ({
    type: EDIT_POST,
    postCuid,
    postData
})