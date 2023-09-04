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
import { useMediaQuery } from 'react-responsive'
import { media } from '../../../../commons/media'
import { devices } from '../../../../theme/themes'

const ProgressContainer = styled.div`
  width: 30%;
  margin-top: 0.5em;

  @media ${devices.tablet} {
    width: 80%;
  }
`

const Text = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
`

const MobileHeaderItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  height: 100%;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  font-weight: 100;
`

export const SettlementStatus = () => {
  const isMobile = useMediaQuery(media.isMobileQuery)
  const config = useAppSelector(selectors.currentConfig)
  const { earningsTokens } = useAppSelector(selectors.currentIdentity)
  const settleThresholdMyst = configs.zeroStakeSettlementThreshold(config)

  const value = useMemo(() => Number(myst.toEtherBig(earningsTokens.wei).toFixed(2)), [earningsTokens.wei])

  if (isMobile) {
    return (
      <MobileHeaderItem>
        <ProgressContainer>
          <ProgressBar size="small" max={settleThresholdMyst} value={value} />
        </ProgressContainer>
        <Text>Next Settlement (5.0 MYST)</Text>
      </MobileHeaderItem>
    )
  }

  return (
    <HeaderItem
      minWidth={360}
      title={`Next settlement (${myst.display(myst.toWeiBig(settleThresholdMyst), { fractions: 1 })})`}
      content={
        <ProgressContainer data-test-id="SettlementStatus.progressBar">
          <ProgressBar size="small" max={settleThresholdMyst} value={value} />
        </ProgressContainer>
      }
    />
  )
}
