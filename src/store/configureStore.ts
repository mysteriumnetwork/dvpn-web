import configureStoreDev from './configureStore.dev'
import configureStoreProd from './configureStore.prod'
import { providerInitState, ProviderState } from '../provider/reducer'
import _ from 'lodash'
import { clientInitState } from '../client/reducer'

const selectedConfigureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export const { configureStore } = selectedConfigureStore

export const { history } = selectedConfigureStore

export const initState = (id: string = 'default') => {
  let initState = {
    provider: providerInitState,
    client: clientInitState,
    terms: {}
  }
  if (process.env.NODE_ENV !== 'production') {
    console.log('*initState', { ...initState })
  }
  try {
    const data = localStorage.getItem(`myst-${id}`)
    initState = _.defaultsDeep(data && JSON.parse(data), initState)
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('*initState', { ...initState })
  }
  return initState
}

export const saveState = (state: { provider: ProviderState }, id: string = 'default') => {
  try {
    const initialState = {
      provider: {
        residentialConfirm: _.get(state, 'provider.residentialConfirm'),
        identity: _.get(state, 'provider.identity'),
        originalLocation: _.get(state, 'provider.originalLocation'),
        trafficOption: _.get(state, 'provider.trafficOption')
      },
      client: {},
      terms: _.get(state, 'terms')
    }

    localStorage.setItem(`myst-${id}`, JSON.stringify(initialState))
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  }
}
