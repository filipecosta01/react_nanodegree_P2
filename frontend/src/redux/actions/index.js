/* Actions for posts */
export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'

export const ADD_POST = 'ADD_POST'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'

export const GET_POST = 'GET_POST'
export const GET_POST_FAILURE = 'GET_POST_FAILURE'
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS'

export const ADD_POST_VOTE = 'ADD_POST_VOTE'
export const ADD_POST_VOTE_FAILURE = 'ADD_POST_VOTE_FAILURE'
export const ADD_POST_VOTE_SUCCESS = 'ADD_POST_VOTE_SUCCESS'

export const EDIT_POST = 'EDIT_POST'
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE'
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'

export const DELETE_POST = 'DELETE_POST'
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const GET_POST_COMMENTS_SUCCESS = 'GET_POST_COMMENTS_SUCCESS'
export const GET_POST_COMMENTS_FAILURE = 'GET_POST_COMMENTS_FAILURE'

/* Actions for comments */
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE'
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS'

export const GET_COMMENT = 'GET_COMMENT'
export const GET_COMMENT_FAILURE = 'GET_COMMENT_FAILURE'
export const GET_COMMENT_SUCCESS = 'GET_COMMENT_SUCCESS'

export const ADD_COMMENT_VOTE = 'ADD_COMMENT_VOTE'
export const ADD_COMMENT_VOTE_FAILURE = 'ADD_COMMENT_VOTE_FAILURE'
export const ADD_COMMENT_VOTE_SUCCESS = 'ADD_COMMENT_VOTE_SUCCESS'

export const EDIT_COMMENT = 'EDIT_COMMENT'
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE'
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS'

export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'

/* Actions for categories */
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE'
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'

export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'
export const GET_CATEGORY_POSTS_FAILURE = 'GET_CATEGORY_POSTS_FAILURE'
export const GET_CATEGORY_POSTS_SUCCESS = 'GET_CATEGORY_POSTS_SUCCESS'

/* Actions for merging into entities state */
export const MERGE_POSTS = 'MERGE_POSTS'
export const MERGE_COMMENTS = 'MERGE_COMMENTS'
export const MERGE_CATEGORIES = 'MERGE_CATEGORIES'

/* Actions for removing from entities state */
export const DEMERGE_POST = 'DEMERGE_POST'
export const DEMERGE_COMMENT = 'DEMERGE_COMMENT'
export const DEMERGE_CATEGORY = 'DEMERGE_CATEGORY'

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
