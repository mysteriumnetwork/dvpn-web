/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { BubbleIndicator, BubbleIndicatorVariant } from '../../../components/Indicators/BubbleIndicator'
import { useAppSelector } from '../../../commons/hooks'
import { selectors } from '../../../redux/selectors'
import { NodeQuality } from '../../../mobx/Indications.store'
import { useStores } from '../../../mobx/store'

const qualityTitleMap: Record<NodeQuality, string> = {
  good: 'Great',
  normal: 'Normal',
  poor: 'Poor',
  unknown: 'Unknown',
}

export const resolveStatusTitle = (variant: NodeQuality): string => {
  return qualityTitleMap[variant] || 'Unknown'
}

const indicatorVariantByStatus: Record<NodeQuality, BubbleIndicatorVariant> = {
  good: 'success',
  normal: 'warning',
  poor: 'error',
  unknown: 'disabled',
}

export const NodeQualityIndicator = observer(() => {
  const services = useAppSelector(selectors.runningServices)
  const anyOnline = services.length > 0
  const { indicationsStore } = useStores()
  const variant = anyOnline ? indicationsStore.resolveQualityVariant : 'unknown'

  return <BubbleIndicator variant={indicatorVariantByStatus[variant]} label={resolveStatusTitle(variant)} />
})

export default NodeQualityIndicator
