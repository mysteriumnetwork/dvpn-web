/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PageHeader from '../../../../Components/LayoutHeader/LayoutHeader'
import React from 'react'
import { FullPageSpinner } from '../Spinner/FullPageSpinner'
import { selectors } from '../../../../redux/selectors'
import { useAppSelector } from '../../../../commons/hooks'
import styled, { css } from 'styled-components'
import themes from '../../../../commons/themes'
import { Quality } from '../Quality/Quality'
import { NodeStatus } from '../NodeStatus/NodeStatus'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${themes.current().backgroundLightgray};
  border-top-left-radius: 20px;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0 20px 32px;
  align-items: center;
  gap: 20px;
`

const Content = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
`

interface Props {
  title?: string
  logo?: React.ReactNode
  children?: React.ReactNode
  isLoading?: boolean
}

export const Layout = ({ logo, title, children, isLoading }: Props) => {
  const isSSELoading = useAppSelector(selectors.isSSELoading)

  const showSpinner = isLoading || isSSELoading

  return (
    <Main>
      <Header>
        <PageHeader logo={logo} name={title} />
        <NodeStatus />
        <Quality />
      </Header>
      <Content>
        {showSpinner && <FullPageSpinner />}
        {children}
      </Content>
    </Main>
  )
}

const sharedRowCss = css`
  display: flex;
  flex-direction: row;
  min-width: 1200px;
  gap: 20px;
`

const cardCss = css`
  background: ${themes.current().colorWhite};
  border-radius: 20px;
  padding: 20px;
`

export const LayoutHeroCardRow = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  margin: 0 16px 0 16px;
  padding: 16px;
  background: ${themes.current().colorGrayBlue}1a;
  border-radius: 35px;

  ${sharedRowCss};
`
export const LayoutCardRow = styled.div`
  margin: 25px 32px 0 32px;
  ${cardCss};
  ${sharedRowCss};
`

export const LayoutUnstyledRow = styled.div`
  margin: 25px 32px 0 32px;
  ${sharedRowCss};
`

export const LayoutCard = styled.div`
  ${cardCss};
`
