import { combineReducers } from 'redux'

import postReducer from './post'
import entitiesReducer from './entities'
import categoryReducer from './category'

const rootReducer = combineReducers({
  post: postReducer,
  category: categoryReducer,
  entities: entitiesReducer
})

export default rootReducer
