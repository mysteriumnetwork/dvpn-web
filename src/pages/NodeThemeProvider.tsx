/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { useAppSelector } from '../commons/hooks'
import localStorage from '../commons/localStorageWrapper'
import { UIThemeLS } from '../types/theme'
import { localStorageKeys } from '../constants/local-storage.keys'
import themes from '../theme/themes'

const { UI_THEME } = localStorageKeys
const handleChangeEvent = (event: MediaQueryListEvent) => {
  if (event.matches) {
    localStorage.writeSettings(UI_THEME, { key: 'dark', preference: 'system' })
  } else {
    localStorage.writeSettings(UI_THEME, { key: 'light', preference: 'system' })
  }
}
export const NodeThemeProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const theme = useAppSelector(localStorage.selector<UIThemeLS>(UI_THEME))
  const storedThemeSettings = localStorage.getSettings(UI_THEME)
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  useEffect(() => {
    const systemPreferredTheme = { key: prefersDark ? 'dark' : 'light', preference: 'system' }
    if (theme?.preference === 'manual') {
      return
    }
    if (theme?.preference === 'system') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleChangeEvent)
    }
    if (!theme) {
      localStorage.writeSettings(UI_THEME, storedThemeSettings)
    }
    if (!storedThemeSettings) {
      localStorage.writeSettings(UI_THEME, systemPreferredTheme)
    }
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleChangeEvent)
    }
  }, [theme?.preference])

  return <ThemeProvider theme={theme?.key === 'dark' ? themes.dark : themes.light}>{children}</ThemeProvider>
}
