/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { BeneficiaryTxStatus } from 'mysterium-vpn-js'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { tequila } from '../../../../../api/wrapped-calls'
import { configParser } from '../../../../../commons/config'
import { parseAndToastError } from '../../../../../commons/error.utils'
import { isValidEthereumAddress } from '../../../../../commons/ethereum.utils'
import { feeCalculator } from '../../../../../commons/fees'
import { myst } from '../../../../../commons/myst.utils'
import { toastSuccess } from '../../../../../commons/toast.utils'
import { InputGroup } from '../../../../../Components/InputGroups/InputGroup'
import { Modal } from '../../../../../Components/Modal/Modal'
import { Option, Select } from '../../../../../Components/Select/Select'
import { TextField } from '../../../../../Components/TextField/TextField'
import Error from '../../../../../Components/Validation/Error'
import { selectors } from '../../../../../redux/selectors'
import { FeesTable } from '../../Fees/FeesTable'
import styles from './SettleSettingsModal.module.scss'

const { api, refreshBeneficiary } = tequila
const { display } = myst

interface Props {
  open?: boolean
  onClose: () => void
  onSave: () => void
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
  txStatus?: BeneficiaryTxStatus
}

export const SettleSettingsModal = ({ open, onClose, onSave }: Props) => {
  const identity = useSelector(selectors.currentIdentitySelector)
  const config = useSelector(selectors.configSelector)
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
        const [{ address }, txStatus] = await Promise.all([
          api.payoutAddressGet(identity.id).catch(() => ({ address: '' })),
          api.beneficiaryTxStatus(identity.id).catch(() => undefined),
        ])
        setState((p) => ({
          ...p,
          settleOption: settleOptions[1],
          externalWalletAddress: address,
          txStatus,
          isLoading: false,
        }))
      } catch (e: any) {
        parseAndToastError(e)
      }
    })()
  }, [])

  const chainSummary = useSelector(selectors.chainSummarySelector)
  const fees = useSelector(selectors.feesSelector)

  const isExternal = state.settleOption.value === 'external'

  const calculatedFees = useMemo(() => feeCalculator.calculateEarnings(identity.earningsTokens, fees), [
    fees.hermesPercent,
    fees.settlement,
    identity.earningsTokens.wei,
  ])

  const handleOptionsChange = (o: Option | Option[]) => setState((p) => ({ ...p, settleOption: o as Option }))

  const handleExternalWalletChange = (v: string) => setState((p) => ({ ...p, externalWalletAddress: v }))

  const setLoading = (b: boolean = true) => setState((p) => ({ ...p, isLoading: b }))

  const isProfitsBelowZero = calculatedFees.profitsWei.lt(0)

  useEffect(() => {
    const errors: string[] = []
    if (isProfitsBelowZero) {
      errors.push(
        `You don’t have enough earnings to cover settlement costs (at least ${display(
          calculatedFees.totalFeesWei,
        )} is needed)`,
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
      await api.settleWithBeneficiary({
        providerId: identity.id,
        hermesId: identity.hermesId,
        beneficiary: isExternal ? state.externalWalletAddress : identity.channelAddress,
      })
      onSave()
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

  const isSaveDisabled = state.errors.length > 0

  return (
    <Modal
      open={open}
      isLoading={state.isLoading}
      confirmationMessage="Are you sure you want to change settlement settings?"
      withConfirmation={true}
      controls={{
        onClose: onClose,
        onSave: handleSettle,
        onSaveDisabled: isSaveDisabled,
        onSaveLabel: 'Change settlement settings',
      }}
    >
      <div className={styles.errors}>
        {state.txStatus?.error && state.txStatus.state === 'completed' && (
          <Error show errorMessage={state.txStatus?.error} />
        )}
        {state.errors.map((message, idx) => (
          <Error key={idx} show errorMessage={message} />
        ))}
      </div>
      <p className={styles.info}>
        When automatic withdrawal is ON, your earnings are settled directly to external wallet (recommended option). If
        automatic withdrawal is OFF then your earnings are settled to internal Node balance. Note: settlement setting
        update might take a few minutes to complete.
      </p>
      <FeesTable earnings={identity.earningsTokens} chainSummary={chainSummary} calculatedFees={calculatedFees} />
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
