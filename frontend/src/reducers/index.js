import { combineReducers } from 'redux'

import postReducer from './post'
import commentReducer from './comment'
import entitiesReducer from './entities'
import categoryReducer from './category'

const rootReducer = combineReducers({
  post: postReducer,
  comment: commentReducer,
  category: categoryReducer,
  entities: entitiesReducer
})

export default rootReducer
