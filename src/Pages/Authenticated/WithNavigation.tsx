/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactElement } from 'react'
import styled from 'styled-components'
import { Onboarding } from './Onboarding/Onboarding'
import { DesktopNavigation } from './Navigation/DesktopNavigation'
import { MobileNavigation } from './Navigation/MobileNavigation'
import { Media } from '../../commons/media'
import { devices } from '../../theme/themes'

const Page = styled.div`
  background: ${({ theme }) => theme.navigation.bg};
  display: flex;
  min-height: 100vh;
  height: 100vh;
  width: 100%;
  position: fixed;
`

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;

  background-color: ${({ theme }) => theme.navigation.contentBg};
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;

  @media ${devices.tablet} {
    overflow-x: auto;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

interface Props {
  content?: ReactElement
}

const WithNavigation = ({ content }: Props) => {
  return (
    <Page>
      <Media.Desktop>
        <DesktopNavigation />
      </Media.Desktop>
      <Media.Mobile>
        <MobileNavigation />
      </Media.Mobile>
      <Content>{content}</Content>
      <Onboarding />
    </Page>
  )
}

export default WithNavigation
