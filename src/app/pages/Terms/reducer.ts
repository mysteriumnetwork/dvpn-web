import typeToReducer from 'type-to-reducer'
import { Action } from 'redux-actions'
import { FETCH_TERMS } from './constants'

export default typeToReducer({
  [FETCH_TERMS]: {
    PENDING: (state) => ({
      ...state,
      loading: true
    }),
    REJECTED: (state, action: Action<any>) => ({
      ...state,
      loading: false
    }),
    FULFILLED: (state, action: Action<string>) => ({
      ...state,
      mdText: action.payload,
      loading: false
    })
  },
}, {
  mdText: '',
})
