import { History } from 'history'
import {
  GET_POSTS,
  GET_POSTS_BY_TAG_SLUG,
  GET_POST,
  CREATE_POST,
  EDIT_POST,
} from './types'
import { PostData } from '../types/postTypes'

export const getPosts = (page?: number) => ({
  type: GET_POSTS,
  page,
})

export const getPost = (postCuid: string) => ({
  type: GET_POST,
  postCuid: postCuid,
})

export const getPostsByTagSlug = (tagSlug: string) => ({
  type: GET_POSTS_BY_TAG_SLUG,
  tagSlug: tagSlug,
})

interface CreatePostData {
  title: string
  subtitle: string
  content: string
  tag: string
}

export const createPost = (postData: CreatePostData, history: History) => ({
  type: CREATE_POST,
  postData,
  history,
})

export const editPost = (postCuid: string, postData: CreatePostData) => ({
  type: EDIT_POST,
  postCuid,
  postData,
})
