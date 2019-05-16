import { createAction } from 'redux-actions'
import { FETCH_TERMS, } from './constants'

import { fetchTerms, } from './api'

export const fetchTermsAction = createAction(FETCH_TERMS, async () => await fetchTerms())
