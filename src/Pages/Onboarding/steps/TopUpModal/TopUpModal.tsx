/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useMemo, useState } from 'react'
import { api } from '../../../../api/Api'
import { flooredAmount } from '../../../../commons/money.utils'
import Button from '../../../../Components/Buttons/Button'
import { Option, Radio } from '../../../../Components/Radio/Radio'
import styles from './TopUpModal.module.scss'
import { Identity } from 'mysterium-vpn-js'
import { RegistrationInfo } from '../Registration'
import { Modal } from '../../../../Components/Modal/Modal'
import { RegistrationOptions } from './RegistrationOptions'

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
      api.identityBalanceRefresh(identity.id)
    }, 5 * 1000)
    return () => clearInterval(interval)
  }, [])

  const isFree = () => registrationOption === 'free'
  const isMYSTReceived = isFree() ? true : flooredAmount(identity.balance, 3) >= registrationInfo.flooredFee
  const registrationOptions: Option[] = useMemo(
    () => [
      { value: 'free', label: 'Register for free', disabled: !isFreeRegistrationEligible },
      { value: 'myst', label: 'Deposit MYST token' },
      { value: 'fiat', label: 'Buy MYST with Credit card' },
    ],
    [],
  )

  const handleNext = async () => {
    setIsLoading(true)
    await onNext()
    setIsLoading(false)
  }

  const CMP = ({ o }: { o: RegistrationType }) => {
    switch (o) {
      case 'myst':
        return (
          <RegistrationOptions.MYST
            identity={identity}
            registrationFee={registrationInfo.flooredFee}
            isMYSTReceived={isMYSTReceived}
            chainName={currentChainName}
          />
        )
      case 'free':
        return <></>
      default:
        return <>Work in progress...</>
    }
  }

  return (
    <Modal open={open}>
      <div className={styles.content}>
        <TopUpInfo />
        <div className={styles.options}>
          <Radio options={registrationOptions} checked={registrationOption} onChange={setRegistrationOption} />
        </div>
        <div className={styles.topup}>
          <CMP o={registrationOption} />
        </div>
        <div className={styles.footer}>
          <Button onClick={onClose} extraStyle="gray">
            Back
          </Button>
          <Button onClick={handleNext} isLoading={isLoading} disabled={!isMYSTReceived}>
            Next
          </Button>
        </div>
      </div>
    </Modal>
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
