import { connect } from 'react-redux'
import { getPost, editPost, deletePost, voteOnPost, getPostComments } from '../reducers/post'
import { addComment, editComment, deleteComment, voteOnComment } from '../reducers/comment'

import sortBy from 'sort-by'
import moment from 'moment'

import ShowPostView from '../views/ShowPostView'

const statePosts = (state) => state.entities.posts
const stateComments = (state) => state.entities.comments
const stateCategories = (state) => Object.values(state.entities.categories)

/*
  Filter the post to be passed as props to the view according to the ID
  on the URL.
  Then transform the current post object to contain a human-readable date,
  include the comments, sorted by the vote score, and finally get the first
  element after all above.
*/
const statePost = (state, props) => {
  const postId = props.postId
  return Object.values(statePosts(state))
    .filter((post) => post.id === postId)
    .map((post) => ({
      ...post,
      postDate: moment(post.timestamp).format('DD/MM/YYYY HH:mm:ss'),
      comments: Object.values(stateComments(state))
        .filter((comment) => comment.parentId === post.id && !comment.deleted)
        .map((comment) => ({
          ...comment,
          commentDate: moment(post.timestamp).format('DD/MM/YYYY HH:mm:ss')
        }))
        .sort(sortBy('-voteScore'))
    }))[0]
}

const mapStateToProps = (state, props) => ({
  onLoad: props.onLoad,
  postId: props.postId,
  history: props.history,
  post: statePost(state, props),
  categories: stateCategories(state)
})

const mapActionCreators = {
  getPost,
  editPost,
  voteOnPost,
  deletePost,
  addComment,
  editComment,
  deleteComment,
  voteOnComment,
  getPostComments
}

export default connect(mapStateToProps, mapActionCreators)(ShowPostView)
