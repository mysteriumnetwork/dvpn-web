import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from '../rootReducer'
import promiseMiddleware from 'redux-promise-middleware'
import { socketIoMiddleware } from '../utils/socketIo'

const history = createHashHistory()
const rootReducer = createRootReducer(history)
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, promiseMiddleware, socketIoMiddleware, router)

function configureStore(initialState?: any) {
  return createStore(rootReducer, initialState, enhancer)
}

export default { configureStore, history }
