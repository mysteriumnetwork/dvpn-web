/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import themes from '../../commons/themes'
interface ProgressProps {
  $width?: number
}
export const Bar = styled.div`
  height: 4px;
  width: 168px;
  border-radius: 10px;
  background-color: ${themes.common.colorGrayBlue};
`

const Progress = styled.div<ProgressProps>`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  width: ${({ $width }) => `${$width}%`};
  border-radius: 10px;
  background-color: ${themes.common.colorKey};
`
const Circle = styled.span`
  position: absolute;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid ${themes.common.colorKeyLight};
  transform: translateY(-2px) translateX(4px);
`

interface Props {
  settleThresholdMyst: number
  earningsTokens: number
}

export const ProgressBar = ({ settleThresholdMyst, earningsTokens }: Props) => {
  console.log(settleThresholdMyst, earningsTokens)
  const width = (earningsTokens / settleThresholdMyst) * 100
  console.log(width)
  return (
    <Bar>
      <Progress $width={width}>
        <Circle />
      </Progress>
    </Bar>
  )
}
