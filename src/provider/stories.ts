import { Dispatch, Store } from 'redux'
import { getFirstAccessPolicy, getOriginalLocation } from './pages/api'
import { setAccessPolicyAction, setLocationAction } from './actions'

export const initProviderStory = (store: Store) => {

  fetchLocationStory(store.dispatch).catch(console.error)

  startAccessPolicyFetchingStory(store.dispatch).catch(console.error)
}

export const fetchLocationStory = async (dispatch: Dispatch) => {
  const location = await getOriginalLocation()
  dispatch(setLocationAction(location))
}

let _accessPolicyInterval

export const startAccessPolicyFetchingStory = async (dispatch: Dispatch) => {

  let failedCount = 0
  const ALLOWED_FAILS = 10000

  const fetch = async () => {
    const accessPolicy = await getFirstAccessPolicy()
    if (accessPolicy) {
      failedCount = 0
      dispatch(setAccessPolicyAction(accessPolicy))
      return
    }

    failedCount++

    if (failedCount > ALLOWED_FAILS) {
      dispatch(setAccessPolicyAction(null))
    }
  }

  fetch().catch(console.error)

  if (!_accessPolicyInterval) {
    _accessPolicyInterval = setInterval(fetch, 3000)
  }
}

export const stopAccessPolicyFetchingStory = () => {
  clearInterval(_accessPolicyInterval)
}
