/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { NodeStatus } from '../../../mobx/Indications.store'
import { BubbleIndicator, BubbleIndicatorVariant } from '../../../components/Indicators/BubbleIndicator'
import { useAppSelector } from '../../../commons/hooks'
import { selectors } from '../../../redux/selectors'
import { useStores } from '../../../mobx/store'

const statusTitleMap: Record<NodeStatus, string> = {
  online: 'Online',
  offline: 'Offline',
  monitoringFailed: 'Monitoring failed',
  unknown: 'Pending',
  pending: 'Pending',
}

export const resolveStatusTitle = (variant: NodeStatus): string => {
  return statusTitleMap[variant] || 'Pending'
}

const indicatorVariantByStatus: Record<NodeStatus, BubbleIndicatorVariant> = {
  online: 'success',
  offline: 'disabled',
  monitoringFailed: 'error',
  unknown: 'warning',
  pending: 'warning',
}

export const NodeStatusIndicator = observer(() => {
  const services = useAppSelector(selectors.runningServices)
  const anyOnline = services.length > 0
  const { indicationsStore } = useStores()
  const variant = anyOnline ? indicationsStore.resolveStatusVariant : 'offline'

  return <BubbleIndicator variant={indicatorVariantByStatus[variant]} label={resolveStatusTitle(variant)} />
})

export default NodeStatusIndicator
