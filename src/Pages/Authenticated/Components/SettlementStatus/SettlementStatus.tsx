/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import { configs } from '../../../../commons/config'
import { myst } from '../../../../commons/mysts'
import { ProgressBar } from '../../../../Components/ProgressBar/ProgressBar'
import { useMemo } from 'react'
import { HeaderItem } from '../../../../Components/Header/HeaderItem'

const ProgressContainer = styled.div`
  width: 30%;
  margin-top: 0.5em;
`

export const SettlementStatus = () => {
  const config = useAppSelector(selectors.currentConfig)
  const { earningsTokens } = useAppSelector(selectors.currentIdentity)
  const settleThresholdMyst = configs.zeroStakeSettlementThreshold(config)

  const value = useMemo(() => Number(myst.toEtherBig(earningsTokens.wei).toFixed(2)), [earningsTokens.wei])

  return (
    <HeaderItem
      minWidth={300}
      title={`Next auto settlement (${myst.display(myst.toWeiBig(settleThresholdMyst), { fractions: 1 })})`}
      dataTestId="SettlementStatus.container"
      content={
        <ProgressContainer data-test-id="SettlementStatus.progressBar">
          <ProgressBar size="small" max={settleThresholdMyst} value={value} />
        </ProgressContainer>
      }
    />
  )
}
