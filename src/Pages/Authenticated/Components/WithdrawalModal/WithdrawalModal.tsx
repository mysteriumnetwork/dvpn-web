/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DECIMAL_PART, Fees, Identity } from 'mysterium-vpn-js'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { tequilaClient } from '../../../../api/tequila-client'
import { currentCurrency, toMyst } from '../../../../commons/money.utils'
import { toastError, toastSuccess } from '../../../../commons/toast.utils'
import { TextField } from '../../../../Components/TextField/TextField'
import styles from './WithdrawalModal.module.scss'
import { Option, Select } from '../../../../Components/Select/Select'
import { Modal } from '../../../../Components/Modal/Modal'
import { CollapseAlert } from './CollapseAlert'
import { LatestWithdrawal } from './LatestWithdrawal'
import { FeesRibbon } from './FeesRibbon'
import { InputGroup } from '../../../../Components/InputGroups/InputGroup'
import { useSelector } from 'react-redux'
import { selectors } from '../../../../redux/selectors'
import { toOptions } from '../../../../commons/mapping.utils'

interface Props {
  isOpen: boolean
  onClose: () => void
  identity: Identity
}

interface State {
  withdrawalAddress: string
  withdrawalAmountMYST: number
  withdrawalAmountWei: number
  balanceTotalWei: number
  chainOptions: Option[]
  toChain: Option
  isLoading: boolean
  withdrawalInProgress: boolean
  withdrawalCompleted: boolean
  fees: Fees
  error?: string
  isInsaneWithdrawal: boolean
  isWithdrawDisabled: boolean
  hermesId: string
}

const initialState: State = {
  withdrawalAddress: '',
  chainOptions: [],
  withdrawalAmountMYST: 0,
  withdrawalAmountWei: 0,
  balanceTotalWei: 0,
  toChain: { label: '0', value: '0' },
  isLoading: true,
  withdrawalInProgress: false,
  withdrawalCompleted: false,
  fees: {
    registration: 0,
    settlement: 0,
    hermes: 0,
    decreaseStake: 0,
  },
  isInsaneWithdrawal: false,
  isWithdrawDisabled: false,
  hermesId: '',
}

const MINIMAL_WITHDRAWAL_AMOUNT = 10_000_000_000_000_000 // 0.01 MYST
const POLYGON_MATIC_MAINNET_CHAIN_ID = 137
const MAXIMUM_WITHDRAW_AMOUNT = 99

