import { connect } from 'react-redux'
import { getPosts, editPost, deletePost, getPostComments, voteOnPost } from '../reducers/post'

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

const stateCategories = (state) => Object.values(state.entities.categories)

/*
  For all the posts to be passed as props to the view, iterate through the
  list of posts and transform the current post object to contain a
  human-readable date and sort by the selectable filter on the main page.
  Finally return all the posts after all the steps above.
*/

const statePosts = (state, props) => {
  const category = props.category || ''

  const sortByProp = VOTE_SCORE.filter((fieldToFilter) => fieldToFilter.value === props.selectedFilter)[0]
  return Object.values(state.entities.posts)
    .map((post) => ({
      ...post,
      postDate: moment(post.timestamp).format('DD/MM/YYYY HH:mm:ss')
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
  categories: stateCategories(state),
  headerInfo: headerInfo(state, props),
  selectedFilter: props.selectedFilter
})

const mapActionCreators = {
  getPosts,
  editPost,
  deletePost,
  voteOnPost,
  getPostComments
}

export default connect(mapStateToProps, mapActionCreators)(ShowPostsView)
