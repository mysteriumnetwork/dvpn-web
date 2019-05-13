import * as React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './app/components/Root/Root'
import { configureStore, history } from './store/configureStore'
import './app.global.scss'

const store = configureStore()

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root'),
)

if ((module as any).hot) {
  ;(module as any).hot.accept('./app/components/Root/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./app/components/Root/Root').default
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root'),
    )
  })
}
