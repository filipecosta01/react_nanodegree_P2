import React, { Component } from 'react'

import './Post.css'
import { Panel } from 'react-bootstrap'
import PanelTitle from '../PanelTitle'

export class Post extends Component {
  render() {
    const {
      post,
      onAdd,
      onVote,
      onEdit,
      linkTo,
      showAdd,
      onDelete,
      showComments,
      showEditArea
    } = this.props

    return (
      <div className="Post">
        <Panel
          bsStyle="primary"
          className="panel-element"
          header={(
            <PanelTitle
              showAdd={showAdd}
              showActionButtons
              rightTitle={post.title}
              leftTitle={post.postDate}
              showEditArea={showEditArea}
              linkTo={linkTo}
              leftSubtitle={[
                `Comments: ${post.commentCount}`,
                `Vote score: ${post.voteScore}`
              ]}
              rightSubtitle={`Author: ${post.author}`}
              onAdd={() => onAdd()}
              onEdit={() => onEdit('post', post)}
              onDelete={() => onDelete('post', post)}
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
                  key={comment.id}
                  bsStyle="info"
                  className="panel-sub-element"
                  header={(
                    <PanelTitle
                      showEditArea={showEditArea}
                      showActionButtons
                      leftTitle={comment.commentDate}
                      rightSubtitle={`author: ${comment.author}`}
                      leftSubtitle={[`Vote score: ${comment.voteScore}`]}
                      onEdit={() => onEdit('comment', comment)}
                      onDelete={() => onDelete('comment', comment)}
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
