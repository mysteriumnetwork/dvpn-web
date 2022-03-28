/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Fees } from 'mysterium-vpn-js'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useImmer } from 'use-immer'
import { tequilaClient } from '../../../../api/tequila-client'
import { DEFAULT_MONEY_DISPLAY_OPTIONS } from '../../../../commons'
import { parseAndToastError } from '../../../../commons/error.utils'
import { toOptions } from '../../../../commons/mapping.utils'
import { currentCurrency } from '../../../../commons/money.utils'
import { myst } from '../../../../commons/myst.utils'
import { toastError, toastSuccess } from '../../../../commons/toast.utils'
import { InputGroup } from '../../../../Components/InputGroups/InputGroup'
import { Modal } from '../../../../Components/Modal/Modal'
import { Option, Select } from '../../../../Components/Select/Select'
import { TextField } from '../../../../Components/TextField/TextField'
import { FEES_EMPTY } from '../../../../constants/instances'
import { selectors } from '../../../../redux/selectors'
import { CollapseAlert } from './CollapseAlert'
import { FeesRibbon } from './FeesRibbon'
import { LatestWithdrawal } from './LatestWithdrawal'
import styles from './WithdrawalModal.module.scss'

interface Props {
  isOpen: boolean
  onClose: () => void
}

interface State {
  withdrawalAddress: string
  withdrawalAmount: { wei: string; myst: string }
  balanceTotalWei: string
  chainOptions: Option[]
  toChain: Option
  isLoading: boolean
  fees: Fees
  hermesId: string
}

const initialState: State = {
  withdrawalAddress: '',
  chainOptions: [],
  withdrawalAmount: { myst: '0', wei: '0' },
  balanceTotalWei: '0',
  toChain: { label: '0', value: '0' },
  isLoading: true,
  hermesId: '',
  fees: FEES_EMPTY,
}

const MINIMAL_WITHDRAWAL_AMOUNT_WEI = myst.toWeiBig('0.01') // 0.01 MYST
const MAXIMUM_WITHDRAW_AMOUNT_WEI = myst.toWeiBig(99) // 99.0 MYST
const POLYGON_MATIC_MAINNET_CHAIN_ID = 137

