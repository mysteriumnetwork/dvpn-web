/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity } from 'mysterium-vpn-js'
import { CircularProgress } from '@material-ui/core'
import CopyToClipboard from '../../Components/CopyToClipboard/CopyToClipboard'
import { isInProgress, isRegistrationError, isUnregistered } from '../../commons/identity.utils'
import styles from './RegistrationOverslay.module.scss'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useMemo, useState } from 'react'
import Button from '../../Components/Buttons/Button'
import GenericModal from '../../Components/GenericModal/GenericModal'
import Registration from '../Onboarding/steps/Registration'

interface Props {
  identity: Identity
}

interface State {
  isRegistrationOpen: boolean
}

export const RegistrationOverlay = ({ identity }: Props) => {
  const [state, setState] = useState<State>({ isRegistrationOpen: false })

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
              <CircularProgress disableShrink />
              <h2>Your identity is being registered, please be patient...</h2>
            </div>
          )}
          {isError && (
            <div className={styles.registrationContentRow}>
              <h2>It seems your identity registration failed on blockchain...</h2>
              <Button onClick={() => showRegistration()} extraStyle="outline-primary">
                Retry
              </Button>
            </div>
          )}
          {isNotRegistered && (
            <div className={styles.registrationContentRow}>
              <h2>Your identity needs to be registered...</h2>
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
        <GenericModal
          isOpen={state.isRegistrationOpen}
          onClose={() => showRegistration(false)}
          onSave={() => {}}
          hideSave
          hideClose
        >
          <div className={styles.registrationModalContent}>
            <Registration nextStep={() => showRegistration(false)} />
          </div>
        </GenericModal>
      </div>
    </>
  )
}

const HelpArrow = () => {
  return (
    <div className={styles.intercomHelpPointer}>
      <ArrowBackIcon className={styles.intercomHelpPointerArrow} fontSize="large" />
      <h2>have questions? Talk to us!</h2>
    </div>
  )
}
