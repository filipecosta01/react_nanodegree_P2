import { PostAPI } from '../utils/api'
import { normalize } from 'normalizr'

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

    addPostFailure: false,
    addPostSuccess: false,

    postsLoadedFailure: false,
    postsLoadedSuccess: false,

    addPostVoteFailure: false,
    addPostVoteSuccess: false,

    postLoadedFailure: false,
    postLoadedSuccess: false,

    editPostFailure: false,
    editPostSuccess: false,

    deletePostFailure: false,
    deletePostSuccess: false,

    postCommentsLoadedFailure: false,
    postCommentsLoadedSuccess: false
  },
  isLoading: false
}

/* Actions */
export const addPost = (post) => async dispatch => {
  dispatch({ type: ADD_POST })

  try {
    const response = await PostAPI.addPost(post)
    return addPostSuccess({ response, dispatch })
  } catch (error) {
    dispatch({ type: ADD_POST_FAILURE })
  }
}

export const editPost = (id, data) => async dispatch => {
  dispatch({ type: EDIT_POST })

  try {
    const response = await PostAPI.editPost(id, data)
    return editPostSuccess({ response, dispatch })
  } catch (error) {
    dispatch({ type: EDIT_POST_FAILURE })
  }
}

export const deletePost = (id) => async dispatch => {
  dispatch({ type: DELETE_POST })

  try {
    const response = await PostAPI.deletePost(id)
    return deletePostSuccess({ response, dispatch })
  } catch (error) {
    dispatch({ type: DELETE_POST_FAILURE })
  }
}

export const getPosts = () => async dispatch => {
  dispatch({ type: GET_POSTS })

  try {
    const response = await PostAPI.listAllPosts()
    return getPostsSuccess({ response, dispatch })
  } catch(error) {
    dispatch({ type: GET_POSTS_FAILURE, error })
  }
}

export const getPost = (postId) => async dispatch => {
  dispatch({ type: GET_POST })

  try {
    const response = await PostAPI.getPostDetails(postId)
    return getPostSuccess({ response, dispatch })
  } catch(error) {
    dispatch({ type: GET_POSTS_FAILURE, error })
  }
}

export const getPostComments = (postId) => async dispatch => {
  dispatch({ type: GET_POST_COMMENTS })

  try {
    const response = await PostAPI.listAllComments(postId)
    return getPostCommentsSuccess({ response, dispatch })
  } catch(error) {
    dispatch({ type: GET_POST_COMMENTS_FAILURE, error })
  }
}

export const voteOnPost = (postId, voteType) => async dispatch => {
  dispatch({ type: ADD_POST_VOTE })

  try {
    const response = await PostAPI.votePost(postId, voteType)
    return voteOnPostSuccess({ response, dispatch })
  } catch(error) {
    dispatch({ type: ADD_POST_VOTE_FAILURE, error })
  }
}

/* Actions Success */
export const addPostSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.post)
  const { posts } = normalized.entities

  dispatch(entities.mergePosts(posts))

  dispatch({ type: ADD_POST_SUCCESS })

  return normalized.result
}

export const editPostSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.post)
  const { posts } = normalized.entities

  dispatch(entities.mergePosts(posts))

  dispatch({ type: EDIT_POST_SUCCESS })

  return normalized.result
}

export const deletePostSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.post)
  const { posts } = normalized.entities

  dispatch(entities.mergePosts(posts))

  dispatch({ type: DELETE_POST_SUCCESS })

  return normalized.result
}

export const getPostsSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, [ schemas.post ] )
  const { posts } = normalized.entities

  dispatch(entities.mergePosts(posts))

  dispatch({ type: GET_POSTS_SUCCESS })

  return normalized.result
}

/* Actions Success */
export const getPostSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.post )
  const { posts } = normalized.entities

  dispatch(entities.mergePosts(posts))

  dispatch({ type: GET_POST_SUCCESS })

  return normalized.result
}

export const getPostCommentsSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, [ schemas.comment ] )
  const { comments } = normalized.entities

  dispatch(entities.mergeComments(comments))

  dispatch({ type: GET_POST_COMMENTS_SUCCESS })

  return normalized.result
}

export const voteOnPostSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.post )
  const { posts } = normalized.entities

  dispatch(entities.mergePosts(posts))

  dispatch({ type: ADD_POST_VOTE_SUCCESS })

  return normalized.result
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

  [GET_POST]: state => ({
    error: null,
    isLoading: true
  }),
  [GET_POST_FAILURE]: (state, { error }) => ({
    error,
    isLoading: false,
    messages: {
      ...state.messages,
      postLoadedFailure: true,
      postLoadedSuccess: false
    }
  }),
  [GET_POST_SUCCESS]: state => ({
    error: null,
    isLoading: false,
    messages: {
      ...state.messages,
      postLoadedFailure: false,
      postLoadedSuccess: true
    }
  }),

  [ADD_POST_VOTE]: state => ({
    error: null,
    isLoading: true
  }),
  [ADD_POST_VOTE_FAILURE]: (state, { error }) => ({
    error,
    isLoading: false,
    messages: {
      ...state.messages,
      addPostVoteFailure: true,
      addPostVoteSuccess: false
    }
  }),
  [ADD_POST_VOTE_SUCCESS]: state => ({
    error: null,
    isLoading: false,
    messages: {
      ...state.messages,
      addPostVoteFailure: false,
      addPostVoteSuccess: true
    }
  }),

  [EDIT_POST]: state => ({
    error: null,
    isLoading: true
  }),
  [EDIT_POST_FAILURE]: (state, { error }) => ({
    error,
    isLoading: false,
    messages: {
      ...state.messages,
      editPostFailure: true,
      editPostSuccess: false
    }
  }),
  [EDIT_POST_SUCCESS]: state => ({
    error: null,
    isLoading: false,
    messages: {
      ...state.messages,
      editPostFailure: false,
      editPostSuccess: true
    }
  }),

  [DELETE_POST]: state => ({
    error: null,
    isLoading: true
  }),
  [DELETE_POST_FAILURE]: (state, { error }) => ({
    error,
    isLoading: false,
    messages: {
      ...state.messages,
      deletePostFailure: true,
      deletePostSuccess: false
    }
  }),
  [DELETE_POST_SUCCESS]: state => ({
    error: null,
    isLoading: false,
    messages: {
      ...state.messages,
      deletePostFailure: false,
      deletePostSuccess: true
    }
  }),

  [GET_POST_COMMENTS]: state => ({
    error: null,
    isLoading: true
  }),
  [GET_POST_COMMENTS_FAILURE]: (state, { error }) => ({
    error,
    isLoading: false,
    messages: {
      ...state.messages,
      postCommentsLoadedFailure: true,
      postCommentsLoadedSuccess: false
    }
  }),
  [GET_POST_COMMENTS_FAILURE]: state => ({
    error: null,
    isLoading: false,
    messages: {
      ...state.messages,
      postCommentsLoadedFailure: false,
      postCommentsLoadedSuccess: true
    }
  })
}

export default function postReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}