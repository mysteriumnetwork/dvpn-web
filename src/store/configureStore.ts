import configureStoreDev from './configureStore.dev'
import configureStoreProd from './configureStore.prod'
import { ProviderReducer } from '../provider/reducer'
import _ from 'lodash'

const selectedConfigureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export const { configureStore } = selectedConfigureStore

export const { history } = selectedConfigureStore

export const readState = (id: string = 'default') => {
  try {
    const data = localStorage.getItem(`myst-${id}`)
    return data && JSON.parse(data)
  } catch (e) {
    console.error(e)
  }

  return undefined
}

export const saveState = (state: {provider: ProviderReducer}, id: string = 'default') => {
  try {
    const initialState = {
      provider: {
        residentialConfirm: _.get(state, 'provider.residentialConfirm'),
        identity: _.get(state, 'provider.identity'),
        originalLocation: _.get(state, 'provider.originalLocation'),
        trafficOption: _.get(state, 'provider.trafficOption')
      }
    }

    localStorage.setItem(`myst-${id}`, JSON.stringify(initialState))
  } catch (e) {
    console.error(e)
  }
}
