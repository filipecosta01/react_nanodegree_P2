import React, { Component } from 'react'

import './Post.css'
import { Panel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PanelTitle from '../PanelTitle'

export class Post extends Component {
  render() {
    const { post, showComments, onVote, showEditArea } = this.props

    return (
      <div className="Post">
        <Panel
          bsStyle="primary"
          className="panel-element"
          header={(
            <PanelTitle
              showEditArea={showEditArea}
              showActionButtons
              linkTo={`/posts/${post.id}`}
              rightTitle={post.title}
              leftTitle={post.postDate}
              leftSubtitle={[
                `Comments: ${post.comments.length}`,
                `Vote score: ${post.voteScore}`
              ]}
              rightSubtitle={`Author: ${post.author}`}
              onUpVote={() => onVote(post.id, 'post', 'upVote')}
              onDownVote={() => onVote(post.id, 'post', 'downVote')}
            />
          )}>
          <span className="post-body">{post.body}</span>
          {showComments && post && post.comments && post.comments.length === 0 &&
            <h4 className="red-text">{`> No comments for this post, yet... <`}</h4>
          }
          {showComments && (
            <div className="posts-comments">
              {post && post.comments && post.comments.map((comment) => (
                <Panel
                  bgStyle="secondary"
                  className="panel-sub-element"
                  header={(
                    <PanelTitle
                      showEditArea={showEditArea}
                      showActionButtons
                      leftTitle={comment.commentDate}
                      rightSubtitle={`author: ${comment.author}`}
                      leftSubtitle={[`Vote score: ${comment.voteScore}`]}
                      onUpVote={() => onVote(comment.id, 'comment', 'upVote')}
                      onDownVote={() => onVote(comment.id, 'comment', 'downVote')}
                    />
                  )}
                >
                  {comment.body}
                </Panel>
              ))}
            </div>
          )}
        </Panel>
      </div>
    )
  }
}

export default Post
