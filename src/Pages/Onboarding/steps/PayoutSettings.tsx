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
import Slider from '../../../Components/Slider/Slider'
import { DEFAULT_STAKE_AMOUNT } from '../../../constants/defaults'
import { tequilapiClient } from '../../../api/TequilApiClient'
import Button from '../../../Components/Buttons/Button'
import { parseError } from '../../../commons/error.utils'
import { DECIMAL_PART, Fees, Identity } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { isValidEthereumAddress } from '../../../commons/ethereum.utils'
import { Checkbox } from '../../../Components/Checkbox/Checkbox'
import TopupModal from './TopupModal'
import { isFreeRegistration } from '../../../commons/config'
import { Radio } from '@material-ui/core'
import { setChainId } from '../../../api/TequilAPIWrapper'
import './SettlmentSettings.scss'
import { chainId, L1ChainId, L2ChainId } from '../../../commons/config'

interface Props {
  callbacks: OnboardingChildProps
  identity: Identity
  config: Config
  fees: Fees
}

interface StateInterface {
  beneficiary: string
  stake: number
  errors: string[]
  hasReferralCode: boolean
  referralCode?: string
  chainId: number
}

const PayoutSettings = ({ callbacks, identity, config, fees }: Props) => {
  const [state, setState] = useState<StateInterface>({
    beneficiary: '',
    stake: DEFAULT_STAKE_AMOUNT,
    errors: [],
    hasReferralCode: false,
    chainId: chainId(config),
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [topupOpen, setTopupOpen] = useState<boolean>(false)

  const errors = (...messages: string[]): void => {
    setState({ ...state, errors: messages })
  }

  const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [prop]: event.target.value })
  }

  const handleStakeChanged = (event: any, newValue: number) => {
    setState({ ...state, stake: newValue })
  }

  const handleDone = () => {
    if (state.beneficiary && !isValidEthereumAddress(state.beneficiary)) {
      errors('Invalid Ethereum wallet address')
      return
    }
    if (state.hasReferralCode && !state.referralCode) {
      errors('Please enter referral code')
      return
    }
    setIsLoading(true)

    register(identity.id)
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
      beneficiary: state.beneficiary,
      stake: state.stake * DECIMAL_PART,
      referralToken: state.referralCode,
    })
  }

  return (
    <div className="step">
      <h1 className="step__title">Payout settings</h1>
      <p className="step__description">Fill in the following information to receive payments.</p>
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
          <p className="input-group__label">Ethereum wallet address</p>
          <TextField
            handleChange={handleTextFieldsChange}
            value={state.beneficiary}
            placeholder={'0x...'}
            stateName="beneficiary"
          />
          <p className="input-group__help">Fill in the following information to receive payments.</p>
        </div>
        <div className="input-group m-t-50">
          <p className="input-group__label m-b-15">Set your stake amount</p>
          <Slider
            label="Stake amount"
            disabled={state.hasReferralCode}
            value={state.stake}
            handleChange={handleStakeChanged}
            step={1}
            min={0}
            max={50}
            myst={true}
          />
          <p className="input-group__help">
            To start providing services and ensure smooth and secure payouts (settlements) in Mysterium Network, node
            runners should stake a small amount of tokens. If you choose the default option, the initial stake amount
            will be set to 0 and it will be automatically increased up to 10 MYST by taking 10% of earnings during each
            promise settlement (payout).
          </p>
        </div>

        <div style={{ display: 'none' }}>
          <div className="chain-radio">
            <div className="input-group__label m-r-15">Select Chain</div>
            <div className="chain-radio__options">
              <div className="chain-radio__group">
                <div className="chain-radio__label">L1</div>
                <Radio
                  checked={state.chainId === L1ChainId}
                  onChange={() => {
                    if (state.chainId !== L1ChainId) {
                      setState({ ...state, chainId: L1ChainId })
                      setChainId(L1ChainId)
                    }
                  }}
                />
              </div>
              <div className="chain-radio__group">
                <div className="chain-radio__label">L2</div>
                <Radio
                  disabled={true}
                  checked={state.chainId === L2ChainId}
                  onChange={(e) => {
                    if (state.chainId !== L2ChainId) {
                      setState({ ...state, chainId: L2ChainId })
                      setChainId(L2ChainId)
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="input-group__help">
            <ul>
              <li>
                L1 (Ethereum) gives faster go to exchange functionality, but is more expensive to settle funds. Would
                require to have more stake.
              </li>
              <li>
                L2 (Matic side-chain) gives much cheaper settlements and would require much less or even zero stake. But
                it would take some time (and fee) to move collected funds into Ethereum.
              </li>
            </ul>
          </div>
        </div>

        {state.chainId === L2ChainId && (
          <div className="settlement-referral-block">
            <div className="input-group m-t-50 m-b-20">
              <Checkbox
                label="I have referral code"
                checked={state.hasReferralCode}
                handleCheckboxChange={() => {
                  setState({ ...state, hasReferralCode: !state.hasReferralCode })
                }}
              />
            </div>
            {state.hasReferralCode && (
              <div className="input-group">
                <TextField
                  handleChange={handleTextFieldsChange}
                  placeholder="Referral code"
                  value={state.referralCode}
                  stateName="referralCode"
                />
                <p className="input-group__help">Enter your referral code.</p>
              </div>
            )}
          </div>
        )}
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
