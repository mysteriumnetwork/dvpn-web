/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { HeaderItem } from '../../../../Components/Header/HeaderItem'
import { useEffect, useState } from 'react'
import { tequila } from '../../../../api/tequila'
import styled from 'styled-components'
import { Tooltip } from '../../../../Components/Tooltip/Tooltip'
import { InfoIcon } from '../../../../Components/Icons/Icons'
import * as React from 'react'

type IndicatorVariants = 'good' | 'normal' | 'poor'
interface IndicatorProps {
  $variant: IndicatorVariants
}
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
const Icon = styled(InfoIcon)`
  height: 10px;
  width: 10px;
  position: absolute;
  right: 10px;
  top: 0;
`
export const Indicator = styled.div<IndicatorProps>`
  background: ${({ theme, $variant }) => theme.quality.bg[$variant]};
  border-radius: 50%;
  height: 15px;
  width: 15px;
`
const Row = styled.div`
  display: flex;
  align-items: center;

  :before {
    content: '';
    border: 2px solid ${({ theme }) => theme.common.colorKey};
    margin-right: 4px;
    border-radius: 100%;
  }
`

export const Quality = () => {
  const [quality, setQuality] = useState(0)

  useEffect(() => {
    tequila.api.provider.quality().then((r) => setQuality(r.quality))
  }, [])
  const resolveVariant = (quality: number): IndicatorVariants => {
    if (quality > 0.75) {
      return 'good'
    }
    if (quality < 0.75 && quality > 0.5) {
      return 'normal'
    }
    if (quality < 0.5) {
      return 'poor'
    }
    return 'normal'
  }
  return (
    <HeaderItem
      title="Node Quality"
      data-test-id="Quality.container"
      content={
        <>
          <Indicator $variant={resolveVariant(quality)} />
          <Tooltip
            content={
              <Column>
                Quality depends on:
                <Row>Latency</Row>
                <Row>Bandwidth</Row>
                <Row>Uptime</Row>
                <Row>Successful connection rate</Row>
              </Column>
            }
          >
            <Icon data-test-id="Icons.infoIcon" />
          </Tooltip>
        </>
      }
    />
  )
}
