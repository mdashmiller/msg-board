// exporting store for testing purposes
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers/rootReducer'

const store = state => createStore(rootReducer, state, applyMiddleware(thunk))

export default store
