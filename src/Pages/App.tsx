/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ThemeProvider } from 'styled-components'
import themes from '../theme/themes'
import { Hotkeys } from './Authenticated/Components/Hotkeys/Hotkeys'
import { NodeHealthcheckBarrier } from './NodeHealthcheckBarrier'
import AppRouter from './AppRouter'
import React from 'react'
import { useAppSelector } from '../commons/hooks'
import remoteStorage from '../commons/remoteStorage'
import { UI_THEME_KEY } from '../constants/remote-storage.keys'
import { StateInitializer } from './StateInitializer'
import { OffsetToastsGlobalCSS, StyledToastContainer } from '../Components/Toasts/StyledToastContainer'
import { GlobalStyle } from './GlobalStyle'
import { IntercomLoader } from '../intercom/IntercomLoader'
import 'react-toastify/dist/ReactToastify.css'

export const App = () => {
  const theme = useAppSelector(remoteStorage.selector(UI_THEME_KEY)) || 'light'

  return (
    <ThemeProvider theme={theme === 'dark' ? themes.dark : themes.light}>
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
    </ThemeProvider>
  )
}
