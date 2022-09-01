/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { alphaToHex, themeCommon } from '../../../theme/themeCommon'
import { ReactComponent as Logo } from '../../../assets/images/navigation/logo.svg'
import { ReactComponent as ArrowLeft } from '../../../assets/images/arrow-left.svg'
import { LINK_DEFINITIONS, CONTROLLER_DEFINITIONS } from './definitions'
import { NavLink, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import zIndexes from '../../../constants/z-indexes'

interface OverlayProps {
  $display: boolean
}
const Title = styled.div``
const Heading = styled.div``
const Container = styled.div``
const Arrow = styled(ArrowLeft)``
const Header = styled.div``
const Group = styled.div``

const PlainLink = styled(NavLink)<OverlayProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  gap: ${({ $display }) => ($display ? '40px' : 0)};
  padding-right: ${({ $display }) => ($display ? '20px' : 0)};
  opacity: ${({ $display }) => ($display ? 1 : 0)};
  max-width: ${({ $display }) => ($display ? '200px' : 0)};
  transition: gap 0.3s, padding-right 0.3s, opacity 0.3s, max-width 0.3s;
  ${Title} {
    text-decoration: none;
    color: ${({ theme }) => theme.common.colorWhite};
    font-size: ${({ theme }) => theme.common.fontSizeBig};
    overflow: hidden;
    white-space: nowrap;
    transition: opacity 0.3s, max-width 0.3s;
  }
`
const Overlay = styled.div<OverlayProps>`
  display: ${({ $display }) => ($display ? 'flex' : 'none')};
  height: 100vh;
  min-width: ${({ $display }) => ($display ? '100vw' : 0)};
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${zIndexes.overlay};
  background-color: ${themeCommon.colorDarkBlue + alphaToHex(0.77)};
  align-items: flex-start;
  transition: min-width 0.3s;
`
const Menu = styled.div<OverlayProps>`
  display: ${({ $display }) => ($display ? 'flex' : 'none')};
  height: 100vh;
  max-width: ${({ $display }) => ($display ? '70vw' : 0)};
  min-width: ${({ $display }) => ($display ? '60vw' : 0)};
  z-index: 1002;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.navigation.background};
  display: flex;
  flex-direction: column;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  transition: max-width 0.3s;
  ${Header} {
    display: flex;
    flex-direction: row;
    max-width: ${({ $display }) => ($display ? '100%' : 0)};
    align-items: flex-start;
    justify-content: space-between;
    padding: ${({ $display }) => ($display ? '18px 24px 10px 10px' : 0)};
    margin-bottom: ${({ $display }) => ($display ? '20px' : 0)};
    transition: padding 0.3s;
    ${Container} {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: ${({ $display }) => ($display ? '200px' : 0)};
      gap: ${({ $display }) => ($display ? '40px' : 0)};
      transition: gap 0.3s max-width 0.3s;
      ${Heading} {
        transition: opacity 0.3s, max-width 0.3s;
        opacity: ${({ $display }) => ($display ? 1 : 0)};
        max-width: ${({ $display }) => ($display ? '100px' : 0)};
        color: ${({ theme }) => theme.common.colorWhite};
        font-size: ${({ theme }) => theme.common.fontSizeHuge};
        font-weight: 900;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    ${Arrow} {
      height: 32px;
      max-width: ${({ $display }) => ($display ? '32px' : 0)};
      opacity: ${({ $display }) => ($display ? 1 : 0)};
      transition: max-width 0.3s opacity 0.3s;
      top: -2px;
      position: relative;
      :hover {
        cursor: pointer;
      }
    }
  }
  ${Group} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: ${({ $display }) => ($display ? '0 20px' : 0)};
    max-width: ${({ $display }) => ($display ? '200px' : 0)};
    opacity: ${({ $display }) => ($display ? 1 : 0)};
    transition: max-width 0.3s, opacity 0.3s;
    &:nth-of-type(even) {
      border-bottom: 1px dashed ${themeCommon.colorWhite + alphaToHex(0.05)} !important;
      gap: 20px;
      margin-bottom: 10px;
      padding-bottom: 20px;
    }
    &:nth-of-type(odd) {
      margin-top: 30px;
      gap: 20px;
    }
  }
`

interface Props {
  show: boolean
  toggleMenu: () => void
}

export const MobileMenu = ({ show, toggleMenu }: Props) => {
  const { pathname } = useLocation()
  const Links = useMemo(
    () =>
      LINK_DEFINITIONS.map(({ icon: Icon, path, name, subPaths = [] }) => (
        <PlainLink key={`mobile-menu-item-${path}`} $display={show} to={path} onClick={toggleMenu}>
          <Icon $active={[...subPaths, path].includes(pathname)} />
          {name && <Title>{name}</Title>}
        </PlainLink>
      )),
    [pathname, show],
  )
  const Controllers = useMemo(() => {
    return CONTROLLER_DEFINITIONS.map(({ name, component: Component }) => {
      return <Component key={`mobile-menu-controller-${name}`} expanded={show} title={name} />
    })
  }, [show])
  return (
    <>
      <Overlay $display={show} onClick={toggleMenu} />
      <Menu $display={show}>
        <Header>
          <Container>
            <Logo />
            <Heading>Node UI</Heading>
          </Container>
          <Arrow onClick={toggleMenu} />
        </Header>
        <Group>{Links}</Group>
        <Group>{show && Controllers}</Group>
      </Menu>
    </>
  )
}
