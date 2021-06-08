import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// Reducers
import userReducer from './reducers/user'
import notificationReducer from './reducers/notification'

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer
  // ...add reducers here
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store