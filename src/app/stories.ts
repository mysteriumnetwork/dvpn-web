import { Store } from 'redux'
import { RootState } from '../rootState.type'
import _ from 'lodash'
import { initAppFetchStory, initServerEventsStory } from '../provider/stories'
import { healthCheckAction } from './actions'

export const initAppStory = (store: Store<RootState>) => {
  Promise.resolve(store.dispatch(healthCheckAction()))
    .catch((e) => (process.env.NODE_ENV !== 'production') && console.error(e))

  initAppFetchStory(store.dispatch)
    .catch((e) => (process.env.NODE_ENV !== 'production') && console.error(e))

  initServerEventsStory(store.dispatch, _.get(store.getState(), 'provider.startedServices'))

}