const WithdrawalModal = ({ isOpen, onClose, identity }: Props) => {
  const chainSummary = useSelector(selectors.chainSummarySelector)

  const [state, setState] = useImmer<State>(initialState)

  const setIsLoading = (b: boolean = true) => {
    setState((d) => {
      d.isLoading = b
    })
  }

  useEffect(() => {
    const init = async () => {
      const { address } = await tequilaClient.payoutAddressGet(identity.id).catch(() => ({ address: '' }))

      const { currentChain } = chainSummary
      const chainOptions = toOptions(chainSummary)
      const fees = await tequilaClient.transactorFees(currentChain)

      setState((d) => {
        d.withdrawalAddress = address
        d.chainOptions = chainOptions
        d.withdrawalAmountMYST = Number(toMyst(identity.balance))
        d.withdrawalAmountWei = identity.balance
        d.balanceTotalWei = identity.balance
        d.toChain = chainOptions.find((o) => o.value === currentChain)!
        d.fees = fees
        d.isLoading = false
        d.isInsaneWithdrawal = identity.balance - fees.settlement < MINIMAL_WITHDRAWAL_AMOUNT
        d.isWithdrawDisabled = d.withdrawalInProgress || d.isLoading || d.isInsaneWithdrawal || d.withdrawalCompleted
        d.hermesId = identity.hermesId
      })
    }
    if (isOpen) {
      init()
    } else {
      setIsLoading(false)
    }
  }, [isOpen])

  const {
    fees: { settlement },
  } = state

  const clearErrors = () =>
    setState((d) => {
      d.error = undefined
    })

  const overBalance = (): boolean => state.withdrawalAmountWei > identity.balance

  useEffect(() => {
    const myst = state.withdrawalAmountMYST
    const wei = myst * DECIMAL_PART
    setState((d) => {
      d.withdrawalAmountWei = wei
      d.isInsaneWithdrawal = d.withdrawalAmountWei - settlement < MINIMAL_WITHDRAWAL_AMOUNT
      d.isWithdrawDisabled = d.withdrawalInProgress || d.isLoading || d.isInsaneWithdrawal || d.withdrawalCompleted
    })
  }, [state.withdrawalAmountMYST, state.toChain])

  const validateForm = (): string | undefined => {
    const { withdrawalAddress } = state
    if (!withdrawalAddress || withdrawalAddress === '') {
      return 'Withdrawal address is required'
    }

    if (state.isInsaneWithdrawal) {
      return 'Withdrawal amount after fees is below minimal 0.01 MYST'
    }

    if (overBalance()) {
      return 'Your withdraw amount exceeds your balance'
    }

    if (state.withdrawalAmountMYST > MAXIMUM_WITHDRAW_AMOUNT) {
      return `Your withdrawal amount exceeds maximum limit for one transaction. Please reduce amount to ${MAXIMUM_WITHDRAW_AMOUNT} ${currentCurrency()} or lower`
    }
  }

  const errors = validateForm()

  const onChainChange = async (o: Option | Option[]) => {
    setIsLoading(true)
    const option = o as Option
    const chainId = option.value as number
    const fees = await tequilaClient.transactorFees(chainId)

    setState((d) => {
      d.toChain = option
      d.fees = fees
      d.isInsaneWithdrawal = identity.balance - fees.settlement < MINIMAL_WITHDRAWAL_AMOUNT
      d.isLoading = false
    })
  }

  const onWithdraw = async () => {
    const error = validateForm()
    if (error) {
      setState((d) => {
        d.error = error
      })
      return
    }
    clearErrors()

    try {
      await tequilaClient.withdraw({
        hermesId: state.hermesId,
        providerId: identity.id,
        beneficiary: state.withdrawalAddress,
        toChainId: state.toChain.value as number,
        amount: String(state.withdrawalAmountWei),
      })
      setState((d) => {
        d.withdrawalCompleted = true
      })
      toastSuccess('Withdrawal completed successfully!')
      onClose()
    } catch (e: any) {
      toastError('There was an error processing your withdrawal. Please try again later.')
    }
  }

  return (
    <Modal
      open={isOpen}
      title="Withdrawal"
      isLoading={state.isLoading}
      confirmationMessage="Please click OK to proceed with your withdrawal request."
      withConfirmation
      controls={{
        onClose: onClose,
        onSave: onWithdraw,
        onSaveLabel: 'Withdraw',
        onSaveDisabled: state.isWithdrawDisabled || !!errors,
      }}
    >
      <div className={styles.content}>
        <div className={styles.disclaimer}>
          You can withdraw your collected earnings into own Ethereum or Polygon wallet address at any time. Please allow
          some time (usually a few minutes) for withdrawal transaction to be processed. Your balance will update once
          transaction is executed.
        </div>
        <CollapseAlert severity="error" title="Error" visible={!!errors}>
          {errors}
        </CollapseAlert>
        <CollapseAlert
          severity="warning"
          title="Warning"
          visible={state.toChain.value === POLYGON_MATIC_MAINNET_CHAIN_ID}
        >
          Make sure withdrawal address is from ERC-20 compatible wallet (e.g. MetaMask or MyEtherWallet) supporting
          Polygon! Addresses from Ethereum network exchanges (e.g. Bittrex, HitBTC) are not supported for Polygon
          network withdrawals and your tokens might be lost.
        </CollapseAlert>
        <InputGroup label="Withdrawal Address">
          <TextField
            value={state.withdrawalAddress}
            onChange={(value) => {
              setState((d) => {
                d.withdrawalAddress = value
              })
            }}
          />
        </InputGroup>
        <InputGroup
          label={`Amount (${currentCurrency()}) / Your Balance: ${toMyst(state.balanceTotalWei)} (Maximum withdrawal
                  amount: ${MAXIMUM_WITHDRAW_AMOUNT} ${currentCurrency()})`}
        >
          <TextField
            type="number"
            value={state.withdrawalAmountMYST}
            onChange={(value) => {
              const n = Number(value)
              setState((d) => {
                d.withdrawalAmountMYST = n
              })
            }}
          />
        </InputGroup>
        <InputGroup label="Select chain">
          <Select value={state.toChain} options={state.chainOptions} onChange={onChainChange} />
        </InputGroup>
        <FeesRibbon fees={state.fees} withdrawalAmountWei={state.withdrawalAmountWei} />
      </div>
      <LatestWithdrawal />
    </Modal>
  )
}
export default WithdrawalModal
