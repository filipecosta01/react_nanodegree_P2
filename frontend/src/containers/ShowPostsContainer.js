import { connect } from 'react-redux'
import { getPosts, getPostComments, voteOnPost } from '../reducers/post'

import sortBy from 'sort-by'
import moment from 'moment'

import VOTE_SCORE from '../utils/VOTE_SCORE'

import ShowPostsView from '../views/ShowPostsView'

const headerInfo = (state, props) => {
  const element = VOTE_SCORE.filter((scoreToFilter) => scoreToFilter.value === props.selectedFilter)[0]
  return {
    title: props.category || 'All Categories',
    subtitle: element.label
  }
}

const stateComments = (state) => state.entities.comments

const statePosts = (state, props) => {
  const category = props.category || ''

  const sortByProp = VOTE_SCORE.filter((fieldToFilter) => fieldToFilter.value === props.selectedFilter)[0]
  // Return an array with all elements formated and comments as well...
  return Object.values(state.entities.posts)
    .map((post) => ({
      ...post,
      postDate: moment(post.timestamp).format('DD/MM/YYYY HH:mm:ss'),
      comments: Object.values(stateComments(state))
      .filter((comment) => comment.parentId === post.id && !comment.deleted)
      .map((comment) => ({
        ...comment,
        commentDate: moment(post.timestamp).format('DD/MM/YYYY HH:mm:ss')
      }))
      .sort(sortBy('voteScore'))
    }))
    .filter((post) => {
      if (post.deleted) {
        return false
      }
      if (category && post.category !== category) {
        return false
      }

      return true
    })
    .sort(sortBy(`${sortByProp.postSortField}`))
}

const mapStateToProps = (state, props) => ({
  onLoad: props.onLoad,
  category: props.category,
  posts: statePosts(state, props),
  headerInfo: headerInfo(state, props),
  selectedFilter: props.selectedFilter
})

const mapActionCreators = {
  getPosts,
  voteOnPost,
  getPostComments
}

export default connect(mapStateToProps, mapActionCreators)(ShowPostsView)
