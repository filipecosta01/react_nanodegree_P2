import {
  MERGE_POSTS,
  MERGE_COMMENTS,
  MERGE_CATEGORIES,

  DEMERGE_POST,
  DEMERGE_COMMENT,
  DEMERGE_CATEGORY
} from '../actions'

export const initialState = {
  posts: {},
  comments: {},
  categories: {}
}

const ACTION_HANDLERS = {
  [MERGE_POSTS]: (state, { posts }) => {
    return {
      ...state,
      posts: {
        ...state.posts,
        posts
      }
    }
  },
  [DEMERGE_POST]: (state, { post } ) => {
    const { ...posts } = state.posts
    delete posts[post]

    return {
      ...state,
      posts: {
        ...posts
      }
    }
  },

  [MERGE_COMMENTS]: (state, { comments }) => {
    return {
      ...state,
      comments: {
        ...state.comments,
        comments
      }
    }
  },
  [DEMERGE_COMMENT]: (state, { comment }) => {
    const { ...comments } = state.comments
    delete comment[comment]

    return {
      ...state,
      comments: {
        ...comments
      }
    }
  },

  [MERGE_CATEGORIES]: (state, { categories }) => {
    return {
      ...state,
      categories: {
        ...state.categories,
        categories
      }
    }
  },
  [DEMERGE_CATEGORY]: (state, { category }) => {
    const { ...categories } = state.categories
    delete categories[category]

    return {
      ...state,
      categories: {
        ...categories
      }
    }
  }
}

export default entitiesReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}