import { API_BASE, xhr } from '../../utils'

export const CommentAPI = {

  addPostComment(postComment) {
    return xhr(`${API_BASE}/comments`, {
      method: 'POST',
      body: JSON.stringify(postComment)
    })
  },

  getPostCommentDetails(commentId) {
    return xhr(`${API_BASE}/comments/${commentId}`, {
      method: 'GET'
    })
  },

  votePostComment(id, option) {
    return xhr(`${API_BASE}/comments/${id}`, {
      method: 'POST',
      body: JSON.stringify({ option })
    })
  },

  editPostComment({ id, timestamp, body }) {
    return xhr(`${API_BASE}/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ timestamp, body })
    })
  },

  deletePostComment(commentId) {
    return xhr(`${API_BASE}/comments/${commentId}`, {
      method: 'DELETE'
    })
  }
}

export default CommentAPI