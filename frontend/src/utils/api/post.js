import { API_BASE, xhr } from '../../utils'

export const PostAPI = {

  listAllPosts() {
    return xhr(`${API_BASE}/posts`, {
      method: 'GET'
    })
  },

  listAllComments(postId) {
    return xhr(`${API_BASE}/posts/${postId}/comments`, {
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

  votePost(id, option) {
    return xhr(`${API_BASE}/posts/${id}`, {
      method: 'POST',
      body: JSON.stringify({ option })
    })
  },

  editPost(id, data) {
    return xhr(`${API_BASE}/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },

  deletePost(postId) {
    return xhr(`${API_BASE}/posts/${postId}`, {
      method: 'DELETE'
    })
  }
}

export default PostAPI