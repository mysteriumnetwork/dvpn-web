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
import { alphaToHex, themeCommon } from '../../../../theme/themeCommon'
import { Media } from '../../../../commons/media'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40px;
  background: ${themeCommon.colorWhite}10;
  padding-bottom: 20px;
`
const Row = styled.div`
  display: flex;
  gap: 40px;
  justify-content: flex-start;
  align-items: center;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  justify-content: center;
  padding-bottom: 20px;
`
const Info = styled.div`
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
`
const Status = styled.div`
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  color: ${themeCommon.colorWhite + alphaToHex(0.5)};
`
export const ThemeSwitch = () => {
  const theme = useAppSelector(remoteStorage.selector<string>(UI_THEME_KEY))
  const isDark = theme === 'dark'

  return (
    <>
      <Media.Desktop>
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
      </Media.Desktop>
      <Media.Mobile>
        <Row>
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
          <Column>
            <Info>Dark mode</Info>
            <Status>{isDark ? 'On' : 'Off'}</Status>
          </Column>
        </Row>
      </Media.Mobile>
    </>
  )
}
