/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './AuthenticatedPage.module.scss'
import { useLocation } from 'react-router-dom'

import { ADMIN } from '../../constants/routes'
import Navigation from './Navigation/Navigation'
import { Identity } from 'mysterium-vpn-js'
import { RegistrationOverlay } from './RegistrationOverlay'
import { selectors } from '../../redux/selectors'
import { ReactElement } from 'react'
import identities from '../../commons/identities'
import { useAppSelector } from '../../commons/hooks'

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

interface Props {
  content?: ReactElement
}

const ContentWithNavigation = ({ content }: Props) => {
  const identity = useAppSelector(selectors.currentIdentitySelector)
  const { pathname } = useLocation()
  return (
    <div className={styles.page}>
      {displayOverlay(identity, pathname) && <RegistrationOverlay identity={identity} />}
      <div className={styles.navigation}>
        <Navigation />
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  )
}

export default ContentWithNavigation
