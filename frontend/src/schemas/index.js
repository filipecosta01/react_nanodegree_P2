import { schema } from 'normalizr'

export const post = new schema.Entity('posts', { idAttribute: 'id' } )

export const comment = new schema.Entity('comments', { idAttribute: 'id' } )

export const category = new schema.Entity('categories', { idAttribute: 'name' })

category.define({
  posts: [ post ]
})

post.define({
  comments: [ comment ]
})
