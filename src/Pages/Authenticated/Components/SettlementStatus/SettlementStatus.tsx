/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Slider } from '../../../../Components/Slider/Slider'
import styled from 'styled-components'
import { ReactNode, useMemo } from 'react'
import themes from '../../../../commons/themes'
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import { configs } from '../../../../commons/config'
import { myst } from '../../../../commons/mysts'

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const SliderContainer = styled.div`
  width: 200px;
`

const Title = styled.div`
  color: ${themes.current().colorDarkBlue};
  font-size: ${themes.current().fontSizeSmall};
  font-family: Ubuntu;
  font-style: normal;
  font-weight: 400;
`

export const SettlementStatus = () => {
  const config = useAppSelector(selectors.configSelector)
  const { earningsTokens } = useAppSelector(selectors.currentIdentitySelector)
  const settleThresholdMyst = configs.zeroStakeSettlementThreshold(config)

  const marks = useMemo(() => {
    let marks: { [k: number]: ReactNode } = {}
    for (let i = 0; i <= Math.floor(settleThresholdMyst); i++) {
      marks[i] = <div />
    }
    return marks
  }, [settleThresholdMyst])

  return (
    <Content>
      <Title>Next auto settlement ({myst.display(myst.toWeiBig(settleThresholdMyst), { fractionDigits: 1 })})</Title>
      <SliderContainer>
        <Slider min={0} step={0.01} max={5} value={myst.toEtherBig(earningsTokens.wei).toNumber()} marks={marks} />
      </SliderContainer>
    </Content>
  )
}
