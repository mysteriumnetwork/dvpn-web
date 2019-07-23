import typeToReducer from 'type-to-reducer'
import { ACCEPT_TERMS } from './constants'

export interface TermsState {
  [key: string]: boolean
}

export default typeToReducer({
  [ACCEPT_TERMS]: (state, action) => ({
    ...state,
    [action.payload]: true
  }),
}, {})
