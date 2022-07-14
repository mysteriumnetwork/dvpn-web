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
import { useMemo } from 'react'
import { Button } from '../../../Components/Inputs/Button'

const Progress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  min-width: 400px;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
`

const Info = styled.div`
  color: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.common.colorGrayBlue};
`

const CurrentEarnings = styled.div``

export const SettlementCard = () => {
  const { earningsTokens } = useAppSelector(selectors.currentIdentitySelector)
  const config = useAppSelector(selectors.configSelector)
  const thresholdMyst = configs.zeroStakeSettlementThreshold(config)

  const value = useMemo(() => Number(myst.toEtherBig(earningsTokens.wei).toFixed(2)), [earningsTokens.wei])

  return (
    <Card>
      <Content>
        <Progress>
          <Row>
            <Info>Next auto settlement ({myst.display(myst.toWeiBig(thresholdMyst), { fractionDigits: 1 })})</Info>
            <CurrentEarnings>{myst.display(earningsTokens.wei, { fractionDigits: 2 })}</CurrentEarnings>
          </Row>
          <ProgressBar max={thresholdMyst} value={value} size="big" />
        </Progress>
        <Button label="Settle now" rounded />
      </Content>
    </Card>
  )
}
