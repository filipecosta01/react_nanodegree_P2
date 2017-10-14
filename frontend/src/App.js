import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { PostAPI, CommentAPI, CategoryAPI } from './utils/api'

class App extends Component {

  componentDidMount() {
    CategoryAPI.getPostsFromCategory('react').then((postsCategory) => console.log(postsCategory))
    CategoryAPI.listAllCategories()
    .then(({ categories }) => {
      console.log(categories)
      return PostAPI.listAllPosts()
        .then((posts) => {
          console.log(posts)
          return posts.map((result) => {
          return CommentAPI.listAllComments(result.id)
            .then((comments) => console.log(comments))
        })}
      )
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
