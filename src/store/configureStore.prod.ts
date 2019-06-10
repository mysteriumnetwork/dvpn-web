import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from '../rootReducer'
import promiseMiddleware from 'redux-promise-middleware'
import serverSentEvents from '../utils/serverSentEvents'

const history = createHashHistory()
const rootReducer = createRootReducer(history)
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, promiseMiddleware, serverSentEvents.middleware, router)

function configureStore(initialState?: any) {
  return createStore(rootReducer, initialState, enhancer)
}

export default { configureStore, history }
