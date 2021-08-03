/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import AppRouter from './Pages/AppRouter'
import { store } from './redux/store'

import { unregister } from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root'),
)

unregister() // cache busting
