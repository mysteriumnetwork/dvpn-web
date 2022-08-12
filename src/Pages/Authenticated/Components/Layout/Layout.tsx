/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PageHeader from '../../../../Components/LayoutHeader/LayoutHeader'
import React from 'react'
import { selectors } from '../../../../redux/selectors'
import { useAppSelector } from '../../../../commons/hooks'
import styled, { css } from 'styled-components'
import { Quality } from '../Quality/Quality'
import { NodeStatus } from '../NodeStatus/NodeStatus'
import { SettlementStatus } from '../SettlementStatus/SettlementStatus'
import { CircularSpinner } from '../../../../Components/CircularSpinner/CircularSpinner'
import { devices } from '../../../../theme/themes'
import { Media } from '../../../../commons/media'
import { Profile } from '../Profile/Profile'
import { Notifications } from '../Notifications/Notifications'
const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bgLayout};
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  @media ${devices.tablet} {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 32px 20px 32px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`

const HeaderGroup = styled.div`
  display: flex;
  gap: 26px;
  align-items: center;
`

const Content = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  @media ${devices.tablet} {
    padding-top: 150px;
  }
`

const Overlay = styled.div`
  width: 100%;
  opacity: 0.5;
  z-index: 1000;
  height: 100%;
  background: #dfdfdf;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 20px;
`

const Spinner = styled(CircularSpinner)`
  width: 6em;
  height: 6em;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 1001;
  position: absolute;
`

const PageSpinner = () => (
  <>
    <Overlay />
    <Spinner />
  </>
)

interface Props {
  title?: string
  logo?: React.ReactNode
  children?: React.ReactNode
  isLoading?: boolean
}

export const Layout = ({ logo, title, children, isLoading }: Props) => {
  const isAppLoading = useAppSelector(selectors.isAppLoading)
  const isSSELoading = useAppSelector(selectors.isSSELoading)

  const showSpinner = isLoading || isSSELoading || isAppLoading

  return (
    <Main>
      {showSpinner && <PageSpinner />}
      <Media.Desktop>
        <Header>
          <PageHeader logo={logo} name={title} />
          <NodeStatus />
          <Quality />
          <SettlementStatus />
          <HeaderGroup>
            <Notifications />
            <Profile />
          </HeaderGroup>
        </Header>
        <Content>{children}</Content>
      </Media.Desktop>
      <Media.Mobile>
        <Content>
          <PageHeader logo={logo} name={title} />
          {children}
        </Content>
      </Media.Mobile>
    </Main>
  )
}

const sharedRowCss = css`
  display: flex;
  flex-direction: row;
  gap: 20px;
  @media ${devices.tablet} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`

const cardCss = css`
  background: ${({ theme }) => theme.bgLayoutCardCss};
  border-radius: 20px;
  padding: 20px;
  @media ${devices.tablet} {
    width: 100%;
  }
`

export const LayoutHeroCardRow = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  justify-content: space-around;
  margin: 0 16px 0 16px;
  padding: 16px;
  background: ${({ theme }) => theme.bgLayoutHeroRow};

  border-radius: 35px;
  ${sharedRowCss};

  @media ${devices.tablet} {
    flex-direction: column;
    min-width: 375px;
  }
`
export const LayoutCardRow = styled.div`
  margin: 25px 32px 0 32px;
  ${cardCss};
  ${sharedRowCss};
`

export const LayoutUnstyledRow = styled.div`
  margin: 25px 32px 0 32px;
  ${sharedRowCss};
  @media ${devices.tablet} {
    margin: 25px 15px 0 15px;
  }
`

export const LayoutCard = styled.div`
  ${cardCss};
`
export const TableCard = styled.div`
  ${cardCss};
  width: 70%;
`
