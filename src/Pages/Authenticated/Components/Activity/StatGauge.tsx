/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { Bubble } from './Bubble'
import { Gauge } from './Gauge'
import { useMediaQuery } from 'react-responsive'
import { media } from '../../../../commons/media'
import { devices } from '../../../../theme/themes'

const Content = styled.div<{ $bgColor?: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $bgColor }) => $bgColor && $bgColor};
  border-radius: 25px;
  @media ${devices.mobileS} {
    overflow-x: scroll;
    overflow-y: hidden;
    justify-content: flex-start;
  }
`

const Bubbles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${devices.tablet} {
    gap: 5px;
  }

  min-width: 160px;
  align-items: flex-start;
`

const ChartWrapper = styled.div`
  padding: 20px;
`

interface Props {
  progress: number
  fill: string
  fillLabel: string
  bgColor: string
  bgLabel: string
  containerBgColor?: string
}

export const StatGauge = ({ fill, bgColor, containerBgColor, progress, fillLabel, bgLabel }: Props) => {
  const isDesktop = useMediaQuery(media.isDesktopQuery)

  const width = isDesktop ? 300 : 115
  const border = isDesktop ? 50 : 25

  return (
    <Content $bgColor={containerBgColor}>
      <ChartWrapper>
        <Gauge width={width} progress={progress} fill={fill} bgColor={bgColor} border={border} />
      </ChartWrapper>
      <Bubbles>
        <Bubble label={bgLabel} bgColor={bgColor} value={`${100 - progress}%`} />
        <Bubble label={fillLabel} bgColor={fill} value={`${progress}%`} primary />
      </Bubbles>
    </Content>
  )
}
