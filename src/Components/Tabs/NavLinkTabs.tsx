/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { themeCommon } from '../../theme/themeCommon'
import { devices } from '../../theme/themes'

interface TabTitleProps {
  $active?: boolean
}

const activeCSS = css`
  :after {
    content: '';
    position: absolute;
    display: flex;
    justify-content: center;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 6px solid #d61f85;

    transform: translateX(30px);
    bottom: -6px;
    @media ${devices.mobileS} {
      transform: translateX(15px);
    }
  }
`
const Tab = styled(Link)`
  text-decoration: none;
  min-width: 100px;
  @media ${devices.mobileS} {
    min-width: 80px;
  }
`

const TabTitle = styled.div<TabTitleProps>`
  position: relative;

  background-color: ${({ $active, theme }) => ($active ? themeCommon.colorKey : theme.navTab.bgColor)};
  color: ${({ $active, theme }) => ($active ? themeCommon.colorWhite : theme.navTab.textColor)};
  font-size: ${themeCommon.fontSizeBigger};
  border-radius: 100px;
  padding: 8px 12px 8px 12px;
  cursor: pointer;
  min-width: 100px;
  text-align: center;
  @media ${devices.mobileS} {
    font-size: ${({ theme }) => theme.common.fontSizeSmall};
    min-width: 80px;
  }

  :hover {
    color: ${({ $active }) => ($active ? themeCommon.colorWhite : themeCommon.colorGrayBlue2)};
  }

  ${({ $active }) => $active && activeCSS}
  @media ${devices.tablet} {
    width: 33%;
  }
`

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  @media ${devices.tablet} {
    width: 100%;
    align-items: stretch;
    justify-content: center;
  }
`

interface Props {
  tabs?: { id?: string; name: string; to: string }[]
  onChange?: (tab: string) => void
  activateFirst?: boolean
}

export const NavLinkTabs = ({ tabs = [], onChange = () => {}, activateFirst }: Props) => {
  const { pathname } = useLocation()
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    if (activateFirst) {
      setActiveTab(tabs.find((t) => t.to === pathname)?.name || tabs[0].name || '')
    }
  }, [])

  const handleSwitch = (name: string) => {
    setActiveTab(name)
    onChange(name)
  }

  const mappedTabs = tabs.map((t) => (
    <Tab id={t.id} to={t.to} key={t.name} onClick={() => handleSwitch(t.name)}>
      <TabTitle $active={t.name === activeTab}>{t.name}</TabTitle>
    </Tab>
  ))
  return <TabContainer>{mappedTabs}</TabContainer>
}
