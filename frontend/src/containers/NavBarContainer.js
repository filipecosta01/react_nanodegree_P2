import { connect } from 'react-redux'

import { getCategories } from '../reducers/category'
import { addPost } from '../reducers/post'

import NavBarView from '../views/NavBarView'


const stateCategories = (state) => Object.values(state.entities.categories)

const mapStateToProps = (state, props) => ({
  categories: stateCategories(state),
  onChangeRoute: props.onChangeRoute,
  selectedFilter: props.selectedFilter,
  onChangeFilter: props.onChangeFilter
})
  
const mapActionCreators = {
  addPost,
  getCategories
}

export default connect(mapStateToProps, mapActionCreators)(NavBarView)
