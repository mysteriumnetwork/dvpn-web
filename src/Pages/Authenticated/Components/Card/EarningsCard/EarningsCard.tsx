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
import { lockouts } from '../../../../../commons/lockout'
import { Media } from '../../../../../commons/media.utils'
import { myst } from '../../../../../commons/mysts'
import page from '../../../../../commons/page'
import Button from '../../../../../Components/Buttons/Button'
import { LockoutButton } from '../../../../../Components/Buttons/LockoutButton'
import Tooltip from '../../../../../Components/Tooltip/Tooltip'
import { selectors } from '../../../../../redux/selectors'
import WithdrawalModal from '../../WithdrawalModal/WithdrawalModal'
import { Card } from '../Card'
import styles from './EarningsCard.module.scss'
import { QuickSettleModal } from './QuickSettleModal'
import { SettleSettingsModal } from './SettleSettingsModal'
import WarningIcon from '@material-ui/icons/WarningOutlined'
import identities from '../../../../../commons/identities'

const QUICK_SETTLE_LOCKOUT_ID = 'QUICK_SETTLE_LOCKOUT_ID'
const { display, toWeiBig, toBig, toEtherBig } = myst
const { api } = tequila

export const EarningsCard = () => {
  const { balanceTokens } = useSelector(selectors.currentIdentitySelector)
  const beneficiary = useSelector(selectors.beneficiarySelector)
  const isAutoWithdrawal = !beneficiary.isChannelAddress
  const isBalanceVisible = toEtherBig(balanceTokens.wei).gte(0.1) || !isAutoWithdrawal

  return (
    <>
      <Media.Desktop>
        <Card width="100%">
          <div className={styles.split}>
            <Earnings isAutoWithdrawal={isAutoWithdrawal} />
            {isBalanceVisible && (
              <>
                <div className={styles.separator} />
                <Balance isAutoWithdrawal={isAutoWithdrawal} />
              </>
            )}
          </div>
        </Card>
      </Media.Desktop>
      <Media.Mobile>
        <Card>
          <Earnings isAutoWithdrawal={isAutoWithdrawal} />
        </Card>
        {isBalanceVisible && (
          <Card>
            <Balance isAutoWithdrawal={isAutoWithdrawal} />
          </Card>
        )}
      </Media.Mobile>
    </>
  )
}

interface SharedProps {
  isAutoWithdrawal: boolean
}

const Earnings = ({ isAutoWithdrawal }: SharedProps) => {
  const { earningsTokens, id } = useSelector(selectors.currentIdentitySelector)
  const { current } = useSelector(selectors.feesSelector)
  const config = useSelector(selectors.configSelector)
  const thresholdWei = toWeiBig(configParser.zeroStakeSettlementThreshold(config))

  const [beneficiaryTx, setBeneficiaryTx] = useState<BeneficiaryTxStatus | undefined>()
  const [isSettingsLoading, setIsSettingsLoading] = useState<boolean>(false)

  const updateSettingsLoading = () => {
    setIsSettingsLoading(beneficiaryTx?.state === 'pending')
  }

  useEffect(() => {
    ;(async () => {
      if (identities.isEmpty(id)) {
        return
      }
      updateSettingsLoading()
      setBeneficiaryTx(await api.beneficiaryTxStatus(id).catch(() => undefined))
    })()
  }, [id])

  const tooltipText = useMemo(
    () =>
      `These are confirmed earnings which are not settled to your ${
        isAutoWithdrawal ? 'external wallet' : 'balance'
      } yet. Settlement is done either automatically when ${display(thresholdWei, {
        fractionDigits: 1,
      })} is reached or manually when SETTLE button is clicked. Please note that settlement fee is 20% plus current blockchain fees (${display(
        current.settlement.wei,
      )}).`,
    [thresholdWei, current.settlement.wei],
  )

  const progressPercent = toBig(earningsTokens.wei).times(100).div(thresholdWei).toNumber()

  const [withdrawalOpen, setWithdrawalOpen] = useState<boolean>(false)
  const [quickSettleOpen, setQuickSettleOpen] = useState<boolean>(false)

  const initTimerTimeStamp = async () => {
    setIsSettingsLoading(true)
    page.refreshPage(60)
  }

  return (
    <div className={styles.earnings}>
      <div className={styles.split}>
        <div className={styles.earningsAmount}>
          <div className={styles.value}>{display(earningsTokens.wei, { fractionDigits: 2 })}</div>
          <div className={styles.label}>
            Unsettled earnings
            <Tooltip title={tooltipText} />
          </div>
        </div>
        <Media.Desktop>
          {!isAutoWithdrawal ? (
            <div className={styles.earningsWarning}>
              <WarningIcon />
              <p className={styles.earningsWarningText}>
                Settlement is disabled, because external wallet address is missing for Automatic withdrawals! Click
                button below to add it and enable Automatic withdrawals.
              </p>
            </div>
          ) : (
            <div className={styles.earningsProgressContainer}>
              <p>Next auto settlement ({display(thresholdWei, { fractionDigits: 1 })})</p>
              <progress value={progressPercent} max={100} className={styles.earningsProgress} />
            </div>
          )}
        </Media.Desktop>
      </div>

      <div className={styles.earningsControls}>
        {isAutoWithdrawal ? (
          <>
            <LockoutButton
              id={QUICK_SETTLE_LOCKOUT_ID}
              extraStyle="outline-primary"
              onClick={() => setQuickSettleOpen(true)}
            >
              settle Now
            </LockoutButton>
            <Button extraStyle="outline-primary" onClick={() => setWithdrawalOpen(true)} isLoading={isSettingsLoading}>
              Auto withdrawals: {beneficiaryTx?.error ? 'ERROR' : 'ON'}
            </Button>
          </>
        ) : (
          <Button extraStyle="outline-primary" onClick={() => setWithdrawalOpen(true)} isLoading={isSettingsLoading}>
            Enable Automatic Withdrawals
          </Button>
        )}
      </div>
      <QuickSettleModal
        open={quickSettleOpen}
        onClose={() => setQuickSettleOpen(false)}
        onSave={() => lockouts.lock({ id: QUICK_SETTLE_LOCKOUT_ID, seconds: 60, refreshPage: true })}
      />
      <SettleSettingsModal open={withdrawalOpen} onClose={() => setWithdrawalOpen(false)} onSave={initTimerTimeStamp} />
    </div>
  )
}

const Balance = ({ isAutoWithdrawal }: SharedProps) => {
  const { balanceTokens } = useSelector(selectors.currentIdentitySelector)
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={styles.balance}>
      <div className={styles.split}>
        <div className={styles.balanceAmount}>
          <div className={styles.value}>{display(balanceTokens.wei, { fractionDigits: 2 })}</div>
          <div className={styles.label}>Internal Balance</div>
        </div>
        <WithdrawalModal
          isOpen={open}
          onClose={() => setOpen(false)}
          doAfterWithdraw={() => lockouts.lock({ id: lockouts.buttons.WITHDRAWAL, seconds: 60, refreshPage: true })}
        />
      </div>
      <div className={styles.balanceControl}>
        <LockoutButton id={lockouts.buttons.WITHDRAWAL} onClick={() => setOpen(true)} extraStyle="outline-primary">
          withdraw
        </LockoutButton>
        {isAutoWithdrawal && (
          <p className={styles.balanceNote}>
            Note: as Automatic withdrawals are enabled, your internal node balance will not increase anymore. Once
            withdrawn this section will disappear.
          </p>
        )}
      </div>
    </div>
  )
}
