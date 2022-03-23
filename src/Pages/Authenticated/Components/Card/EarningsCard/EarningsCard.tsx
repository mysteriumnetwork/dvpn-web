/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { configParser } from '../../../../../commons/config'
import { myst } from '../../../../../commons/myst.utils'
import Button from '../../../../../Components/Buttons/Button'
import Tooltip from '../../../../../Components/Tooltip/Tooltip'
import { selectors } from '../../../../../redux/selectors'
import WithdrawalModal from '../../WithdrawalModal/WithdrawalModal'
import { Card } from '../Card'
import { QuickSettleModal } from './QuickSettleModal'
import { SettleSettingsModal } from './SettleSettingsModal'
import styles from './EarningsCard.module.scss'

const { display, toWeiBig, toBig } = myst

export const EarningsCard = () => {
  return (
    <Card span={2}>
      <div className={styles.split}>
        <Earnings />
        <div className={styles.separator} />
        <Balance />
      </div>
    </Card>
  )
}

const Earnings = () => {
  const { earningsTokens } = useSelector(selectors.currentIdentitySelector)
  const { settlementTokens } = useSelector(selectors.feesSelector)
  const config = useSelector(selectors.configSelector)
  const threshold = toWeiBig(configParser.zeroStakeSettlementThreshold(config))

  const tooltipText = useMemo(
    () =>
      `These are confirmed earnings which are not settled to your Balance yet. Settlement to Balance is done either automatically when ${threshold} MYST is reached or manually when SETTLE button is clicked. Please note that settlement fee is 20% plus blockchain fees (${display(
        display(settlementTokens.wei),
      )}), so Balance will be lower than Total earnings.`,
    [threshold, config],
  )

  const progressPercent = toBig(earningsTokens.wei).times(100).div(threshold).toNumber()

  const [withdrawalOpen, setWithdrawalOpen] = useState<boolean>(false)
  const [quickSettleOpen, setQuickSettleOpen] = useState<boolean>(false)
  return (
    <div className={styles.earnings}>
      <div className={styles.split}>
        <div className={styles.earningsAmount}>
          <div className={styles.value}>{display(earningsTokens.wei)}</div>
          <div className={styles.label}>
            Unsettled earnings
            <Tooltip title={tooltipText} />
          </div>
        </div>
        <div className={styles.earningsProgressContainer}>
          <p>Next settlement</p>
          <progress value={progressPercent} max={100} className={styles.earningsProgress} />
        </div>
      </div>

      <div className={styles.earningsControls}>
        <Button extraStyle="outline-primary" onClick={() => setQuickSettleOpen(true)}>
          settle
        </Button>
        <Button extraStyle="outline-primary" onClick={() => setWithdrawalOpen(true)}>
          Automatic
        </Button>
      </div>
      <QuickSettleModal open={quickSettleOpen} onClose={() => setQuickSettleOpen(false)} />
      <SettleSettingsModal open={withdrawalOpen} onClose={() => setWithdrawalOpen(false)} />
    </div>
  )
}

const Balance = () => {
  const { balanceTokens } = useSelector(selectors.currentIdentitySelector)

  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={styles.balance}>
      <div className={styles.balanceTitle}>
        <div className={styles.balanceTitleText}>Remaining internal Node balance:</div>
        <div>{display(balanceTokens.wei)}</div>
      </div>
      <div className={styles.balanceControl}>
        <Button onClick={() => setOpen(true)} extraStyle="outline-primary">
          withdraw
        </Button>
      </div>
      <p className={styles.balanceNote}>
        Note: as Automatic withdrawals are enabled, your internal node balance will not increase anymore. Once withdrawn
        this section will disappear.
      </p>
      <WithdrawalModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  )
}
