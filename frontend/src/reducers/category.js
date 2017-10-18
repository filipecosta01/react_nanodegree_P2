import { CategoryAPI } from '../utils/api'
import { normalize } from 'normalizr'

import * as schemas from '../schemas'
import * as entities from './entities'

import {
  GET_CATEGORIES,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_SUCCESS
} from '../actions'

/* Initial state default */
export const initialState = {
  error: null,
  messages: {
    categoriesLoadedFailure: false,
    categoriesLoadedSuccess: false,

    categoryPostsLoadedFailure: false,
    categoryPostsLoadedSuccess: false
  },
  isLoading: false
}

/* Actions */
export const getCategories = () => async dispatch => {
  dispatch({ type: GET_CATEGORIES })

  try {
    const response = await CategoryAPI.listAllCategories()
    return getCategoriesSuccess({ response, dispatch })
  } catch(error) {
    dispatch({ type: GET_CATEGORIES_FAILURE, error })
  }
}

/* Actions Success */
export const getCategoriesSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response.categories, [ schemas.category ] )
  const { categories } = normalized.entities

  dispatch(entities.mergeCategories(categories))

  dispatch({ type: GET_CATEGORIES_SUCCESS })

  return response
}

/* Action Handler */
const ACTION_HANDLERS = {
  [GET_CATEGORIES]: state => ({
    error: null,
    isLoading: true
  }),
  [GET_CATEGORIES_FAILURE]: (state, { error }) => ({
    error,
    isLoading: false,
    messages: {
      ...state.messages,
      categoriesLoadedFailure: true,
      categoriesLoadedSuccess: false
    }
  }),
  [GET_CATEGORIES_SUCCESS]: state => ({
    error: null,
    isLoading: false,
    messages: {
      ...state.messages,
      categoriesLoadedFailure: false,
      categoriesLoadedSuccess: true
    }
  })
}

export default function categoryReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}