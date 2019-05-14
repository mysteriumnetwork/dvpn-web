import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'
import { History } from 'history'
import langReducer from './language/reducer'
import providerReducer from './provider/reducer'

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    form: formReducer,
    language: langReducer,
    provider: providerReducer
  })
}
