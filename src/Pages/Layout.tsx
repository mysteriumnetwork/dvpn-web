/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { Outlet } from 'react-router-dom'
import { NodeThemeProvider } from './NodeThemeProvider'
import { GlobalStyle } from './GlobalStyle'
import { OffsetToastsGlobalCSS, StyledToastContainer } from '../Components/Toasts/StyledToastContainer'
import { Hotkeys } from './Authenticated/Components/Hotkeys/Hotkeys'
import { IntercomLoader } from '../intercom/IntercomLoader'
import { GeneratedPasswordPopUp } from './Authenticated/Components/ClickBoarding/GeneratedPasswordPopUp'
import { StateInitializer } from './StateInitializer'
import { StateLoadingBarrier } from './StateLoadingBarrier'
import { NodeHealthcheckBarrier } from './NodeHealthcheckBarrier'

export const Layout = () => {
  return (
    <StateInitializer>
      <StateLoadingBarrier>
        <NodeHealthcheckBarrier>
          <NodeThemeProvider>
            <GlobalStyle />
            <OffsetToastsGlobalCSS />
            <StyledToastContainer limit={6} icon={false} hideProgressBar position="bottom-right" />
            <Hotkeys>
              <IntercomLoader />
              <Outlet />
              <GeneratedPasswordPopUp />
            </Hotkeys>
          </NodeThemeProvider>
        </NodeHealthcheckBarrier>
      </StateLoadingBarrier>
    </StateInitializer>
  )
}
