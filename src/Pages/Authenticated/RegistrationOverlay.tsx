/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity } from 'mysterium-vpn-js'
import { CircularProgress } from '@material-ui/core'
import CopyToClipboard from '../../Components/CopyToClipboard/CopyToClipboard'
import { isInProgress, isRegistrationError } from '../../commons/identity.utils'
import styles from './RegistrationOverslay.module.scss'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useMemo } from 'react'
import Button from '../../Components/Buttons/Button'

interface Props {
  identity: Identity
}

export const RegistrationOverlay = ({ identity }: Props) => {
  const isError = useMemo(() => isRegistrationError(identity), [identity])
  const inProgress = useMemo(() => isInProgress(identity), [identity])

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.registration}>
        <div className={styles.registrationContent}>
          {inProgress && (
            <>
              <CircularProgress className="m-r-10" disableShrink />
              <h2>Your identity is being registered, please be patient...</h2>
            </>
          )}
          {isError && (
            <div className={styles.registrationContentError}>
              <h2>It seems your identity registration failed on blockchain...</h2>
              <Button extraStyle="outline-primary">Retry</Button>
            </div>
          )}
        </div>
        <div className={styles.registrationFooter}>
          <span className={styles.registrationIdentity}>{identity.id}</span>
          <CopyToClipboard text={identity.id} />
        </div>
        <HelpArrow />
      </div>
    </>
  )
}

const HelpArrow = () => {
  return (
    <>
      <div className={styles.intercomHelpPointer}>
        <ArrowBackIcon className={styles.intercomHelpPointerArrow} fontSize="large" />
        <h2>have questions? Talk to us!</h2>
      </div>
    </>
  )
}
