/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { NodeThemeProvider } from './NodeThemeProvider'
import { GlobalStyle } from './GlobalStyle'
import { Hotkeys } from './Authenticated/Components/Hotkeys/Hotkeys'
import { IntercomLoader } from '../intercom/IntercomLoader'
import { GeneratedPasswordModal } from './components/Modals/GeneratedPasswordModal'
import { StateInitializer } from './StateInitializer'
import { StateLoadingBarrier } from './StateLoadingBarrier'
import { NodeHealthcheckBarrier } from './NodeHealthcheckBarrier'

import 'react-toastify/dist/ReactToastify.css'

export const Layout = () => {
  return (
    <StateInitializer>
      <StateLoadingBarrier>
        <NodeHealthcheckBarrier>
          <NodeThemeProvider>
            <GlobalStyle />
            <Hotkeys />
            <IntercomLoader />
            <Suspense>
              <GeneratedPasswordModal />
            </Suspense>
            <Suspense>
              <ToastContainer limit={6} icon={false} hideProgressBar position="bottom-right" />
            </Suspense>
            <Outlet />
          </NodeThemeProvider>
        </NodeHealthcheckBarrier>
      </StateLoadingBarrier>
    </StateInitializer>
  )
}
