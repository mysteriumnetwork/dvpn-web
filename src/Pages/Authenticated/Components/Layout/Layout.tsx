/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { selectors } from '../../../../redux/selectors'
import { useAppSelector } from '../../../../commons/hooks'
import styled, { css } from 'styled-components'
import { CircularSpinner } from '../../../../Components/CircularSpinner/CircularSpinner'
import { devices } from '../../../../theme/themes'
import { Header } from './Header'

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

const Content = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  @media ${devices.tablet} {
    padding-top: 120px;
  }
  ::-webkit-scrollbar {
    display: none;
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
  loading?: boolean
}

export const Layout = ({ logo, title, children, loading }: Props) => {
  const isAppLoading = useAppSelector(selectors.isAppLoading)
  const isSSELoading = useAppSelector(selectors.isSSELoading)

  const showSpinner = loading || isSSELoading || isAppLoading

  return (
    <Main>
      {showSpinner && <PageSpinner />}
      <Header logo={logo} title={title} />
      <Content>{children}</Content>
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

export const LayoutHeroRow = styled.div`
  display: flex;
  box-sizing: border-box;
  margin: 0 16px 0 16px;
  padding: 16px;
  background: ${({ theme }) => theme.bgLayoutHeroRow};
  overflow-x: scroll;
  overflow-y: hidden;
  border-radius: 35px;
  &&::-webkit-scrollbar {
    display: none;
  }
  @media ${devices.laptopL} {
    &&::-webkit-scrollbar {
      display: block;
    }
  }
  ${sharedRowCss};

  @media ${devices.tablet} {
    flex-direction: column;
    min-width: 375px;
  }
`

export const LayoutRow = styled.div`
  margin: 25px 32px 0 32px;
  ${sharedRowCss};
  @media ${devices.tablet} {
    margin: 25px 15px 0 15px;
  }
`
