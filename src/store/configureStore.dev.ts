import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerActions, routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import createRootReducer from '../rootReducer'
import serverSentEvents from '../utils/serverSentEvents'
import {TIMER_UPDATE} from "../ui-kit/components/Timer";

const history = createHashHistory()

const rootReducer = createRootReducer(history)

const configureStore = (initialState?: any) => {
  // Redux Configuration
  const middleware = []
  const enhancers = []

  // Thunk Middleware
  middleware.push(thunk)

  // Promise Middleware
  middleware.push(promiseMiddleware)

  // ServerSentEvents Middleware
  middleware.push(serverSentEvents.middleware)

  const loggerIgnoreActions = [TIMER_UPDATE]

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
    predicate: (getState, action) => !loggerIgnoreActions.includes(action.type),
  })

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger)
  }

  // Router Middleware
  const router = routerMiddleware(history)
  middleware.push(router)

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions,
  }
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://extension.remotedev.io/docs/API/Arguments.html
      actionCreators,
    })
    : compose
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware))
  const enhancer = composeEnhancers(...enhancers)

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer)

  if ((module as any).hot) {
    ;(module as any).hot.accept(
      '../rootReducer', // eslint-disable-next-line global-require
      () => store.replaceReducer(require('../rootReducer').default),
    )
  }

  return store
}

export default { configureStore, history }
