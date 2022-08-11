/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { LINK_DEFINITIONS, CONTROLLER_DEFINITIONS } from './definitions'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Media } from '../../../commons/media'
import { useAppSelector } from '../../../commons/hooks'
import { useMemo, useState } from 'react'
import { myst } from '../../../commons/mysts'
import { configs } from '../../../commons/config'
import { selectors } from '../../../redux/selectors'
import { alphaToHex, themeCommon } from '../../../theme/themeCommon'
import { UI_THEME_KEY } from '../../../constants/remote-storage.keys'
import remoteStorage from '../../../commons/remoteStorage'

const Content = styled.div`
  background: ${({ theme }) => theme.bgNavigation};
  padding: 0 18px 0 18px;
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 10px;
  position: relative;
`
interface HoverProps {
  $hover: boolean
}
const ComponentContainer = styled.div<HoverProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  gap: ${({ $hover }) => ($hover ? '40px' : 0)};
  padding-right: ${({ $hover }) => ($hover ? '20px' : 0)};
  transition: gap 0.3s, padding-right 0.3s;
`
const PlainLink = styled(NavLink)<HoverProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  transition: width 1s;
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  gap: ${({ $hover }) => ($hover ? '40px' : 0)};
  padding-right: ${({ $hover }) => ($hover ? '20px' : 0)};
  transition: gap 0.3s, padding-right 0.3s;
`
const ThemeSwitcherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  justify-content: center;
  padding-bottom: 20px;
`
const ThemeStatus = styled.div<HoverProps>`
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  color: ${themeCommon.colorWhite + alphaToHex(0.5)};
  opacity: ${({ $hover }) => ($hover ? 1 : 0)};
  max-width: ${({ $hover }) => ($hover ? '200px' : 0)};
  transition: opacity 0.3s, max-width 0.3s;
`
const Title = styled.div<HoverProps>`
  text-decoration: none;
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  opacity: ${({ $hover }) => ($hover ? 1 : 0)};
  max-width: ${({ $hover }) => ($hover ? '200px' : 0)};
  overflow: hidden;
  white-space: nowrap;
  transition: opacity 0.3s, max-width 0.3s;
`
const LogoLink = styled(Link)`
  margin-top: 30px;
  margin-bottom: 41px;
`
const FlexGrow = styled.div`
  flex-grow: 1;
`
const Margin = styled.div`
  margin-bottom: 70px;
`
export const Navigation2 = () => {
  const theme = useAppSelector(remoteStorage.selector<string>(UI_THEME_KEY))
  const { pathname } = useLocation()
  const { earningsTokens } = useAppSelector(selectors.currentIdentitySelector)
  const config = useAppSelector(selectors.configSelector)
  const value = useMemo(() => Number(myst.toEtherBig(earningsTokens.wei).toFixed(2)), [earningsTokens.wei])
  const thresholdMyst = configs.zeroStakeSettlementThreshold(config)
  const [hover, setHover] = useState(false)

  const Links = useMemo(() => {
    return LINK_DEFINITIONS.map(({ icon: Icon, path, name, subPaths }) => {
      const hasSubPaths = subPaths !== undefined
      if (hasSubPaths) {
        subPaths?.push(path)
      }
      return name === 'Logo' ? (
        <LogoLink to={path}>
          <Icon />
        </LogoLink>
      ) : (
        <PlainLink $hover={hover} to={path}>
          <Icon $active={hasSubPaths ? subPaths.includes(pathname) : path === pathname} />
          <Title $hover={hover}>{name}</Title>
        </PlainLink>
      )
    })
  }, [pathname, hover])
  const Controllers = useMemo(() => {
    return CONTROLLER_DEFINITIONS.map(({ name, component: Component }) => {
      return name === 'Dark Mode' ? (
        <ComponentContainer $hover={hover}>
          <Component />
          <ThemeSwitcherContainer>
            <Title $hover={hover}>{name}</Title>
            <ThemeStatus $hover={hover}>{theme === 'dark' ? 'On' : 'Off'}</ThemeStatus>
          </ThemeSwitcherContainer>
        </ComponentContainer>
      ) : (
        <ComponentContainer $hover={hover}>
          <Component />
          {<Title $hover={hover}>{name}</Title>}
        </ComponentContainer>
      )
    })
  }, [hover, theme])
  return (
    <Content
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      {Links}
      <FlexGrow />
      {Controllers}
      <Margin />
    </Content>
  )
}
