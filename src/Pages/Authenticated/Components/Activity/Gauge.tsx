/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'

interface PieProps {
  $width: number
  $border: number
  $percentage: number
  $fill: string
  $bg: string
}

const GaugeChart = styled.div<PieProps>`
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $width }) => `${$width / 2}px`};
  position: relative;
  font-size: 22px;
  font-weight: 600;
  overflow: hidden;
  color: ${({ $fill }) => $fill};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  box-sizing: border-box;

  :after {
    content: '';
    width: ${({ $width }) => `${$width}px`};
    height: ${({ $width }) => `${$width}px`};
    border: ${({ $border }) => $border}px solid;
    border-color: ${({ $bg, $fill }) => `${$bg} ${$bg} ${$fill} ${$fill}`};
    position: absolute;
    border-radius: 50%;
    left: 0;
    top: 0;
    box-sizing: border-box;
    transform: rotate(calc(1deg * (-45 + ${({ $percentage }) => $percentage} * 1.8)));
  }
`

interface Props {
  width?: number
  border?: number
  progress: number
  fill: string
  bgColor: string
}

export const Gauge = ({ width = 300, progress, fill, bgColor, border = 50 }: Props) => {
  return <GaugeChart $percentage={progress} $fill={fill} $bg={bgColor} $width={width} $border={border} />
}
