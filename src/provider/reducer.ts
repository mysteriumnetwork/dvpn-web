import typeToReducer from 'type-to-reducer'
import { ACCESS_POLICIES, ORIGINAL_LOCATION } from './actions'
import { Action } from 'redux-actions'
import { OriginalLocation } from '../api/data/original-location'
import { AccessPolicy } from '../api/data/access-policy'

export default typeToReducer({
  [ORIGINAL_LOCATION]: (state, action: Action<OriginalLocation>) => ({
    ...state,
    originalLocation: action.payload
  }),

  [ACCESS_POLICIES]: (state, action: Action<AccessPolicy[]>) => ({
    ...state,
    accessPolicies: action.payload
  })
}, {})
