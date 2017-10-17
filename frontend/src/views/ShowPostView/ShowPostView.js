import React, { Component } from 'react'

import './ShowPostView.css'

import Post from '../../components/Post'

export class ShowPostView extends Component {

  componentDidMount() {
    const { postId, getPost, getPostComments } = this.props

    getPost(postId)
      .then((result) => getPostComments(result))
  }

  onVote = (id, type, option) => {
    const { voteOnPost, voteOnComment } = this.props
    if (type === 'post') {
      voteOnPost(id, option)
    }

    if (type === 'comment') {
      voteOnComment(id, option)
    }
  }

  render() {
    const { post } = this.props

    return (
      <div className="ShowPostsView">
        <header>
          <h3 className="white-text capitalize">Showing Single Post Details</h3>
          <hr />
        </header>
        <section className="posts-container">
          {!post && <h3 className="red-text">Post does not exist</h3>}
          {post && (
            <div key={post.id} className="post-element">
              <Post
                post={post}
                showComments
                showEditArea
                onVote={this.onVote}
              />
            </div>
          )}
        </section>
      </div>
    )
  }
}

export default ShowPostView
