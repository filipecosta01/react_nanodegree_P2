import { Schema, arrayOf } from 'normalizr'

export const post = new Schema('posts', { idAttribute: 'id' } )

export const comment = new Schema('comments', { idAttribute: 'id' } )

export const category = new Schema('categories', { idAttribute: 'name' })

category.define({
  posts: arrayOf(post)
})

post.define({
  comments: arrayOf(comment)
})
