import React, { Component } from 'react'

import './ShowPostView.css'

import Post from '../../components/Post'
import CreatePost from '../../forms/CreatePost'
import CreateComment from '../../forms/CreateComment'

export class ShowPostView extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedPost: {},
      selectedComment: {},
      isEditPostModalOpen: false,
      isAddEditCommentModalOpen: false
    }
  }

  componentDidMount() {
    const { postId, getPost, getPostComments } = this.props

    getPost(postId)
      .then((result) => getPostComments(result))
  }

  onVote = (id, type, option) => {
    const { voteOnPost, voteOnComment } = this.props
    const actionPicker = {
      post: {
        action: (id, option) => voteOnPost(id, option)
      },
      comment: {
        action: (id, option) => voteOnComment(id, option)
      }
    }

    actionPicker[type].action(id, option)
  }

  onClickAdd = () => {
    const { isAddEditCommentModalOpen } = this.state
    this.setState({ isAddEditCommentModalOpen: !isAddEditCommentModalOpen })
  }

  onRequestClosePostModal = () => {
    this.setState({ isEditPostModalOpen: false, selectedPost: {} })
  }

  onRequestCloseCommentModal = () => {
    this.setState({ isAddEditCommentModalOpen: false, selectedComment: {} })
  }

  onClickEdit = (type, element) => {
    const { isEditPostModalOpen, isAddEditCommentModalOpen } = this.state

    const elementPropsPicker = {
      post: {
        isEditPostModalOpen: !isEditPostModalOpen,
        selectedPost: isEditPostModalOpen ? {} : element
      },
      comment: {
        isAddEditCommentModalOpen: !isAddEditCommentModalOpen,
        selectedComment: isAddEditCommentModalOpen ? {} : element
      }
    }

    this.setState({ ...elementPropsPicker[type] })
  }

  onClickDelete = (type, element) => {
    const { getPost, deletePost, deleteComment, history } = this.props
    const actionPicker = {
      post: {
        action: (element) => deletePost(element.id).then(() => history.replace('/'))
      },
      comment: {
        action: (element) => deleteComment(element.id).then(() => getPost(element.parentId))
      }
    }

    actionPicker[type].action(element)
  }

  handleOnSubmitForm = (data) => {
    const { getPost, editPost } = this.props
    const { post, ...otherProps } = data

    editPost(post.id, otherProps).then(() => this.setState({ isEditPostModalOpen: false, selectedPost: {} }))
  }

  handleOnSubmitCommentForm = (data) => {
    const { post, getPost, addComment, editComment } = this.props
    const { comment, ...otherProps } = data

    if (comment) {
      editComment(comment.id, otherProps)
    } else {
      addComment(otherProps).then(() => getPost(post.id))
    }

    this.setState({ isAddEditCommentModalOpen: false, selectedComment: {} })
  }

  displayEditPostModal = () => {
    const { categories } = this.props
    const { isEditPostModalOpen, selectedPost } = this.state

    return (
      <CreatePost
        post={selectedPost}
        headerTitle="Edit Post"
        categories={categories}
        isOpen={isEditPostModalOpen}
        onRequestClose={this.onRequestClosePostModal}
        onSubmitForm={this.handleOnSubmitForm}
      />
    )
  }

  displayCreateEditComment() {
    const { post } = this.props
    const { isAddEditCommentModalOpen, selectedComment } = this.state
    const hasComment = Object.values(selectedComment).length > 0

    return (
      <CreateComment
        post={post}
        comment={hasComment ? selectedComment : false}
        isOpen={isAddEditCommentModalOpen}
        onSubmitForm={this.handleOnSubmitCommentForm}
        onRequestClose={this.onRequestCloseCommentModal}
        headerTitle={`${Object.keys(selectedComment).length > 0 ? 'Edit' : 'Add'} Comment`}
      />
    )
  }

  render() {
    const { post } = this.props
    const { isEditPostModalOpen, isAddEditCommentModalOpen } = this.state

    return (
      <div className="ShowPostsView">
        <header>
          <h3 className="white-text capitalize">Showing Single Post Details</h3>
          <hr />
        </header>
        {isEditPostModalOpen && this.displayEditPostModal()}
        {isAddEditCommentModalOpen && this.displayCreateEditComment()}
        <section className="posts-container">
          {!post && <h3 className="red-text">Post does not exist</h3>}
          {post && (
            <div key={post.id} className="post-element">
              <Post
                showAdd
                post={post}
                showComments
                showEditArea
                onVote={this.onVote}
                onAdd={this.onClickAdd}
                onEdit={this.onClickEdit}
                onDelete={this.onClickDelete}
              />
            </div>
          )}
        </section>
      </div>
    )
  }
}

export default ShowPostView
