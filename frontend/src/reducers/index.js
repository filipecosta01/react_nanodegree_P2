import { combineReducers } from 'redux'

import postReducer from './post'
import entitiesReducer from './entities'

const rootReducer = combineReducers({
  post: postReducer,
  entities: entitiesReducer
})

export default rootReducer
