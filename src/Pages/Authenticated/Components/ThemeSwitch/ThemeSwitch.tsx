/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { MoonNavIcon, SunNavIcon } from '../../../../Components/Icons/NavigationIcons'
import { Switch } from '../../../../Components/Switch/Switch'
import { useAppSelector } from '../../../../commons/hooks'
import remoteStorage from '../../../../commons/remoteStorage'
import { UI_THEME_KEY } from '../../../../constants/remote-storage.keys'
import { themeCommon } from '../../../../theme/themeCommon'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40px;
  background: ${themeCommon.colorWhite}10;
  padding-bottom: 20px;
`

export const ThemeSwitch = () => {
  const theme = useAppSelector(remoteStorage.selector<string>(UI_THEME_KEY))
  const isDark = theme === 'dark'

  return (
    <>
      <Container>
        {isDark ? <MoonNavIcon /> : <SunNavIcon />}
        <Switch
          variant="key"
          size="small"
          checked={isDark}
          onChange={async () => {
            await remoteStorage.put<string>(UI_THEME_KEY, isDark ? 'light' : 'dark')
          }}
        />
      </Container>
    </>
  )
}
