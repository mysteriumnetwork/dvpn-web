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
import { Media } from '../../../../../commons/media.utils'
import { myst } from '../../../../../commons/myst.utils'
import Button from '../../../../../Components/Buttons/Button'
import Tooltip from '../../../../../Components/Tooltip/Tooltip'
import { selectors } from '../../../../../redux/selectors'
import WithdrawalModal from '../../WithdrawalModal/WithdrawalModal'
import { Card } from '../Card'
import styles from './EarningsCard.module.scss'
import { QuickSettleModal } from './QuickSettleModal'
import { SettleSettingsModal } from './SettleSettingsModal'

const SETTINGS_BUTTON_NAME = 'Auto Withdrawal:'

const { display, toWeiBig, toBig, toEtherBig } = myst
const { api } = tequila

export const EarningsCard = () => {
  const { balanceTokens } = useSelector(selectors.currentIdentitySelector)
  const isAutoWithdrawal = useSelector(selectors.isAutomaticWithdrawalSelector)
  const isBalanceVisible = toEtherBig(balanceTokens.wei).gte(0.001) || !isAutoWithdrawal

  return (
    <>
      <Media.Desktop>
        <Card width="100%">
          <div className={styles.split}>
            <Earnings />
            {isBalanceVisible && (
              <>
                <div className={styles.separator} />
                <Balance />
              </>
            )}
          </div>
        </Card>
      </Media.Desktop>
      <Media.Mobile>
        <Card>
          <Earnings />
        </Card>
        {isBalanceVisible && (
          <Card>
            <Balance />
          </Card>
        )}
      </Media.Mobile>
    </>
  )
}

const ONE_MINUTE = 60 * 1000

const Earnings = () => {
  const { earningsTokens, id } = useSelector(selectors.currentIdentitySelector)
  const { settlementTokens } = useSelector(selectors.feesSelector)
  const isAutoWithdrawal = useSelector(selectors.isAutomaticWithdrawalSelector)
  const config = useSelector(selectors.configSelector)
  const thresholdWei = toWeiBig(configParser.zeroStakeSettlementThreshold(config))

  const [beneficiaryTx, setBeneficiaryTx] = useState<BeneficiaryTxStatus | undefined>()
  const [isSettingsLoading, setIsSettingsLoading] = useState<boolean>(false)

  const updateSettingsLoading = () => {
    setIsSettingsLoading(beneficiaryTx?.state === 'pending')
  }

  useEffect(() => {
    ;(async () => {
      updateSettingsLoading()
      setBeneficiaryTx(await api.beneficiaryTxStatus(id).catch(() => undefined))
    })()
  }, [])

  const tooltipText = useMemo(
    () =>
      `These are confirmed earnings which are not settled to your ${
        isAutoWithdrawal ? 'external wallet' : 'balance'
      } yet. Settlement is done either automatically when ${display(thresholdWei, {
        fractionDigits: 1,
      })} is reached or manually when SETTLE button is clicked. Please note that settlement fee is 20% plus current blockchain fees (${display(
        settlementTokens.wei,
      )}).`,
    [thresholdWei, settlementTokens.wei],
  )

  const progressPercent = toBig(earningsTokens.wei).times(100).div(thresholdWei).toNumber()

  const [withdrawalOpen, setWithdrawalOpen] = useState<boolean>(false)
  const [quickSettleOpen, setQuickSettleOpen] = useState<boolean>(false)

  const settingsButtonName = (() => {
    if (beneficiaryTx?.state === 'completed' && beneficiaryTx?.error) {
      return `${SETTINGS_BUTTON_NAME} ERROR`
    }

    return isAutoWithdrawal ? `${SETTINGS_BUTTON_NAME} ON` : `${SETTINGS_BUTTON_NAME} OFF`
  })()

  const initTimerTimeStamp = async () => {
    setIsSettingsLoading(true)
    await new Promise((r) => setInterval(r, ONE_MINUTE))
    // @ts-ignore
    window.location.reload(true)
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
          <div className={styles.earningsProgressContainer}>
            <p>Next auto settlement ({display(thresholdWei, { fractionDigits: 1 })})</p>
            <progress value={progressPercent} max={100} className={styles.earningsProgress} />
          </div>
        </Media.Desktop>
      </div>

      <div className={styles.earningsControls}>
        <Button extraStyle="outline-primary" onClick={() => setQuickSettleOpen(true)}>
          settle Now
        </Button>

        <Button extraStyle="outline-primary" onClick={() => setWithdrawalOpen(true)} isLoading={isSettingsLoading}>
          {settingsButtonName}
        </Button>
      </div>
      <QuickSettleModal open={quickSettleOpen} onClose={() => setQuickSettleOpen(false)} />
      <SettleSettingsModal open={withdrawalOpen} onClose={() => setWithdrawalOpen(false)} onSave={initTimerTimeStamp} />
    </div>
  )
}

const Balance = () => {
  const { balanceTokens } = useSelector(selectors.currentIdentitySelector)
  const isAutoWithdrawal = useSelector(selectors.isAutomaticWithdrawalSelector)
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={styles.balance}>
      <div className={styles.split}>
        <div className={styles.balanceAmount}>
          <div className={styles.value}>{display(balanceTokens.wei, { fractionDigits: 2 })}</div>
          <div className={styles.label}>Internal Balance</div>
        </div>
        <WithdrawalModal isOpen={open} onClose={() => setOpen(false)} />
      </div>
      <div className={styles.balanceControl}>
        <Button onClick={() => setOpen(true)} extraStyle="outline-primary">
          withdraw
        </Button>
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