const WithdrawalModal = ({ isOpen, onClose }: Props) => {
  const chainSummary = useSelector(selectors.chainSummarySelector)
  const identity = useSelector(selectors.currentIdentitySelector)

  const [state, setState] = useImmer<State>(initialState)

  const setIsLoading = (b: boolean = true) => {
    setState((d) => {
      d.isLoading = b
    })
  }

  useEffect(() => {
    const init = async () => {
      setState(initialState)
      const { currentChain } = chainSummary
      const chainOptions = toOptions(chainSummary)

      const [{ address }, fees] = await Promise.all([
        tequilaClient.payoutAddressGet(identity.id).catch(() => ({ address: '' })),
        tequilaClient.transactorFees(currentChain),
      ])

      const { wei: balanceWei } = identity.balanceTokens

      setState((d) => {
        d.withdrawalAddress = address
        d.chainOptions = chainOptions
        d.withdrawalAmount = initialCeilingAmount(balanceWei)
        d.balanceTotalWei = balanceWei
        d.toChain = chainOptions.find((o) => o.value === currentChain)!
        d.fees = fees
        d.isLoading = false
        d.hermesId = identity.hermesId
      })
    }
    if (isOpen) {
      init()
    } else {
      setIsLoading(false)
    }
  }, [isOpen])

  const initialCeilingAmount = (wei: string): { wei: string; myst: string } => {
    const bigWei = myst.toBig(wei)
    if (bigWei.isGreaterThan(MAXIMUM_WITHDRAW_AMOUNT_WEI)) {
      return { myst: `${MAXIMUM_WITHDRAW_AMOUNT_WEI}`, wei: MAXIMUM_WITHDRAW_AMOUNT_WEI.toFixed() }
    }
    return { myst: myst.toEtherBig(bigWei).toFixed(DEFAULT_MONEY_DISPLAY_OPTIONS.fractionDigits), wei }
  }

  const isOverBalance = (): boolean => myst.toBig(state.withdrawalAmount.wei).isGreaterThan(identity.balanceTokens.wei)
  const isInsaneWithdrawal = (): boolean =>
    myst.toBig(state.withdrawalAmount.wei).minus(state.fees.settlement).isLessThan(MINIMAL_WITHDRAWAL_AMOUNT_WEI)
  const isOverCeiling = (): boolean => myst.toBig(state.withdrawalAmount.wei).isGreaterThan(MAXIMUM_WITHDRAW_AMOUNT_WEI)

  const onWithdrawalAmountChange = (ether: string) => {
    setState((d) => {
      d.withdrawalAmount = { myst: ether, wei: myst.toWeiString(ether) }
    })
  }

  const validateForm = (): string | undefined => {
    const { withdrawalAddress } = state
    if (!withdrawalAddress || withdrawalAddress === '') {
      return 'Withdrawal address is required'
    }

    if (isInsaneWithdrawal()) {
      return 'Withdrawal amount after fees is below minimal 0.01 MYST'
    }

    if (isOverBalance()) {
      return 'Your withdraw amount exceeds your balance'
    }

    if (isOverCeiling()) {
      return `Your withdrawal amount exceeds maximum limit for one transaction. Please reduce amount to ${MAXIMUM_WITHDRAW_AMOUNT_WEI} ${currentCurrency()} or lower`
    }
  }

  const errorMessage = validateForm()

  const onChainChange = async (o: Option | Option[]) => {
    setIsLoading(true)
    const option = o as Option
    const chainId = option.value as number
    const fees = await tequilaClient.transactorFees(chainId)

    setState((d) => {
      d.toChain = option
      d.fees = fees
      d.isLoading = false
    })
  }

  const onWithdraw = async () => {
    const error = validateForm()
    if (error) {
      toastError('There are errors preventing withdrawal')
      return
    }

    try {
      setIsLoading()
      await tequilaClient.withdraw({
        hermesId: state.hermesId,
        providerId: identity.id,
        beneficiary: state.withdrawalAddress,
        toChainId: state.toChain.value as number,
        amount: state.withdrawalAmount.wei,
      })
      toastSuccess('Withdrawal completed successfully!')
      onClose()
    } catch (e: any) {
      parseAndToastError(e)
    } finally {
      setIsLoading(false)
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
        onSaveDisabled: !!errorMessage,
      }}
    >
      <div className={styles.content}>
        <div className={styles.disclaimer}>
          You can withdraw your collected earnings into own Ethereum or Polygon wallet address at any time. Please allow
          some time (usually a few minutes) for withdrawal transaction to be processed. Your balance will update once
          transaction is executed.
        </div>
        <CollapseAlert severity="error" visible={!!errorMessage}>
          <p className={styles.attention}>{errorMessage}</p>
        </CollapseAlert>
        <CollapseAlert severity="warning" visible={state.toChain.value === POLYGON_MATIC_MAINNET_CHAIN_ID}>
          <p className={styles.attention}>
            Make sure withdrawal address is from ERC-20 compatible wallet (e.g. MetaMask or MyEtherWallet) supporting
            Polygon! Addresses from Ethereum network exchanges (e.g. Bittrex, HitBTC) are not supported for Polygon
            network withdrawals and your tokens might be lost.
          </p>
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
          label={`Amount (${currentCurrency()}) / Your Balance: ${myst.display(
            state.balanceTotalWei,
          )} (Maximum withdrawal
                  amount: ${myst.display(MAXIMUM_WITHDRAW_AMOUNT_WEI)})`}
        >
          <TextField type="number" value={state.withdrawalAmount.myst} onChange={onWithdrawalAmountChange} />
        </InputGroup>
        <InputGroup label="Select chain">
          <Select value={state.toChain} options={state.chainOptions} onChange={onChainChange} />
        </InputGroup>
        <FeesRibbon fees={state.fees} withdrawalAmountWei={state.withdrawalAmount.wei} />
      </div>
      <LatestWithdrawal />
    </Modal>
  )
}
export default WithdrawalModal
