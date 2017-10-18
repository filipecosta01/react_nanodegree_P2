import React, { Component } from 'react'

import './ShowPostsView.css'

import Post from '../../components/Post'

export class ShowPostsView extends Component {

  componentDidMount() {
    const { getPosts } = this.props

    getPosts()
  }

  onVote = (id, type, option) => {
    const { voteOnPost } = this.props
    if (type === 'post') {
      voteOnPost(id, option)
    }
  }

  render() {
    const { posts, headerInfo } = this.props

    return (
      <div className="ShowPostsView">
        <header>
          <h3 className="white-text capitalize">Showing Posts From {headerInfo.title}</h3>
          <h5 className="white-text">(filtered by {headerInfo.subtitle.toLowerCase()})</h5>
          <hr />
        </header>
        <section className="posts-container">
          {posts.length === 0 && (<h5 className="white-text">No posts found</h5>)}
          {posts && posts.length > 0 && posts.map((post) => (
            <div key={post.id} className="post-element">
              <Post
                post={post}
                onVote={this.onVote}
                linkTo={`/posts/${post.id}`}
              />
            </div>
          ))}
        </section>
      </div>
    )
  }
}

export default ShowPostsView
