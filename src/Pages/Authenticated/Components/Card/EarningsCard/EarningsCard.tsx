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
import { lockouts } from '../../../../../commons/lockout'
import { Media } from '../../../../../commons/media'
import { myst } from '../../../../../commons/mysts'
import page from '../../../../../commons/page'
import Button from '../../../../../Components/Buttons/Button'
import { LockoutButton } from '../../../../../Components/Buttons/LockoutButton'
import Tooltip from '../../../../../Components/Tooltip/Tooltip'
import { selectors } from '../../../../../redux/selectors'
import { Card } from '../Card'
import styles from './EarningsCard.module.scss'
import { QuickSettleModal } from './QuickSettleModal'
import { SettleSettingsModal } from './SettleSettingsModal'
import identities from '../../../../../commons/identities'
import { useAppSelector } from '../../../../../commons/hooks'

const QUICK_SETTLE_LOCKOUT_ID = 'QUICK_SETTLE_LOCKOUT_ID'
const { display, toWeiBig, toBig } = myst
const { api } = tequila

export const EarningsCard = () => {
  return (
    <>
      <Media.Desktop>
        <Card width="100%">
          <Earnings />
        </Card>
      </Media.Desktop>
      <Media.Mobile>
        <Card>
          <Earnings />
        </Card>
      </Media.Mobile>
    </>
  )
}

const Earnings = () => {
  const { earningsTokens, id } = useAppSelector(selectors.currentIdentitySelector)
  const { current } = useAppSelector(selectors.feesSelector)
  const config = useAppSelector(selectors.configSelector)
  const thresholdWei = toWeiBig(configs.zeroStakeSettlementThreshold(config))

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
      `These are confirmed earnings which are not settled to your external wallet'
       yet. Settlement is done either automatically when ${display(thresholdWei, {
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
      <div className={styles.content}>
        <div className={styles.earningsAmount}>
          <div className={styles.value}>{display(earningsTokens.wei, { fractionDigits: 2 })}</div>
          <div className={styles.label}>
            Unsettled earnings
            <Tooltip title={tooltipText} />
          </div>
        </div>
        <Media.Desktop>
          <div className={styles.earningsProgressContainer}>
            <p>Next auto settlement ({display(thresholdWei, { fractionDigits: 1 })})</p>
            <progress value={progressPercent} max={100} className={styles.earningsProgress} />
          </div>
        </Media.Desktop>
      </div>

      <div className={styles.earningsControls}>
        <LockoutButton
          id={QUICK_SETTLE_LOCKOUT_ID}
          extraStyle="outline-primary"
          onClick={() => setQuickSettleOpen(true)}
        >
          settle Now
        </LockoutButton>
        <Button extraStyle="outline-primary" onClick={() => setWithdrawalOpen(true)} isLoading={isSettingsLoading}>
          Settings {beneficiaryTx?.error && '(ERROR)'}
        </Button>
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
