/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'rc-slider/assets/index.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import AppRouter from './pages/AppRouter'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

// use strict mode for dev environment for additional checks; this will cause components to be rendered twice resulting in double requests
// root.render(<React.StrictMode>{app}</React.StrictMode>)
root.render(app)
