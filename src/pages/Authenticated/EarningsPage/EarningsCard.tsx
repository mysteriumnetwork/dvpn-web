/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PropsWithChildren, ReactElement, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { twMerge } from 'tailwind-merge'
import Label from '../../../components/Typography/Label'
import Card, { CardProps } from '../../../components/Cards/Card'
import Button from '../../../components/Buttons/Button'
import { GraphIcon } from '../../../components/Icons/Icons'
import DownloadTransactionsButton from '../../components/Buttons/DownloadTransactionsButton'
import { SettleModal } from '../../components/Modals/SettleModal'
import { selectors } from '../../../redux/selectors'
import { myst } from '../../../commons/mysts'
import { feez } from '../../../commons/fees'
import { configs } from '../../../commons/config'
import { lockouts } from '../../../commons/lockout'
import { useAppSelector } from '../../../commons/hooks'

const EarningsCard = (props: CardProps) => {
  const config = useAppSelector(selectors.currentConfig)
  const { earningsTokens, earningsTotalTokens } = useAppSelector(selectors.currentIdentity)
  const settleThresholdMyst = configs.zeroStakeSettlementThreshold(config)

  const [showModal, setShowModal] = useState(false)

  const unsettledAmount = useMemo(() => myst.toBig(earningsTokens.wei), [earningsTokens.wei])
  const totalSettled = useMemo(
    () => feez.calculateSettled(earningsTokens, earningsTotalTokens),
    [earningsTokens, earningsTotalTokens],
  )

  return (
    <Card {...props}>
      <div className="divide-y">
        <CardRow label="Total settled" value={totalSettled} />
        <CardRow label="Unsettled" value={unsettledAmount} />
        <CardRow
          label="Next settlement at"
          value={myst.toWeiBig(settleThresholdMyst)}
          action={
            <Button
              size="sm"
              label="Settle now"
              className="w-full sm:min-w-[150px] sm:max-w-[150px] sm:mx-auto"
              onClick={() => setShowModal(true)}
            />
          }
        />
        <CardRowContainer>
          <div className="flex w-full gap-6 items-center sm:w-1/2">
            <div className="size-10 min-w-10 sm:size-16 sm:min-w-16 bg-white-50 rounded-full flex items-center justify-center">
              <GraphIcon className="text-blue-175 size-6 sm:size-10" />
            </div>
            <div className="text-sm font-medium">Record of transactions</div>
          </div>
          <DownloadTransactionsButton size="sm" className="w-full mt-5 sm:min-w-[150px] sm:max-w-[150px] sm:mx-auto" />
        </CardRowContainer>
      </div>
      <SettleModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={() => lockouts.lock({ id: 'SETTLE_LOCKOUT_ID', seconds: 60, refreshPage: true })}
      />
    </Card>
  )
}

const CardRowContainer = ({ children }: PropsWithChildren) => (
  <div className="sm:flex sm:items-center py-5">{children}</div>
)

const CardRow = ({ label, value, action }: { label: string; value: BigNumber | number; action?: ReactElement }) => (
  <CardRowContainer>
    <div className={twMerge('flex w-full justify-between items-baseline sm:w-1/2', action && 'mb-5 sm:mb-0')}>
      <div className="text-sm font-medium">{label}</div>
      <div className="flex items-baseline">
        <Label value={myst.display(value, { fractions: 2, currency: false })} />
        <div className="text-gray-550 text-xs font-normal ml-2.5">MYST</div>
      </div>
    </div>
    {action}
  </CardRowContainer>
)

export default EarningsCard
