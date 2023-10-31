/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { HeaderItem } from '../../../../Components/Header/HeaderItem'
import { Link } from '../../../../Components/Common/Link'
import { NODE_QUALITY } from '../../../../constants/urls'
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import { useStores } from '../../../../mobx/store'

type IndicatorVariants = 'good' | 'normal' | 'poor' | 'unknown'
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

export const Quality = observer(() => {
  const services = useAppSelector(selectors.runningServices)
  const anyOnline = services.length > 0
  const { headerStore } = useStores()

  return (
    <HeaderItem
      title="Quality"
      variant="bubble"
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
      content={<Indicator $variant={anyOnline ? headerStore.resolveQualityVariant : 'unknown'} />}
    />
  )
})
