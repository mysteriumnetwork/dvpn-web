import * as React from 'react'
import { render } from 'react-dom'
import Root from './app/components/Root/Root'
import { configureStore, history, readState, saveState } from './store/configureStore'
import './app.global.scss'
import { initProviderStory } from './provider/stories'
import _ from 'lodash'

const store = configureStore(readState() || {})
store.subscribe(_.debounce(() => saveState(store.getState()), 1000, {maxWait: 5000}))

render(
  <Root store={store} history={history}/>,
  document.getElementById('root'),
  (): void => {
    initProviderStory(store)
  }
)
