import { connect } from 'react-redux'
import { getPosts } from '../reducers/post'

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

const statePosts = (state, props) => {
  const category = props.category || ''

  const sortByProp = VOTE_SCORE.filter((fieldToFilter) => fieldToFilter.value === props.selectedFilter)[0]
  return Object.values(state.entities.posts)
  .map((post) => ({
    ...post,
    postDate: moment(post.timestamp).format('DD/MM/YYYY HH:mm:ss')
  }))
  .filter((post) => category && post.category === category || !category)
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
  getPosts
}

export default connect(mapStateToProps, mapActionCreators)(ShowPostsView)
