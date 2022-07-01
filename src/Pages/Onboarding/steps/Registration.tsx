/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import { tequila } from '../../../api/tequila'
import errorz from '../../../commons/errors'
import { isValidEthereumAddress } from '../../../commons/ethereum.utils'
import identities from '../../../commons/identities'
import storage from '../../../commons/localStorageWrapper'
import toasts from '../../../commons/toasts'
import Button from '../../../Components/Buttons/Button'
import { InputGroup } from '../../../Components/InputGroups/InputGroup'
import { TextField } from '../../../Components/TextField/TextField'
import { DOCS_METAMASK } from '../../../constants/urls'
import { selectors } from '../../../redux/selectors'
import { StepLayout } from '../Components/StepLayout'
import { useAppSelector } from '../../../commons/hooks'

const { toastError } = toasts
const { isRegistrationError, isUnregistered } = identities
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

const Errors = ({ errors }: Pick<State, 'errors'>) => (
  <div>
    {errors.map((err, idx) => (
      <div key={idx}>{err}</div>
    ))}
  </div>
)

export type RegistrationInfo = {
  timestamp: number
  flooredFee: number
  withdrawalAddress?: string
}

const Registration = ({ nextStep }: StepProps) => {
  const identity = useAppSelector(selectors.currentIdentitySelector)
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
        const { chains, currentChain } = await api.chainSummary()
        setState((d) => ({
          ...d,
          currentChainName: chains[currentChain],
        }))
      } catch (err) {
        toastError(errorz.apiError(err).human())
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
      if (isUnregistered(identity) || isRegistrationError(identity)) {
        await registerIdentity(identity.id, state.withdrawalAddress)
      }

      nextStep()
    } catch (error) {
      errors()
    }
    setIsLoading(false)
  }

  return (
    <StepLayout
      title="Withdrawal settings"
      description="Add your ERC-20 Polygon compatible wallet for automatic withdrawals"
      controls={
        <Button isLoading={state.isLoading} onClick={handleDone}>
          Next
        </Button>
      }
      controlsCentered
    >
      <div id="separator" style={{ marginTop: '100px' }} />
      <Errors errors={state.errors} />
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
    </StepLayout>
  )
}

export default Registration
