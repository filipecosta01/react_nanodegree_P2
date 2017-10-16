import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import './App.css'
import logo from '../../images/logo.png'

import NavBar from '../../containers/NavBarContainer'
import ShowPosts from '../../containers/ShowPostsContainer'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedFilter: 'recent'
    }
  }

  handleChangeFilter = value => this.setState({ selectedFilter: value })

  handleResetFilter = (event) => this.setState({ selectedFilter: 'recent' })

  render() {
    const { selectedFilter, history } = this.state

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
          <Route exact path="/" render={() => (
            <ShowPosts selectedFilter={selectedFilter} />
          )}/>
          <Route path="/create" render={({ history }) => (
            <div>
              Create post
            </div>
          )}/>
          <Route path="/categories/:categoryName/posts" render={({ history, match }) => (
            <ShowPosts
              onLoad={this.handleResetFilter}
              selectedFilter={selectedFilter}
              category={match.params.categoryName}
            />
          )
          }/>
          <Route path="/posts/:postId" render={({ history }) => (
            <div>
              View Details
            </div>
          )}/>
        </section>
      </div>
    )
  }
}

export default App
