import * as React from 'react'
import { render } from 'react-dom'
import WebRoot from './web'
import { configureStore, history, initState, saveState } from './store/configureStore'
import './app.global.scss'
import { initAppStory } from './app/stories'
import _ from 'lodash'
import { Store } from 'redux'
import { RootState } from './rootState.type'
import unauthorized from './utils/unauthorized'
import { NAV_LOGIN } from './web/web.links'

const store = configureStore(initState()) as Store<RootState>
store.subscribe(_.debounce(() => saveState(store.getState()), 1000, { maxWait: 5000 }))

unauthorized.init(store, NAV_LOGIN)

render(
  <WebRoot store={store} history={history}/>,
  document.getElementById('root'),
  (): void => {
    initAppStory(store)
  }
)
