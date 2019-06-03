import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form/immutable'
import { History } from 'history'
import langReducer from './language/reducer'
import providerReducer from './provider/reducer'
import clientReducer from './client/reducer'
import termsReducer from './app/pages/Terms/reducer'

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    form: formReducer,
    language: langReducer,
    provider: providerReducer,
    client: clientReducer,
    terms: termsReducer
  })
}
