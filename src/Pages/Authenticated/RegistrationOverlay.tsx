/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity } from 'mysterium-vpn-js'
import CopyToClipboard from '../../Components/CopyToClipboard/CopyToClipboard'
import styles from './RegistrationOverslay.module.scss'
import { useMemo, useState } from 'react'
import Button from '../../Components/Buttons/Button'
import identities from '../../commons/identities'
import { CircularSpinner } from '../../Components/CircularSpinner/CircularSpinner'

const { isInProgress, isRegistrationError, isUnregistered } = identities

interface Props {
  identity: Identity
}

interface State {
  isRegistrationOpen: boolean
}

export const RegistrationOverlay = ({ identity }: Props) => {
  const [, setState] = useState<State>({ isRegistrationOpen: false })

  const isError = useMemo(() => isRegistrationError(identity), [identity])
  const isProgress = useMemo(() => isInProgress(identity), [identity])
  const isNotRegistered = useMemo(() => isUnregistered(identity), [identity])

  const showRegistration = (b: boolean = true) => {
    setState((cs) => ({ ...cs, isRegistrationOpen: b }))
  }

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.registration}>
        <div className={styles.registrationContent}>
          {isProgress && (
            <div className={styles.registrationContentRow}>
              <CircularSpinner />
              <h2>Your identity is being registered, please be patient...</h2>
            </div>
          )}
          {isError && (
            <div className={styles.registrationContentRow}>
              <h2>Unfortunately, node identity registration failed. Please click RETRY button to try again.</h2>
              <Button onClick={() => showRegistration()} extraStyle="outline-primary">
                Retry
              </Button>
            </div>
          )}
          {isNotRegistered && (
            <div className={styles.registrationContentRow}>
              <h2>Node identity needs to be registered. Please click REGISTER button to continue.</h2>
              <Button onClick={() => showRegistration()} extraStyle="outline-primary">
                Register
              </Button>
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
    <div className={styles.intercomHelpPointer}>
      <div className={styles.intercomHelpPointerArrow}>ICON PLACEHOLDER</div>
      <h2>have questions? Talk to us!</h2>
    </div>
  )
}
