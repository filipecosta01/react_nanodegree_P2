import { PostAPI } from '../utils/api'
import { normalize, arrayOf } from 'normalizr'

import * as schemas from '../schemas'
import * as entities from './entities'

import {
  GET_POSTS,
  GET_POSTS_FAILURE,
  GET_POSTS_SUCCESS,

  ADD_POST,
  ADD_POST_FAILURE,
  ADD_POST_SUCCESS,

  GET_POST,
  GET_POST_FAILURE,
  GET_POST_SUCCESS,

  ADD_POST_VOTE,
  ADD_POST_VOTE_FAILURE,
  ADD_POST_VOTE_SUCCESS,

  EDIT_POST,
  EDIT_POST_FAILURE,
  EDIT_POST_SUCCESS,

  DELETE_POST,
  DELETE_POST_FAILURE,
  DELETE_POST_SUCCESS,

  GET_POST_COMMENTS,
  GET_POST_COMMENTS_FAILURE,
  GET_POST_COMMENTS_SUCCESS
} from '../actions'

/* Initial state default */
export const initialState = {
  error: null,
  messages: {
    postsLoadedFailure: false,
    postsLoadedSuccess: false
  },
  isLoading: false
}

/* Actions */
export const getPosts = () => async dispatch => {
  dispatch({ type: GET_POSTS })

  try {
    const response = await PostAPI.listAllPosts()
    return getPostsSuccess({ response, dispatch })
  } catch(error) {
    
  }
}

/* Actions Success */
export const getPostsSuccess = ({ response, dispatch }) => {
  dispatch({ type: GET_POSTS_SUCCESS })

  const normalized = normalize(response, arrayOf(schemas.post))
  const { posts } = normalized.entities

  dispatch(entities.mergePosts(posts))

  console.log(response)
  return response
}

/* Action Handler */
const ACTION_HANDLERS = {
  [GET_POSTS]: state => ({
    error: null,
    isLoading: true
  }),
  [GET_POSTS_FAILURE]: (state, { error }) => ({
    error,
    isLoading: false,
    messages: {
      ...state.messages,
      postsLoadedFailure: true,
      postsLoadedSuccess: false
    }
  }),
  [GET_POSTS_SUCCESS]: state => ({
    error: null,
    isLoading: false,
    messages: {
      ...state.messages,
      postsLoadedFailure: false,
      postsLoadedSuccess: true
    }
  }),
}

export default function postReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}