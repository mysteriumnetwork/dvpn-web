/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './Steps.module.scss'
import Button from '../../../Components/Buttons/Button'
import { useImmer } from 'use-immer'
import { Alert, AlertTitle } from '@material-ui/lab'
import Collapse from '@material-ui/core/Collapse'
import React, { useEffect } from 'react'
import classNames from 'classnames'
import TopUpModal from './TopUpModal'
import { api } from '../../../api/Api'
import { useSelector } from 'react-redux'
import { currentIdentitySelector } from '../../../redux/selectors'
import { InputGroup } from '../../../Components/InputGroups/InputGroup'
import { TextField } from '../../../Components/TextField/TextField'
import { isValidEthereumAddress } from '../../../commons/ethereum.utils'
import { parseError } from '../../../commons/error.utils'
import { toastError } from '../../../commons/toast.utils'
import { isUnregistered } from '../../../commons/identity.utils'

interface State {
  isLoading: boolean
  isFreeRegistrationEligible: boolean
  isTopUpOpen: boolean
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

const Registration = ({ nextStep }: StepProps) => {
  const identity = useSelector(currentIdentitySelector)
  const [state, setState] = useImmer<State>({
    isLoading: true,
    isFreeRegistrationEligible: false,
    isTopUpOpen: false,
    withdrawalAddress: '',
    currentChainName: '',
    errors: [],
  })

  useEffect(() => {
    const init = async () => {
      try {
        const [eligibility, summary] = await Promise.all([
          api.freeRegistrationEligibility(identity.id),
          api.chainSummary(),
        ])
        setState((d) => {
          d.currentChainName = summary.chains[summary.currentChain]
          d.isFreeRegistrationEligible = eligibility.eligible
        })
      } catch (err) {
        toastError(parseError(err))
      }
      setIsLoading(false)
    }
    init()
  }, [identity])

  const setIsLoading = (b: boolean) =>
    setState((d) => {
      d.isLoading = b
    })

  const onWalletAddressChange = (value: string) => {
    setState((d) => {
      d.withdrawalAddress = value
    })
  }

  const errors = (...messages: string[]): void => {
    setState((d) => {
      d.errors = messages
    })
  }

  const setIsTopUpOpen = (b: boolean) => {
    setState((d) => {
      d.isTopUpOpen = b
    })
  }

  const registerIdentity = async (identity: string): Promise<void> => {
    return api.identityRegister(identity, {
      beneficiary: state.withdrawalAddress,
      stake: 10, // quadruple check mit Jaro
    })
  }

  const isInvalidWithdrawalAddress = () => {
    return state.withdrawalAddress && !isValidEthereumAddress(state.withdrawalAddress)
  }

  const handleDone = async () => {
    try {
      if (isInvalidWithdrawalAddress()) {
        errors('Invalid Ethereum wallet address')
        return
      }

      setIsLoading(true)
      if (state.withdrawalAddress) {
        await api.payoutAddressSave(identity.id, state.withdrawalAddress)
      }
      if (isUnregistered(identity)) {
        setIsTopUpOpen(true)
      } else {
        nextStep()
      }
    } catch (error) {
      errors(parseError(error) || 'API call failed')
    }
    setIsLoading(false)
  }

  return (
    <div className={styles.step}>
      <h1 className={styles.title}>Default Withdrawal settings</h1>
      <p className={styles.description}>
        Fill in the following information to add a default withdrawal address for payments.
      </p>
      <div id="separator" style={{ marginTop: '100px' }} />
      <div className={styles.content}>
        <Errors {...state} />
        <InputGroup
          label="Default Withdrawal Address"
          help="Make sure you enter ERC-20 compatible wallet or MYST compatible exchange wallet address. You can enter this
            address later in 'Settings' page."
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
      <TopUpModal
        open={state.isTopUpOpen}
        currentChainName={state.currentChainName}
        identity={identity}
        onClose={() => {
          setIsTopUpOpen(false)
          setIsLoading(false)
        }}
        onTopUp={async () => {
          try {
            await registerIdentity(identity.id)
            setIsTopUpOpen(false)
            setIsLoading(false)
            nextStep()
            return Promise.resolve()
          } catch (e) {
            toastError('Registration failed.')
            return Promise.reject()
          }
        }}
        isFreeRegistrationEligible={state.isFreeRegistrationEligible}
      />
    </div>
  )
}

export default Registration
