import React, { Component } from 'react'

import './Post.css'
import { Panel } from 'react-bootstrap'
import PanelTitle from '../PanelTitle'

export class Post extends Component {
  render() {
    const { post } = this.props

    return (
      <div className="Post">
        <Panel
          bsStyle="primary"
          header={(
            <PanelTitle
              rightTitle={post.title}
              leftTitle={post.postDate}
              leftSubtitle={`Vote score: ${post.voteScore}`}
              rightSubtitle={`author: ${post.author}`}
            />
          )}>
          {post.body}
        </Panel>
      </div>
    )
  }
}

export default Post
