/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import AppRouter from './Pages/AppRouter'
import { store } from './redux/store'

import { Hotkeys } from './Pages/Authenticated/Components/Hotkeys/Hotkeys'
import { NodeHealthcheckBarrier } from './Pages/NodeHealthcheckBarrier'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const app = (
  <Provider store={store}>
    <HashRouter>
      <Hotkeys>
        <NodeHealthcheckBarrier>
          <AppRouter />
        </NodeHealthcheckBarrier>
        <ToastContainer position="bottom-right" />
      </Hotkeys>
    </HashRouter>
  </Provider>
)

// use strict mode for dev environment for additional checks; this will cause components to be rendered twice resulting in double requests
// root.render(<React.StrictMode>{app}</React.StrictMode>)
root.render(app)
