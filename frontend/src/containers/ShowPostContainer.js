import { connect } from 'react-redux'
import { getPost, voteOnPost, getPostComments } from '../reducers/post'
import { voteOnComment } from '../reducers/comment'

import sortBy from 'sort-by'
import moment from 'moment'

import VOTE_SCORE from '../utils/VOTE_SCORE'

import ShowPostView from '../views/ShowPostView'

const statePosts = (state) => state.entities.posts
const stateComments = (state) => state.entities.comments

const statePost = (state, props) => {
  const postId = props.postId
  return Object.values(state.entities.posts)
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
  post: statePost(state, props)
})

const mapActionCreators = {
  getPost,
  voteOnPost,
  voteOnComment,
  getPostComments
}

export default connect(mapStateToProps, mapActionCreators)(ShowPostView)
