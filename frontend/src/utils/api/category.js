import { API_BASE, xhr } from '../../utils'

export const CategoryAPI = {
  listAllCategories() {
    return xhr(`${API_BASE}/categories`, {
      method: 'GET'
    })
  },

  getPostsFromCategory(category) {
    return xhr(`${API_BASE}/${category}/posts`, {
      method: 'GET'
    })
  }
}

export default CategoryAPI