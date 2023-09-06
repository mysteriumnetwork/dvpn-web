/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { HeaderItem } from '../../../../Components/Header/HeaderItem'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { tequila } from '../../../../api/tequila'
import styled from 'styled-components'
import { Link } from '../../../../Components/Common/Link'
import { NODE_QUALITY } from '../../../../constants/urls'

type IndicatorVariants = 'good' | 'normal' | 'poor'
interface IndicatorProps {
  $variant: IndicatorVariants
}
export const Indicator = styled.div<IndicatorProps>`
  background: ${({ theme, $variant }) => theme.quality.bg[$variant]};
  border-radius: 50%;
  min-height: 15px;
  height: 15px;
  max-height: 15px;
  min-width: 15px;
  width: 15px;
  max-width: 15px;
`

const Tooltip = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
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
      title="Quality"
      tooltip={
        <Tooltip>
          <div style={{ marginBottom: '6px' }}>
            Node service quality indicates your node’s accessibility to consumers.
          </div>
          <div>
            <b>Green</b> - quality is great and can be used by any consumer.
          </div>
          <div>
            <b>Orange</b> - quality is satisfactory and can be used by most consumers.
          </div>
          <div>
            <b>Red</b> - poor quality and is unlikely to be utilized.
          </div>
          <Link style={{ marginTop: '6px' }} href={NODE_QUALITY} target="_blank">
            Learn more
          </Link>
        </Tooltip>
      }
      content={<Indicator $variant={resolveVariant(quality)} />}
    />
  )
}
