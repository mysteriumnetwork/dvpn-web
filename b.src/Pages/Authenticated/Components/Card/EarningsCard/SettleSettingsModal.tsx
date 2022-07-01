/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { BeneficiaryTxStatus } from 'mysterium-vpn-js'
import { useEffect, useMemo, useState } from 'react'
import { tequila } from '../../../../../api/tequila'
import { configs } from '../../../../../commons/config'
import errors from '../../../../../commons/errors'
import { isValidEthereumAddress } from '../../../../../commons/ethereum.utils'
import { feez } from '../../../../../commons/fees'
import { myst } from '../../../../../commons/mysts'
import toasts from '../../../../../commons/toasts'
import { InputGroup } from '../../../../../Components/InputGroups/InputGroup'
import { Modal } from '../../../../../Components/Modal/Modal'
import { TextField } from '../../../../../Components/TextField/TextField'
import Error from '../../../../../Components/Validation/Error'
import { selectors } from '../../../../../redux/selectors'
import { FeesTable } from '../../Fees/FeesTable'
import styles from './SettleSettingsModal.module.scss'
import identities from '../../../../../commons/identities'
import { useAppSelector } from '../../../../../commons/hooks'

const { toastSuccess } = toasts
const { api, refreshBeneficiary } = tequila
const { display } = myst

interface Props {
  open?: boolean
  onClose: () => void
  onSave: () => void
}

interface State {
  externalWalletAddress: string
  isLoading: boolean
  errors: string[]
  txStatus?: BeneficiaryTxStatus
}

export const SettleSettingsModal = ({ open, onClose, onSave }: Props) => {
  const { isChannelAddress, beneficiary } = useAppSelector(selectors.beneficiarySelector)
  const identity = useAppSelector(selectors.currentIdentitySelector)
  const config = useAppSelector(selectors.configSelector)
  const docsUrl = configs.docsAddress(config)
  const zeroStakeSettlementThreshold = configs.zeroStakeSettlementThreshold(config)
  const displayZeroStakeThreshold = myst.display(myst.toWeiBig(zeroStakeSettlementThreshold), {
    fractionDigits: 2,
  })
  const isAutoWithdrawal = !isChannelAddress

  const [state, setState] = useState<State>({
    externalWalletAddress: '',
    isLoading: true,
    errors: [],
  })

  useEffect(() => {
    ;(async () => {
      if (identities.isEmpty(identity)) {
        return
      }
      try {
        const txStatus = await api.beneficiaryTxStatus(identity.id).catch(() => undefined)
        setState((p) => ({
          ...p,
          externalWalletAddress: isChannelAddress ? '' : beneficiary,
          txStatus,
          isLoading: false,
        }))
      } catch (e: any) {
        errors.parseToastError(e)
      }
    })()
  }, [identity.id, beneficiary, isAutoWithdrawal])

  const chainSummary = useAppSelector(selectors.chainSummarySelector)
  const { current, hermesPercent } = useAppSelector(selectors.feesSelector)

  const calculatedFees = useMemo(() => feez.calculateEarnings(identity.earningsTokens, current, hermesPercent), [
    hermesPercent,
    current.settlement.wei,
    identity.earningsTokens.wei,
  ])

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
    if (!isValidEthereumAddress(state.externalWalletAddress)) {
      errors.push('Invalid external wallet address')
    }
    setState((p) => ({ ...p, errors: errors }))
  }, [state.externalWalletAddress, calculatedFees.profitsWei])

  const handleSettle = async () => {
    setLoading()
    try {
      await api.settleWithBeneficiary({
        providerId: identity.id,
        hermesId: '',
        beneficiary: state.externalWalletAddress,
      })
      onSave()
      onClose()
      toastSuccess(`Automatic withdrawal to ${state.externalWalletAddress} request submitted`)
      await refreshBeneficiary(identity.id)
    } catch (err: any) {
      errors.parseToastError(err)
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
        {isAutoWithdrawal
          ? `Automatic withdrawal (settlement) to your external wallet is done each time when your earnings reach ${displayZeroStakeThreshold}. You
            can also settle manually before ${displayZeroStakeThreshold} is reached by clicking "Settle now" button in the previous screen. You
            can change your external wallet address below.`
          : `Once enabled, automatic withdrawal (settlement) to your external wallet will be done each time when earnings reach ${displayZeroStakeThreshold}. You will be able to settle manually before ${displayZeroStakeThreshold} is reached by clicking "Settle now" button in the previous screen.\n` +
            `Please enter your Polygon compatible ERC-20 wallet address below and click "Change settlement settings" button to enable Auto withdrawals.`}
      </p>
      <FeesTable earnings={identity.earningsTokens} chainSummary={chainSummary} calculatedFees={calculatedFees} />
      <InputGroup label="Your external wallet address:">
        <TextField
          placeholder="External wallet address..."
          value={state.externalWalletAddress}
          onChange={handleExternalWalletChange}
        />
      </InputGroup>
      <p className={styles.walletWarning}>
        Be aware that only Polygon compatible ERC-20 wallets (e.g. Metamask) are supported for automatic withdrawals!
        Your tokens might be lost if you use incompatible wallet.{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${docsUrl}/for-node-runners/how-to-setup-polygon-myst-on-metamask`}
        >
          Read here how to setup Polygon MYST on Metamask
        </a>
      </p>
    </Modal>
  )
}
