/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Collapse from '@material-ui/core/Collapse'
import { Alert, AlertTitle } from '@material-ui/lab'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { tequilaClient } from '../../../api/tequila-client'
import { tequila } from '../../../api/wrapped-calls'
import { parseError } from '../../../commons/error.utils'
import { isValidEthereumAddress } from '../../../commons/ethereum.utils'
import { isRegistrationError, isUnregistered } from '../../../commons/identity.utils'
import storage from '../../../commons/localStorage.utils'
import { toastError } from '../../../commons/toast.utils'
import Button from '../../../Components/Buttons/Button'
import { InputGroup } from '../../../Components/InputGroups/InputGroup'
import { TextField } from '../../../Components/TextField/TextField'
import { DOCS_METAMASK } from '../../../constants/urls'
import { selectors } from '../../../redux/selectors'
import styles from './Steps.module.scss'

const { api } = tequila

const registerIdentity = async (id: string, beneficiary: string) => {
  return api.identityRegister(id, {
    beneficiary,
    stake: 0,
  })
}

interface State {
  isLoading: boolean
  withdrawalAddress: string
  currentChainName: string
  errors: string[]
}

const Errors = ({ errors }: State) => (
  <Collapse in={errors.length > 0}>
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {errors.map((err, idx) => (
        <div key={idx}>{err}</div>
      ))}
    </Alert>
  </Collapse>
)

export type RegistrationInfo = {
  timestamp: number
  flooredFee: number
  withdrawalAddress?: string
}

const Registration = ({ nextStep }: StepProps) => {
  const identity = useSelector(selectors.currentIdentitySelector)
  const [state, setState] = useState<State>({
    isLoading: true,
    withdrawalAddress: '',
    currentChainName: '',
    errors: [],
  })

  useEffect(() => {
    const stored = storage.get<RegistrationInfo>(identity.id)
    if (stored && stored.withdrawalAddress !== undefined) {
      setState((d) => ({ ...d, withdrawalAddress: stored.withdrawalAddress! }))
    }
  }, [identity.id])

  useEffect(() => {
    const init = async () => {
      try {
        const { chains, currentChain } = await tequilaClient.chainSummary()
        setState((d) => ({
          ...d,
          currentChainName: chains[currentChain],
        }))
      } catch (err) {
        toastError(parseError(err))
      }
      setIsLoading(false)
    }
    init()
  }, [identity])

  const setIsLoading = (b: boolean) => setState((d) => ({ ...d, isLoading: b }))

  const onWalletAddressChange = (value: string) => {
    setState((d) => ({
      ...d,
      withdrawalAddress: value,
    }))
    const stored = storage.get<RegistrationInfo>(identity.id)
    storage.put(identity.id, { ...stored, withdrawalAddress: value })
  }

  const errors = (...messages: string[]): void => {
    setState((d) => ({
      ...d,
      errors: messages,
    }))
  }

  const isInvalidWithdrawalAddress = () => {
    return !isValidEthereumAddress(state.withdrawalAddress)
  }

  const handleDone = async () => {
    try {
      if (isInvalidWithdrawalAddress()) {
        errors('Invalid wallet address')
        return
      }

      setIsLoading(true)
      if (state.withdrawalAddress) {
        await api.payoutAddressSave(identity.id, state.withdrawalAddress)
      }
      if (isUnregistered(identity) || isRegistrationError(identity)) {
        await registerIdentity(identity.id, state.withdrawalAddress)
      }

      nextStep()
    } catch (error) {
      errors(parseError(error) || 'API call failed')
    }
    setIsLoading(false)
  }

  return (
    <div className={styles.step}>
      <h1 className={styles.title}>Withdrawal settings</h1>
      <p className={styles.description}>Add your ERC-20 Polygon compatible wallet for automatic withdrawals</p>
      <div id="separator" style={{ marginTop: '100px' }} />
      <div className={styles.content}>
        <Errors {...state} />
        <InputGroup
          label="Withdrawal Address (required)"
          help={
            <>
              Make sure withdrawal address is from ERC-20 Polygon compatible wallet (e.g. MetaMask or MyEtherWallet)!{' '}
              <a href={DOCS_METAMASK} target="_blank" rel="noopener noreferrer">
                Check here for instructions how to setup MYST token on MetaMask
              </a>
              .
            </>
          }
        >
          <TextField onChange={onWalletAddressChange} value={state.withdrawalAddress} placeholder={'0x...'} />
        </InputGroup>
        <div id="separator" style={{ marginTop: '40px' }} />
        <div className={classNames(styles.controls, styles.controlsCentered)}>
          <Button isLoading={state.isLoading} onClick={handleDone}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Registration
