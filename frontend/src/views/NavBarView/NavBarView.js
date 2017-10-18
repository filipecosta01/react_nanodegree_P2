import React, { Component } from 'react'

import './NavBarView.css'

import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import VOTE_SCORE from '../../utils/VOTE_SCORE'
import CreatePost from '../../forms/CreatePost'

export class NavbarView extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isCreatePostModalOpen: false
    }
  }

  componentDidMount() {
    const { getCategories } = this.props

    getCategories()
  }

  onChange = (event) => {
    const { onChangeFilter } = this.props

    onChangeFilter(event.target.value)
  }

  onClickAddPost = () => {
    this.setState({ isCreatePostModalOpen: !this.state.isCreatePostModalOpen })
  }

  handleOnSubmitForm = (data) => {
    const { addPost } = this.props

    addPost(data).then(() => this.onClickAddPost())
  }

  displayCreatePostModal = () => {
    const { categories } = this.props
    const { isCreatePostModalOpen } = this.state

    return (
      <CreatePost
        headerTitle="Add New Post"
        categories={categories}
        isOpen={isCreatePostModalOpen}
        onSubmitForm={this.handleOnSubmitForm}
        onRequestClose={this.onClickAddPost}
      />
    )
  }

  render() {
    const { categories, selectedFilter, onChangeRoute } = this.props
    const { isCreatePostModalOpen } = this.state

    return (
      <div className="NavBarView">
        { isCreatePostModalOpen && this.displayCreatePostModal() }
        <div className="main-container">
          <select onChange={this.onChange} value={selectedFilter} className="select">
            {VOTE_SCORE.map((filter) => (
              <option key={filter.value} value={filter.value} className="option">
                {filter.label}
              </option>
            ))}
          </select>
          <ul className="categories-container">
            {categories && categories.length > 0 && categories.map((category) => (
              <Link
                key={category.name}
                onClick={onChangeRoute}
                className="category-list-element"
                to={`/categories/${category.path}/posts`}
              >
                <li>
                  > {category.name}
                </li>
              </Link>
            ))}
          </ul>
          <Button onClick={this.onClickAddPost} bsStyle="primary" className="button">Create Post</Button>
        </div>
      </div>
    )
  }
}

export default NavbarView