/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react'
import { Alert, AlertTitle } from '@material-ui/lab'
import Collapse from '@material-ui/core/Collapse'

import { TextField } from '../../../Components/TextField'
import { DEFAULT_STAKE_AMOUNT } from '../../../constants/defaults'
import { tequilapiClient } from '../../../api/TequilApiClient'
import Button from '../../../Components/Buttons/Button'
import { parseError } from '../../../commons/error.utils'
import { DECIMAL_PART, Fees, Identity } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { isValidEthereumAddress } from '../../../commons/ethereum.utils'
import TopupModal from './TopupModal'
import { isFreeRegistration } from '../../../commons/config'
import './SettlmentSettings.scss'
import { currentCurrency } from '../../../commons/money.utils'

interface Props {
  callbacks: OnboardingChildProps
  identity: Identity
  config: Config
  fees: Fees
}

interface StateInterface {
  bountyPayoutAddress: string
  stake: number
  errors: string[]
}

const PayoutSettings = ({ callbacks, identity, config, fees }: Props) => {
  const [state, setState] = useState<StateInterface>({
    bountyPayoutAddress: '',
    stake: DEFAULT_STAKE_AMOUNT,
    errors: [],
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [topupOpen, setTopupOpen] = useState<boolean>(false)

  const errors = (...messages: string[]): void => {
    setState((cs) => ({ ...cs, errors: messages }))
  }

  const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setState((cs) => ({ ...cs, [prop]: value }))
  }

  const handleDone = () => {
    if (state.bountyPayoutAddress && !isValidEthereumAddress(state.bountyPayoutAddress)) {
      errors('Invalid Ethereum wallet address')
      return
    }
    Promise.resolve()
      .then(() => setIsLoading(true))
      .then(() =>
        state.bountyPayoutAddress
          ? tequilapiClient.payoutAddressSave(identity.id, state.bountyPayoutAddress)
          : Promise.resolve({}),
      )
      .then(() => register(identity.id))
      .then(() => {
        if (isFreeRegistration(config)) {
          setIsLoading(false)
          callbacks.nextStep()
          return
        } else {
          setTopupOpen(true)
        }
      })
      .catch((error) => {
        errors(parseError(error) || 'API call failed')
        setIsLoading(false)
      })
  }

  const register = (identity: string): Promise<void> => {
    return tequilapiClient.identityRegister(identity, {
      beneficiary: state.bountyPayoutAddress,
      stake: 10, // quadruple check mit Jaro
    })
  }

  return (
    <div className="step">
      <h1 className="step__title">Bounty Payout settings</h1>
      <p className="step__description">Fill in the following information to receive bounty payments.</p>
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
          <p className="input-group__label">Bounty Payout Address</p>
          <TextField
            handleChange={handleTextFieldsChange}
            value={state.bountyPayoutAddress}
            placeholder={'0x...'}
            stateName="bountyPayoutAddress"
          />
          <p className="input-group__help">
            Make sure you enter ERC-20 compatible wallet or MYST compatible exchange wallet address. You
            can enter this address later in 'Settings' page.
          </p>
        </div>
        <div className="step__content-buttons step__content-buttons--center m-t-40">
          <Button onClick={handleDone} isLoading={isLoading}>
            Next
          </Button>
        </div>
      </div>
      <TopupModal
        open={topupOpen}
        identity={identity}
        topupSum={fees.registration + state.stake * DECIMAL_PART}
        onClose={() => {
          setTopupOpen(false)
          setIsLoading(false)
        }}
        onTopup={() => {
          setTopupOpen(false)
          setIsLoading(false)
          callbacks.nextStep()
        }}
      />
    </div>
  )
}

export default PayoutSettings
