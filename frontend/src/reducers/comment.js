import { CommentAPI } from '../utils/api'
import { normalize } from 'normalizr'

import * as schemas from '../schemas'
import * as entities from './entities'

import {
  ADD_COMMENT,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,

  ADD_COMMENT_VOTE,
  ADD_COMMENT_VOTE_FAILURE,
  ADD_COMMENT_VOTE_SUCCESS,

  DELETE_COMMENT,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,

  EDIT_COMMENT,
  EDIT_COMMENT_FAILURE,
  EDIT_COMMENT_SUCCESS
} from '../actions'

/* Initial state default */
export const initialState = {
  error: null,
  messages: {
    addCommentFailure: false,
    addCommentSuccess: false,
    
    deleteCommentFailure: false,
    deleteCommentSuccess: false,

    editCommentFailure: false,
    editCommentSuccess: false,

    addCommentVoteFailure: false,
    addCommentVoteSuccess: false
  },
  isLoading: false
}

/* Actions */
export const addComment = (comment) => async dispatch => {
  dispatch({ type: ADD_COMMENT })

  try {
    const response = await CommentAPI.addPostComment(comment)
    return addCommentSuccess({ response, dispatch })
  } catch(error) {
    dispatch({ type: ADD_COMMENT_FAILURE, error })
  }
}

export const editComment = (id, data) => async dispatch => {
  dispatch({ type: EDIT_COMMENT })

  try {
    const response = await CommentAPI.editPostComment(id, data)
    return editCommentSuccess({ response, dispatch })
  } catch(error) {
    dispatch({ type: EDIT_COMMENT_FAILURE, error })
  }
}

export const deleteComment = (id) => async dispatch => {
  dispatch({ type: DELETE_COMMENT })

  try {
    const response = await CommentAPI.deletePostComment(id)
    return deleteCommentSuccess({ response, dispatch })
  } catch(error) {
    dispatch({ type: DELETE_COMMENT_FAILURE, error })
  }
}

export const voteOnComment = (commentId, voteType) => async dispatch => {
  dispatch({ type: ADD_COMMENT_VOTE })

  try {
    const response = await CommentAPI.votePostComment(commentId, voteType)
    return voteOnCommentSuccess({ response, dispatch })
  } catch(error) {
    dispatch({ type: ADD_COMMENT_VOTE_FAILURE, error })
  }
}

/* Actions Success */
export const addCommentSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.comment )
  const { comments } = normalized.entities

  dispatch(entities.mergeComments(comments))

  dispatch({ type: ADD_COMMENT_SUCCESS })

  return normalized.result
}

export const editCommentSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.comment )
  const { comments } = normalized.entities

  dispatch(entities.mergeComments(comments))

  dispatch({ type: EDIT_COMMENT_SUCCESS })

  return normalized.result
}

export const deleteCommentSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.comment )
  const { comments } = normalized.entities

  dispatch(entities.mergeComments(comments))

  dispatch({ type: DELETE_COMMENT_SUCCESS })

  return normalized.result
}

export const voteOnCommentSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.comment )
  const { comments } = normalized.entities

  dispatch(entities.mergeComments(comments))

  dispatch({ type: ADD_COMMENT_VOTE_SUCCESS })

  return normalized.result
}

/* Action Handler */
const ACTION_HANDLERS = {
  [ADD_COMMENT_VOTE]: state => ({
    error: null,
    isLoading: true
  }),
  [ADD_COMMENT_VOTE_FAILURE]: (state, { error }) => ({
    error,
    isLoading: false,
    messages: {
      ...state.messages,
      addCommentVoteFailure: true,
      addCommentVoteSuccess: false
    }
  }),
  [ADD_COMMENT_VOTE_SUCCESS]: state => ({
    error: null,
    isLoading: false,
    messages: {
      ...state.messages,
      addCommentVoteFailure: false,
      addCommentVoteSuccess: true
    }
  }),

  [ADD_COMMENT]: state => ({
    error: null,
    isLoading: true
  }),
  [ADD_COMMENT_FAILURE]: (state, { error }) => ({
    error,
    isLoading: false,
    messages: {
      ...state.messages,
      addCommentFailure: true,
      addCommentSuccess: false
    }
  }),
  [ADD_COMMENT_SUCCESS]: state => ({
    error: null,
    isLoading: false,
    messages: {
      ...state.messages,
      addCommentFailure: false,
      addCommentSuccess: true
    }
  }),

  [EDIT_COMMENT]: state => ({
    error: null,
    isLoading: true
  }),
  [EDIT_COMMENT_FAILURE]: (state, { error }) => ({
    error,
    isLoading: false,
    messages: {
      ...state.messages,
      editCommentFailure: true,
      editCommentSuccess: false
    }
  }),
  [EDIT_COMMENT_SUCCESS]: state => ({
    error: null,
    isLoading: false,
    messages: {
      ...state.messages,
      editCommentFailure: false,
      editCommentSuccess: true
    }
  }),

  [DELETE_COMMENT]: state => ({
    error: null,
    isLoading: true
  }),
  [DELETE_COMMENT_FAILURE]: (state, { error }) => ({
    error,
    isLoading: false,
    messages: {
      ...state.messages,
      deleteCommentFailure: true,
      deleteCommentSuccess: false
    }
  }),
  [DELETE_COMMENT_SUCCESS]: state => ({
    error: null,
    isLoading: false,
    messages: {
      ...state.messages,
      deleteCommentFailure: false,
      deleteCommentSuccess: true
    }
  })
}

export default function commentReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}