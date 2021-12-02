/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import { Alert, AlertTitle } from '@material-ui/lab'
import Collapse from '@material-ui/core/Collapse'
import { useImmer } from 'use-immer'
import { Fees, Identity } from 'mysterium-vpn-js'
import { toastError } from '../../../commons/toast.utils'

import { TextField } from '../../../Components/TextField/TextField'
import { DEFAULT_STAKE_AMOUNT } from '../../../constants/defaults'
import { api } from '../../../api/Api'
import Button from '../../../Components/Buttons/Button'
import { parseTequilApiError } from '../../../commons/error.utils'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { isValidEthereumAddress } from '../../../commons/ethereum.utils'
import TopupModal from './TopupModal'
import './WithdrawalAddress.scss'
import { isUnregistered } from '../../../commons/identity.utils'

interface Props {
  callbacks: OnboardingChildProps
  identity: Identity
  config: Config
  fees: Fees
}

interface StateInterface {
  defaultWithdrawalAddress: string
  stake: number
  errors: string[]
}

const WithdrawalAddress = ({ callbacks, identity }: Props) => {
  const [state, setState] = useImmer<StateInterface>({
    defaultWithdrawalAddress: '',
    stake: DEFAULT_STAKE_AMOUNT,
    errors: [],
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isTopupOpen, setIsTopupOpen] = useState<boolean>(false)
  const [isFreeRegistrationEligible, setIsFreeRegistrationEligible] = useState<boolean>(false)
  const [currentChainName, setCurrentChainName] = useState<string>()
  useEffect(() => {
    const init = async () => {
      const eligibility = await api.freeRegistrationEligibility(identity.id)
      setIsFreeRegistrationEligible(eligibility.eligible)
      const summary = await api.chainSummary()
      setCurrentChainName(summary.chains[summary.currentChain])
    }
    init()
  }, [identity.id, isTopupOpen])

  const errors = (...messages: string[]): void => {
    setState((d) => {
      d.errors = messages
    })
  }

  const handleTextFieldsChange = (value: string) => {
    setState((d) => {
      d.defaultWithdrawalAddress = value
    })
  }

  const handleDone = async () => {
    if (state.defaultWithdrawalAddress && !isValidEthereumAddress(state.defaultWithdrawalAddress)) {
      errors('Invalid Ethereum wallet address')
      return
    }
    setIsLoading(true)

    try {
      if (state.defaultWithdrawalAddress) {
        await api.payoutAddressSave(identity.id, state.defaultWithdrawalAddress)
      }
      if (isUnregistered(identity)) {
        setIsTopupOpen(true)
      } else {
        callbacks.nextStep()
      }
    } catch (error) {
      errors(parseTequilApiError(error) || 'API call failed')
    }

    setIsLoading(false)
  }

  const register = async (identity: string): Promise<void> => {
    return api.identityRegister(identity, {
      beneficiary: state.defaultWithdrawalAddress,
      stake: 10, // quadruple check mit Jaro
    })
  }

  return (
    <div className="step">
      <h1 className="step__title">Default Withdrawal settings</h1>
      <p className="step__description">
        Fill in the following information to add a default withdrawal address for payments.
      </p>
      <div className="step__content m-t-20">
        <Collapse in={state.errors.length > 0}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {state.errors.map((err, idx) => (
              <div key={idx}>{err}</div>
            ))}
          </Alert>
        </Collapse>
        <div className="input-group">
          <p className="input-group__label">Default Withdrawal Address</p>
          <TextField onChange={handleTextFieldsChange} value={state.defaultWithdrawalAddress} placeholder={'0x...'} />
          <p className="input-group__help">
            Make sure you enter ERC-20 compatible wallet or MYST compatible exchange wallet address. You can enter this
            address later in 'Settings' page.
          </p>
        </div>
        <div className="step__content-buttons step__content-buttons--center m-t-40">
          <Button onClick={handleDone} isLoading={isLoading || isTopupOpen}>
            Next
          </Button>
        </div>
      </div>
      <TopupModal
        open={isTopupOpen}
        currentChainName={currentChainName}
        identity={identity}
        onClose={() => {
          setIsTopupOpen(false)
          setIsLoading(false)
        }}
        onTopup={async () => {
          try {
            await register(identity.id)
            setIsTopupOpen(false)
            setIsLoading(false)
            callbacks.nextStep()
            return Promise.resolve()
          } catch (e) {
            toastError('Registration failed.')
            return Promise.reject()
          }
        }}
        isFreeRegistrationEligible={isFreeRegistrationEligible}
      />
    </div>
  )
}

export default WithdrawalAddress
