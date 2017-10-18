/*
  Show all the posts in the main page.
  Posts are filtered by their category and possibly by the selectable filter
  in the navbar.
*/

import React, { Component } from 'react'

import './ShowPostsView.css'

import Post from '../../components/Post'
import CreatePost from '../../forms/CreatePost'

export class ShowPostsView extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedPost: {},
      isEditPostModalOpen: false
    }
  }

  componentDidMount() {
    const { getPosts } = this.props

    getPosts()
  }

  onRequestClosePostModal = () => {
    this.setState({ isEditPostModalOpen: false, selectedPost: {} })
  }

  onClickEdit = (type, element) => {
    const { isEditPostModalOpen } = this.state

    this.setState({
      isEditPostModalOpen: !isEditPostModalOpen,
      selectedPost: isEditPostModalOpen ? {} : element
    })
  }

  onClickDelete = (type, element) => {
    const { deletePost } = this.props

    deletePost(element.id)
  }

  handleOnSubmitForm = (data) => {
    const { editPost } = this.props
    const { post, ...otherProps } = data

    editPost(post.id, otherProps).then(() => this.setState({ isEditPostModalOpen: false, selectedPost: {} }))
  }

  onVote = (id, type, option) => {
    const { voteOnPost } = this.props
    if (type === 'post') {
      voteOnPost(id, option)
    }
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

  render() {
    const { posts, headerInfo } = this.props
    const { isEditPostModalOpen } = this.state

    return (
      <div className="ShowPostsView">
        <header>
          <h3 className="white-text capitalize">Showing Posts From {headerInfo.title}</h3>
          <h5 className="white-text">(filtered by {headerInfo.subtitle.toLowerCase()})</h5>
          <hr />
        </header>
        {isEditPostModalOpen && this.displayEditPostModal()}
        <section className="posts-container">
          {posts.length === 0 && (<h4 className="red-text">{`> No posts found <`}</h4>)}
          {posts && posts.length > 0 && posts.map((post) => (
            <div key={post.id} className="post-element">
              <Post
                post={post}
                showEditArea
                onVote={this.onVote}
                onEdit={this.onClickEdit}
                linkTo={`/${post.category}/${post.id}`}
                onDelete={this.onClickDelete}
              />
            </div>
          ))}
        </section>
      </div>
    )
  }
}

export default ShowPostsView
