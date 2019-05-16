import typeToReducer from 'type-to-reducer'
import { Action } from 'redux-actions'
import { FETCH_TERMS } from './constants'

export default typeToReducer({
  [FETCH_TERMS]: {
    FULFILLED: (state, action: Action<string>) => ({
      ...state,
      mdText: action.payload
    })
  },
}, {
  mdText: '',
})
