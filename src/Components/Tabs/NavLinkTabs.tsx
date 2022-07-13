/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { themeCommon } from '../../theme/themeCommon'

interface TabProps {
  $active?: boolean
}

const Tab = styled(Link)<TabProps>`
  text-decoration: none;

  :hover {
    color: ${({ $active }) => ($active ? themeCommon.colorWhite : themeCommon.colorGrayBlue2)};
  }

  text-align: center;
  background: ${({ $active }) => ($active ? themeCommon.colorKey : themeCommon.colorWhite)};
  border-radius: 100px;
  color: ${({ $active }) => ($active ? themeCommon.colorWhite : themeCommon.colorGrayBlue2)};
  font-size: ${themeCommon.fontSizeBigger};
  padding: 8px 12px 8px 12px;
  cursor: pointer;
`

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
`

interface Props {
  tabs?: { name: string; to: string; onChange?: (tab: string) => void }[]
}

export const NavLinkTabs = ({ tabs = [] }: Props) => {
  const { pathname } = useLocation()
  const [activeTab, setActiveTab] = useState<string>(tabs.find((t) => t.to === pathname)?.name || tabs[0].name || '')

  const handleSwitch = (name: string) => setActiveTab(name)

  const mappedTabs = tabs.map((t) => (
    <Tab
      to={t.to}
      key={t.name}
      $active={t.name === activeTab}
      onClick={() => {
        handleSwitch(t.name)
        t.onChange && t.onChange(t.name)
      }}
    >
      {t.name}
    </Tab>
  ))
  return <TabContainer>{mappedTabs}</TabContainer>
}
