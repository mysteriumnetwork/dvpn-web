/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useLocation } from 'react-router-dom'

import { ADMIN } from '../../constants/routes'
import Navigation from './Navigation/Navigation'
import { Identity } from 'mysterium-vpn-js'
import { RegistrationOverlay } from './RegistrationOverlay'
import { selectors } from '../../redux/selectors'
import { ReactElement } from 'react'
import identities from '../../commons/identities'
import { useAppSelector } from '../../commons/hooks'
import styled from 'styled-components'

const { isEmpty, isRegistered } = identities

const displayOverlay = (identity: Identity, currentLocation: string): boolean => {
  if (isEmpty(identity)) {
    return false
  }

  if ([ADMIN].includes(currentLocation)) {
    return false
  }

  return !isRegistered(identity)
}

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
  const identity = useAppSelector(selectors.currentIdentitySelector)
  const { pathname } = useLocation()
  return (
    <Page>
      {displayOverlay(identity, pathname) && <RegistrationOverlay identity={identity} />}
      <Navigation />
      <Content>{content}</Content>
    </Page>
  )
}

export default WithNavigation
