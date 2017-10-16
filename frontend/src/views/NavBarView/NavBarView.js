import React, { Component } from 'react'

import './NavBarView.css'

import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import VOTE_SCORE from '../../utils/VOTE_SCORE'

export class NavbarView extends Component {

  componentDidMount() {
    const { getCategories } = this.props

    getCategories()
  }

  onChange = (event) => {
    const { onChangeFilter } = this.props

    onChangeFilter(event.target.value)
  }

  render() {
    const { categories, selectedFilter, onChangeRoute } = this.props

    return (
      <div className="NavBarView">
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
          <Button bsStyle="primary" className="button">Create Post</Button>
        </div>
      </div>
    )
  }
}

export default NavbarView