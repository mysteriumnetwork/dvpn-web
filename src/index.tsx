/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { SnackbarUtilsConfigurator } from './commons/toasts'

import AppRouter from './Pages/AppRouter'
import { store } from './redux/store'

import { Hotkeys } from './Pages/Authenticated/Components/Hotkeys/Hotkeys'
import { NodeHealthcheckBarrier } from './Pages/NodeHealthcheckBarrier'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const app = (
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <SnackbarUtilsConfigurator />
      <HashRouter>
        <Hotkeys>
          <NodeHealthcheckBarrier>
            <AppRouter />
          </NodeHealthcheckBarrier>
        </Hotkeys>
      </HashRouter>
    </SnackbarProvider>
  </Provider>
)

// use strict mode for dev environment for additional checks; this will cause components to be rendered twice resulting in double requests
// root.render(<React.StrictMode>{app}</React.StrictMode>)
root.render(app)
