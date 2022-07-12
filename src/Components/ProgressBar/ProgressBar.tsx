/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import themes from '../../commons/themes'

interface BarProps {
  $size: 'big' | 'small'
}

interface ProgressProps {
  $width?: number
}

export const Bar = styled.div<BarProps>`
  height: ${({ $size }) => {
    return $size === 'big' ? '9px' : '4px'
  }};
  width: ${({ $size }) => {
    return $size === 'big' ? '347px' : '126px'
  }};
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
  size: 'big' | 'small'
}

export const ProgressBar = ({ settleThresholdMyst, earningsTokens, size }: Props) => {
  console.log(settleThresholdMyst, earningsTokens)
  const width = (earningsTokens / settleThresholdMyst) * 100
  console.log(width)
  return (
    <Bar $size={size}>
      <Progress $width={width}>{size === 'small' && <Circle />}</Progress>
    </Bar>
  )
}
