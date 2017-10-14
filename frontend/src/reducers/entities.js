import {
  MERGE_POSTS,
  MERGE_COMMENTS,
  MERGE_CATEGORIES,

  DEMERGE_POST,
  DEMERGE_COMMENT,
  DEMERGE_CATEGORY
} from '../actions'

/* Initial state default */
export const initialState = {
  posts: {},
  comments: {},
  categories: {}
}

/* Action Creators */
export const mergePosts = (posts = {}) => ({
  type: MERGE_POSTS,
  posts
})

export const demergePost = (post = {}) => ({
  type: DEMERGE_POST,
  post
})

export const mergeComments = (comments = {}) => ({
  type: MERGE_COMMENTS,
  comments
})

export const demergeComment = (comment = {}) => ({
  type: DEMERGE_COMMENT,
  comment
})

export const mergeCategories = (categories = {}) => ({
  type: MERGE_CATEGORIES,
  categories
})

export const demergeCategory = (category = {}) => ({
  type: DEMERGE_CATEGORY,
  category
})

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

export default function entitiesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}