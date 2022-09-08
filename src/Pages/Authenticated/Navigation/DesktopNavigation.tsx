/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { LINK_DEFINITIONS, CONTROLLER_DEFINITIONS } from './definitions'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ReactComponent as Logo } from '../../../assets/images/navigation/logo.svg'
import { useMemo, useState } from 'react'
import zIndexes from '../../../constants/z-indexes'

const Content = styled.div`
  background: ${({ theme }) => theme.navigation.bg};
  padding: 0 18px 0 18px;
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 10px;
  position: relative;
`
interface openProps {
  $open: boolean
}

const Title = styled.div``
const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`
const FlexGrow = styled.div`
  flex-grow: 1;
`
const Margin = styled.div`
  margin-bottom: 70px;
`
const LogoLink = styled(Link)<openProps>`
  display: flex;
  margin-top: 30px;
  justify-content: flex-start;
  text-decoration: none;
  align-items: center;
  margin-bottom: 40px;
  gap: ${({ $open }) => ($open ? '40px' : 0)};
  transition: gap 0.3s;
  ${Title} {
    color: ${({ theme }) => theme.common.colorWhite};
    font-size: ${({ theme }) => theme.common.fontSizeHuge};
    font-weight: 900;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    max-width: ${({ $open }) => ($open ? '200px' : 0)};
    overflow: hidden;
    white-space: nowrap;
    transition: opacity 0.3s, max-width 0.3s;
  }
`
const Tooltip = styled.div``

const PlainLink = styled(NavLink)<openProps>`
  display: flex;
  justify-content: flex-start;
  position: relative;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  gap: ${({ $open }) => ($open ? '40px' : 0)};
  padding-right: ${({ $open }) => ($open ? '20px' : 0)};
  transition: gap 0.3s, padding-right 0.3s;

  ${Title} {
    text-decoration: none;
    color: ${({ theme }) => theme.common.colorWhite};
    font-size: ${({ theme }) => theme.common.fontSizeBig};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    max-width: ${({ $open }) => ($open ? '200px' : 0)};
    overflow: hidden;
    white-space: nowrap;
    transition: opacity 0.3s, max-width 0.3s;
  }
  ${Tooltip} {
    position: absolute;
    left: 150%;
    font-size: ${({ theme }) => theme.common.fontSizeSmall};
    color: ${({ theme }) => theme.common.colorWhite};
    z-index: ${zIndexes.menuTooltip};
    opacity: 0;
    transition: opacity 0.1s;
    &:before {
      content: attr(data-tooltip);
      position: absolute;
      background-color: ${({ theme }) => theme.common.colorKeyDark};
      left: 150%;
      top: -10px;
      padding: 5px 10px;
      border-radius: 50px;
    }
    &:after {
      content: '';
      position: absolute;
      width: 0px;
      height: 0px;
      left: 0px;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 5px solid ${({ theme }) => theme.common.colorKeyDark};
      transform: translateX(-2px) translateY(-7px);
    }
  }
  &:hover ${Tooltip} {
    opacity: ${({ $open }) => (!$open ? 1 : 0)};
  }
`

export const DesktopNavigation = () => {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen(!open)
  }
  const Links = useMemo(
    () =>
      LINK_DEFINITIONS.map(({ icon: Icon, path, name, subPaths = [] }) => (
        <PlainLink
          key={`desktop-menu-item-${path}`}
          $open={open}
          to={path}
          onClick={() => {
            setOpen(false)
          }}
        >
          <Icon $active={[...subPaths, path].includes(pathname)} />
          {name && <Title>{name}</Title>}
          <Tooltip data-tooltip={name} />
        </PlainLink>
      )),
    [pathname, open],
  )

  const Controllers = useMemo(() => {
    return CONTROLLER_DEFINITIONS.map(({ name, component: Component }) => {
      return <Component key={`desktop-menu-controller-${name}`} expanded={open} title={name} />
    })
  }, [open])
  return (
    <Content>
      <LogoLink $open={open} to="" onClick={toggleMenu}>
        <Logo />
        <Title>Node UI</Title>
      </LogoLink>
      <LinkContainer>{Links}</LinkContainer>
      <FlexGrow />
      {Controllers}
      <Margin />
    </Content>
  )
}
