/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ADMIN } from '../../constants/routes'
import Navigation from './Navigation/Navigation'
import { Identity } from 'mysterium-vpn-js'
import React, { ReactElement } from 'react'

import styled from 'styled-components'
import { Onboarding } from './Onboarding/Onboarding'

const Page = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  height: 100vh;
`

const Content = styled.div`
  background: ${({ theme }) => theme.bgNavigation};
  height: 100%;
  width: 100%;
  display: flex;
`

interface Props {
  content?: ReactElement
}

const WithNavigation = ({ content }: Props) => {
  return (
    <Page>
      <Navigation />
      <Content>{content}</Content>
      <Onboarding />
    </Page>
  )
}

export default WithNavigation
