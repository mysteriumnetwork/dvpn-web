/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ThemeProvider } from 'styled-components'
import themes from '../commons/themes'
import { Hotkeys } from './Authenticated/Components/Hotkeys/Hotkeys'
import { NodeHealthcheckBarrier } from './NodeHealthcheckBarrier'
import AppRouter from './AppRouter'
import { ToastContainer } from 'react-toastify'
import React from 'react'
import { useAppSelector } from '../commons/hooks'

export const App = () => {
  const theme = useAppSelector(({ app }) => app.theme)
  return (
    <ThemeProvider theme={theme === 'dark' ? themes.dark : themes.light}>
      <Hotkeys>
        <NodeHealthcheckBarrier>
          <AppRouter />
        </NodeHealthcheckBarrier>
      </Hotkeys>
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  )
}
