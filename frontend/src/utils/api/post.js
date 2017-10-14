import { API_BASE, xhr } from '../../utils'

export const PostAPI = {

  listAllPosts() {
    return xhr(`${API_BASE}/posts`, {
      method: 'GET'
    })
  },

  addPost(post) {
    return xhr(`${API_BASE}/posts`, {
      method: 'POST',
      body: JSON.stringify(post)
    })
  },

  getPostDetails(postId) {
    return xhr(`${API_BASE}/posts/${postId}`, {
      method: 'GET'
    })
  },

  votePost({ id, option }) {
    return xhr(`${API_BASE}/posts/${id}`, {
      method: 'POST',
      body: JSON.stringify(option)
    })
  },

  editPost({ id, title, body }) {
    return xhr(`${API_BASE}/posts/${id}`, {
      method: 'POST',
      body: JSON.stringify({ title, body })
    })
  },

  deletePost(postId) {
    return xhr(`${API_BASE}/posts/${postId}`, {
      method: 'DELETE'
    })
  }
}

export default PostAPI