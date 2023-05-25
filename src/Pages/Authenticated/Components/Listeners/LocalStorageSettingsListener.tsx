/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useAppSelector } from '../../../../commons/hooks'
import { useEffect } from 'react'
import localSettingsStorage from '../../../../commons/localSettingsStorage'
import { localStorageKeys } from '../../../../constants/local-storage.keys'
import { UIThemeLS } from '../../../../types/theme'
const { UI_THEME } = localStorageKeys
export const ThemeSettingsListener = () => {
  const theme = useAppSelector(localSettingsStorage.selector<UIThemeLS>(UI_THEME))
  const storedThemeSettings = localSettingsStorage.get(UI_THEME)
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  useEffect(() => {
    const systemPreferredTheme = { key: prefersDark ? 'dark' : 'light', userPreferred: false }
    if (theme?.userPreferred) {
      return
    }
    if (!theme) {
      localSettingsStorage.put(UI_THEME, storedThemeSettings)
    }
    if (!storedThemeSettings) {
      localSettingsStorage.put(UI_THEME, systemPreferredTheme)
    }
  }, [theme?.key, theme?.userPreferred])
  return null
}
