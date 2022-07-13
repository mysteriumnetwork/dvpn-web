/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import themes from '../../commons/themes'
import { useMemo } from 'react'

interface BarProps {
  $size?: 'big' | 'small'
  $primary?: boolean
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
const Container = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Progress = styled.div<BarProps>`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
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
  transform: translateY(2.5px) translateX(28.5px);
`
const Mark = styled.span<BarProps>`
  height: ${({ $size }) => {
    return $size === 'big' ? '4px' : '1px'
  }};
  width: 1px;
  border-radius: ${({ $size }) => {
    return $size === 'big' ? '10px' : '50%'
  }};
  background-color: ${({ $primary }) => ($primary ? themes.common.colorGrayBlue : `${themes.common.colorGrayBlue2}10`)};
`
const MarkContainer = styled.div<BarProps>`
  width: ${({ $size }) => {
    return $size === 'big' ? '343px' : '124px'
  }};
  box-sizing: border-box;
  display: flex;
  margin: ${({ $size }) => {
    return $size === 'big' ? '9px' : '4px'
  }};
  justify-content: space-between;
`
const Tooltip = styled.div`
  height: 13px;
  width: 32px;
  background-color: ${themes.common.colorKey};
  color: ${themes.common.colorWhite};
  border-radius: 100px;
  font-size: ${themes.common.fontSizeSmaller};
  position: relative;
  transform: translateX(16.5px) translateY(-17px);
  text-align: center;
  display: flex;
  align-items: center;

  &:before {
    content: attr(data-tooltip);
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
  &:after {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    left: 0px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid ${themes.common.colorKey};
    transform: translateX(12px) translateY(8px);
  }
`
interface Props {
  max: number
  value: number
  size: 'big' | 'small'
}

export const ProgressBar = ({ max, value, size }: Props) => {
  const width = (value / max) * 100

  const marks = useMemo(
    () =>
      [...Array(max * 2 + 1)].map((_, i) => {
        return <Mark $size={size} $primary={i % 2 === 0} />
      }),
    [max],
  )

  return (
    <Container>
      <Bar $size={size}>
        <Progress $width={width}>
          {size === 'small' && (
            <div>
              <Circle />
              <Tooltip data-tooltip={value} />
            </div>
          )}
        </Progress>
      </Bar>
      <MarkContainer $size={size}>{marks}</MarkContainer>
    </Container>
  )
}
