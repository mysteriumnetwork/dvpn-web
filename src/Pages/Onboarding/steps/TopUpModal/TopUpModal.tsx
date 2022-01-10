/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useMemo, useState } from 'react'
import { tequilaClient } from '../../../../api/tequila-client'
import { money } from '../../../../commons/money.utils'
import Button from '../../../../Components/Buttons/Button'
import { Option, Radio } from '../../../../Components/Radio/Radio'
import styles from './TopUpModal.module.scss'
import { Identity } from 'mysterium-vpn-js'
import { RegistrationInfo } from '../Registration'
import { Modal } from '../../../../Components/Modal/Modal'
import { MYST } from './MYST'
import { Fiat } from './Fiat/Fiat'
import { myst } from '../../../../commons/myst.utils'
import { CircularProgress } from '@material-ui/core'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'

interface Props {
  onNext: () => Promise<void>
  onClose: () => void
  identity: Identity
  open: boolean
  currentChainName: string
  isFreeRegistrationEligible: boolean
  registrationInfo: RegistrationInfo
}

type RegistrationType = 'free' | 'myst' | 'fiat'

const TopUpModal = ({
  identity,
  onNext,
  open,
  onClose,
  isFreeRegistrationEligible,
  currentChainName,
  registrationInfo,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [registrationOption, setRegistrationOption] = useState<RegistrationType>(
    isFreeRegistrationEligible ? 'free' : 'myst',
  )

  useEffect(() => {
    const interval = setInterval(() => {
      tequilaClient.identityBalanceRefresh(identity.id)
    }, 5 * 1000)
    return () => clearInterval(interval)
  }, [])

  const isFree = () => registrationOption === 'free'
  const isRegistrationFeeReceived = isFree()
    ? true
    : money.flooredAmount(identity.balance, 3) >= registrationInfo.flooredFee
  const registrationOptions: Option[] = useMemo(
    () => [
      { value: 'free', label: 'Register for free', disabled: !isFreeRegistrationEligible },
      { value: 'myst', label: 'Deposit MYST token' },
      { value: 'fiat', label: 'Buy MYST with Credit or Debit card' },
    ],
    [],
  )

  const handleNext = async () => {
    setIsLoading(true)
    await onNext()
    setIsLoading(false)
  }

  const Controls = () => (
    <div className={styles.footer}>
      <Button onClick={onClose} extraStyle="gray">
        Back
      </Button>
      <Button onClick={handleNext} isLoading={isLoading} disabled={!isRegistrationFeeReceived}>
        Next
      </Button>
    </div>
  )

  const MystReceived = () => {
    return (
      <div className={styles.topupReceived}>
        {myst.displayMYST(identity.balance)}{' '}
        {!isRegistrationFeeReceived ? (
          <>
            received...
            <CircularProgress disableShrink />
          </>
        ) : (
          <CheckCircleOutline fontSize="large" />
        )}
      </div>
    )
  }

  return (
    <Modal open={open}>
      <div className={styles.content}>
        <TopUpInfo />
        <div className={styles.options}>
          <Radio options={registrationOptions} checked={registrationOption} onChange={setRegistrationOption} />
        </div>
        <Conditional visible={registrationOption === 'fiat'}>
          <Fiat
            onClose={onClose}
            isRegistrationFeeReceived={isRegistrationFeeReceived}
            mystReceived={<MystReceived />}
            controls={<Controls />}
          />
        </Conditional>
        <Conditional visible={registrationOption === 'myst'}>
          <MYST
            registrationFee={registrationInfo.flooredFee}
            chainName={currentChainName}
            mystReceived={<MystReceived />}
            controls={<Controls />}
          />
        </Conditional>
        <Conditional visible={registrationOption === 'free'}>
          <Controls />
        </Conditional>
      </div>
    </Modal>
  )
}

const Conditional = ({ visible, children }: { visible: boolean; children: any }) => {
  const style: React.CSSProperties | undefined = visible ? undefined : { display: 'none' }
  return (
    <div style={style} className={styles.topup}>
      {children}
    </div>
  )
}

const TopUpInfo = () => (
  <>
    <div className={styles.title}>Network registration</div>
    <div className={styles.subTitle}>
      To register your node you can either use free registration subsidised by Mysterium Network or deposit a small
      amount of MYST token to cover registration fee.
    </div>
    <div className={styles.note}>Note: free registrations are capped per day and might not be always available.</div>
  </>
)

export default TopUpModal
