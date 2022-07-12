/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import themes from '../../../../commons/themes'
import { MoonNavIcon, SunNavIcon } from '../../../../Components/Icons/NavigationIcons'
import { Switch } from '../../../../Components/Switch/Switch'
import { useAppDispatch, useAppSelector } from '../../../../commons/hooks'
import { updateTheme } from '../../../../redux/app.slice'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40px;
  background: ${themes.common.colorWhite}10;
  padding-bottom: 20px;
`

export const ThemeSwitch = () => {
  const theme = useAppSelector(({ app }) => app.theme)
  const dispatch = useAppDispatch()

  const isDark = theme === 'dark'

  return (
    <Container>
      {isDark ? <MoonNavIcon /> : <SunNavIcon />}
      <Switch
        variant="key"
        size="small"
        checked={isDark}
        onChange={() => dispatch(updateTheme(isDark ? 'light' : 'dark'))}
      />
    </Container>
  )
}
