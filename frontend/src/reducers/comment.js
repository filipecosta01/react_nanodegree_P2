import { CommentAPI } from '../utils/api'
import { normalize } from 'normalizr'

import * as schemas from '../schemas'
import * as entities from './entities'

import {
  ADD_COMMENT_VOTE,
  ADD_COMMENT_VOTE_FAILURE,
  ADD_COMMENT_VOTE_SUCCESS
} from '../actions'

/* Initial state default */
export const initialState = {
  error: null,
  messages: {
    addCommentVoteFailure: false,
    addCommentVoteSuccess: false
  },
  isLoading: false
}

/* Actions */
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
  })
}

export default function commentReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}