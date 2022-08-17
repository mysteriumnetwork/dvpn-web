/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from './Card'
import { ProgressBar } from '../../../Components/ProgressBar/ProgressBar'
import styled from 'styled-components'
import { useAppSelector } from '../../../commons/hooks'
import { selectors } from '../../../redux/selectors'
import { configs } from '../../../commons/config'
import { myst } from '../../../commons/mysts'
import { useMemo, useState } from 'react'
import { SettleModal } from '../Components/SettleModal/SettleModal'
import { lockouts } from '../../../commons/lockout'
import { LockoutButton } from '../../../Components/Inputs/LockoutButton'
import { ReactComponent as WarningSVG } from '../../../assets/images/notifications/negative.svg'

const Progress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: nowrap;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
  width: 100%;
`

const Info = styled.div`
  color: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.common.colorGrayBlue};
`

const CurrentEarnings = styled.div`
  color: ${({ theme }) => theme.settleCard.earningsColor};
`

const WarningIcon = styled(WarningSVG)`
  width: 34px;
  margin-left: 4px;
  path,
  circle {
    stroke: white;
  }
`

const SETTLE_LOCKOUT_ID = 'SETTLE_LOCKOUT_ID'

export const SettlementCard = () => {
  const { earningsTokens } = useAppSelector(selectors.currentIdentity)
  const { error } = useAppSelector(selectors.beneficiaryTxStatus)
  const config = useAppSelector(selectors.currentConfig)
  const thresholdMyst = configs.zeroStakeSettlementThreshold(config)
  const [showModal, setShowModal] = useState(false)

  const value = useMemo(() => Number(myst.toEtherBig(earningsTokens.wei).toFixed(2)), [earningsTokens.wei])

  return (
    <Card scale={true}>
      <SettleModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={() => lockouts.lock({ id: SETTLE_LOCKOUT_ID, seconds: 60, refreshPage: true })}
      />
      <Content>
        <Progress>
          <Row>
            <Info>Next auto settlement ({myst.display(myst.toWeiBig(thresholdMyst), { fractionDigits: 1 })})</Info>
            <CurrentEarnings>{myst.display(earningsTokens.wei, { fractionDigits: 2 })}</CurrentEarnings>
          </Row>
          <ProgressBar max={thresholdMyst} value={value} size="big" />
        </Progress>
        <LockoutButton
          id={SETTLE_LOCKOUT_ID}
          label={
            <>
              Settle Now
              {error && <WarningIcon />}
            </>
          }
          size="medium"
          rounded
          onClick={() => setShowModal(true)}
        />
      </Content>
    </Card>
  )
}
