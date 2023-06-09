/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Hotkeys } from './Authenticated/Components/Hotkeys/Hotkeys'
import { NodeHealthcheckBarrier } from './NodeHealthcheckBarrier'
import AppRouter from './AppRouter'
import React from 'react'
import { StateInitializer } from './StateInitializer'
import { OffsetToastsGlobalCSS, StyledToastContainer } from '../Components/Toasts/StyledToastContainer'
import { GlobalStyle } from './GlobalStyle'
import { IntercomLoader } from '../intercom/IntercomLoader'
import 'react-toastify/dist/ReactToastify.css'
import { NodeThemeProvider } from './NodeThemeProvider'
export const App = () => {
  return (
    <NodeThemeProvider>
      <GlobalStyle />
      <OffsetToastsGlobalCSS />
      <StyledToastContainer limit={6} icon={false} hideProgressBar position="bottom-right" />
      <Hotkeys>
        <NodeHealthcheckBarrier>
          <StateInitializer>
            <IntercomLoader />
            <AppRouter />
          </StateInitializer>
        </NodeHealthcheckBarrier>
      </Hotkeys>
    </NodeThemeProvider>
  )
}
