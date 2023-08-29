/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useAppSelector } from '../../../../commons/hooks'
import localStorage from '../../../../commons/localStorageWrapper'
import { UIThemeLS } from '../../../../types/theme'
import { localStorageKeys } from '../../../../constants/local-storage.keys'
import styled from 'styled-components'
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-regular-svg-icons'
import { faSun } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const { UI_THEME } = localStorageKeys

interface SelectionProps {
  $active?: boolean
}

const Icon = styled(FontAwesomeIcon)`
  height: 15px;
  width: 15px;
`
const Selection = styled.button<SelectionProps>`
  display: flex;
  width: 120px;
  height: 25px;
  background: none;
  align-items: center;
  box-sizing: border-box;
  justify-content: flex-start;
  gap: 15px;
  padding: 5px 10px;
  border-radius: 10px;
  color: ${({ theme }) => theme.text.colorMain};
  border: ${({ theme, $active }) => ($active ? `0.5px solid ${theme.text.colorSecondary}` : 'none')};
  :hover {
    cursor: pointer;
    border: ${({ theme, $active }) =>
      $active ? `0.5px solid ${theme.text.colorMain}` : `0.5px solid ${theme.text.colorSecondary}`};
  }
`
const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`

export const ThemeSwitch = () => {
  const theme = useAppSelector(localStorage.selector<UIThemeLS>(UI_THEME))
  return (
    <Container>
      <Selection
        $active={theme?.preference === 'system'}
        onClick={() => {
          localStorage.writeSettings(UI_THEME, { key: theme?.key, preference: 'system' })
        }}
      >
        <Icon icon={faCircleHalfStroke} />
        OS
      </Selection>

      <Selection
        $active={theme?.key === 'light' && theme?.preference !== 'system'}
        onClick={() => {
          localStorage.writeSettings(UI_THEME, { key: 'light', preference: 'manual' })
        }}
      >
        <Icon icon={faSun} />
        Light
      </Selection>
      <Selection
        $active={theme?.key === 'dark' && theme?.preference !== 'system'}
        onClick={() => {
          localStorage.writeSettings(UI_THEME, { key: 'dark', preference: 'manual' })
        }}
      >
        <Icon icon={faMoon} />
        Dark
      </Selection>
    </Container>
  )
}
