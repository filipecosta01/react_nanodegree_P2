/*
  Main component. Can handle the routes, has a fixed navbar and main area to
  display the content for each page/route.
*/

import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import './App.css'
import logo from '../../images/logo.png'

import NavBar from '../../containers/NavBarContainer'
import ShowPost from '../../containers/ShowPostContainer'
import ShowPosts from '../../containers/ShowPostsContainer'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedFilter: 'high'
    }
  }

  handleChangeFilter = value => this.setState({ selectedFilter: value })

  handleResetFilter = (event) => this.setState({ selectedFilter: 'high' })

  render() {
    const { selectedFilter } = this.state

    return (
      <div>
        <header>
          <div className="header-container">
            <Link to="/">
              <img src={logo} alt="Logo CS:GO" className="nav-image"/>
            </Link>
            <h1 className="nav-title">CS:GO Blog</h1>
          </div>
          <NavBar
            selectedFilter={selectedFilter}
            onChangeRoute={this.handleResetFilter}
            onChangeFilter={this.handleChangeFilter}
          />
        </header>

        <section className="body-main-container">
          <Route exact path="/" render={({ history }) => (
            <ShowPosts selectedFilter={selectedFilter} />
          )}/>
          <Route path="/categories/:categoryName/posts" render={({ history, match }) => (
            <ShowPosts
              onLoad={this.handleResetFilter}
              selectedFilter={selectedFilter}
              category={match.params.categoryName}
            />
          )
          }/>
          <Route exact path="/:categoryName/:postId" render={({ history, match }) => (
            <ShowPost
              history={history}
              postId={match.params.postId}
              onLoad={this.handleResetFilter}
              category={match.params.categoryName}
            />
          )}/>
        </section>
      </div>
    )
  }
}

export default App
