/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { tequila } from '../../../../api/wrapped-calls'
import { configParser } from '../../../../commons/config'
import { parseAndToastError } from '../../../../commons/error.utils'
import { isValidEthereumAddress } from '../../../../commons/ethereum.utils'
import { feeCalculator } from '../../../../commons/fees'
import { myst } from '../../../../commons/myst.utils'
import { toastSuccess } from '../../../../commons/toast.utils'
import { InputGroup } from '../../../../Components/InputGroups/InputGroup'
import { Modal } from '../../../../Components/Modal/Modal'
import { Option, Select } from '../../../../Components/Select/Select'
import { TextField } from '../../../../Components/TextField/TextField'
import Error from '../../../../Components/Validation/Error'
import { selectors } from '../../../../redux/selectors'
import { FeesTable } from '../Fees/FeesTable'
import styles from './SettleModal.module.scss'

const { api, refreshBeneficiary } = tequila
const { display, toWeiBig } = myst

interface Props {
  open?: boolean
  onClose: () => void
}

const settleOptions: Option[] = [
  { value: 'manual', label: "Settle to Node's internal balance" },
  { value: 'external', label: 'Settle to external wallet (enable automatic withdrawals)' },
]

interface State {
  settleOption: Option
  externalWalletAddress: string
  isLoading: boolean
  errors: string[]
}

export const SettleModal = ({ open, onClose }: Props) => {
  const identity = useSelector(selectors.currentIdentitySelector)
  const config = useSelector(selectors.configSelector)
  const settlementThresholdEther = configParser.zeroStakeSettlementThreshold(config)
  const docsUrl = configParser.docsAddress(config)

  const [state, setState] = useState<State>({
    settleOption: { value: '', label: '' },
    externalWalletAddress: '',
    isLoading: true,
    errors: [],
  })

  useEffect(() => {
    ;(async () => {
      try {
        const { address } = await api.payoutAddressGet(identity.id).catch(() => ({ address: '' }))
        setState((p) => ({ ...p, settleOption: settleOptions[0], externalWalletAddress: address, isLoading: false }))
      } catch (e: any) {
        parseAndToastError(e)
      }
    })()
  }, [])

  const { earningsTokens } = useSelector(selectors.currentIdentitySelector)
  const chainSummary = useSelector(selectors.chainSummarySelector)
  const fees = useSelector(selectors.feesSelector)

  const isExternal = state.settleOption.value === 'external'

  const calculatedFees = useMemo(() => feeCalculator.calculateEarnings(earningsTokens, fees), [
    fees.hermesPercent,
    fees.settlement,
    earningsTokens.wei,
  ])

  const handleOptionsChange = (o: Option | Option[]) => setState((p) => ({ ...p, settleOption: o as Option }))

  const handleExternalWalletChange = (v: string) => setState((p) => ({ ...p, externalWalletAddress: v }))

  const setLoading = (b: boolean = true) => setState((p) => ({ ...p, isLoading: b }))

  const settleRequest = { providerId: identity.id, hermesId: identity.hermesId }
  const settleBeneficiaryRequest = {
    providerId: identity.id,
    hermesId: identity.hermesId,
    beneficiary: state.externalWalletAddress,
  }

  useEffect(() => {
    const errors: string[] = []
    if (calculatedFees.profitsWei.lt(0)) {
      errors.push(
        `You don’t have enough earnings to cover settlement costs (at least ${display(
          calculatedFees.totalFeesWei,
        )} MYST is needed)`,
      )
    }
    if (isExternal && !isValidEthereumAddress(state.externalWalletAddress)) {
      errors.push('Invalid external wallet address')
    }
    setState((p) => ({ ...p, errors: errors }))
  }, [state.externalWalletAddress, calculatedFees.profitsWei])

  const handleSettle = async () => {
    setLoading()
    try {
      isExternal ? await api.settleWithBeneficiary(settleBeneficiaryRequest) : await api.settleAsync(settleRequest)
      onClose()
      toastSuccess(
        isExternal
          ? `Automatic withdrawal to ${state.externalWalletAddress} request submitted`
          : 'Settlement request submitted!',
      )
      await refreshBeneficiary(identity.id)
    } catch (err: any) {
      parseAndToastError(err)
    }
    setLoading(false)
  }

  return (
    <Modal
      open={open}
      isLoading={state.isLoading}
      confirmationMessage="Are you sure you wish to settle?"
      withConfirmation={true}
      controls={{
        onClose: onClose,
        onSave: handleSettle,
        onSaveDisabled: state.errors.length > 0,
        onSaveLabel: isExternal ? 'Update settlement beneficiary and settle' : 'Settle',
      }}
    >
      <div className={styles.errors}>
        {state.errors.map((message, idx) => (
          <Error key={idx} show errorMessage={message} />
        ))}
      </div>
      <p className={styles.info}>
        Settlement transactions send your earnings to either node's internal balance which you can withdraw later or
        directly to your external wallet. Settlement is done automatically when earnings reach{' '}
        {display(toWeiBig(settlementThresholdEther))} or manually when Settle button below is clicked.
      </p>
      <FeesTable earnings={earningsTokens} chainSummary={chainSummary} calculatedFees={calculatedFees} />
      <InputGroup label="Withdrawal mode:">
        <Select value={state.settleOption} options={settleOptions} onChange={handleOptionsChange} />
      </InputGroup>
      {isExternal && (
        <>
          <InputGroup label="Your external wallet address:">
            <TextField
              placeholder="External wallet address..."
              value={state.externalWalletAddress}
              onChange={handleExternalWalletChange}
            />
          </InputGroup>
          <p className={styles.walletWarning}>
            Be aware that only Polygon compatible ERC-20 wallets (e.g. Metamask) are supported for automatic
            withdrawals! Your tokens might be lost if you use incompatible wallet.{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${docsUrl}/node-runners/payout-guide/#using-metamask-with-polygon-myst`}
            >
              Read here how to setup Polygon MYST on Metamask
            </a>
          </p>
        </>
      )}
    </Modal>
  )
}
