/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { HeaderItem } from '../../../../Components/Header/HeaderItem'
import { useAppSelector, useFetch } from '../../../../commons/hooks'
import { tequila } from '../../../../api/tequila'
import { selectors } from '../../../../redux/selectors'
import { NodeMonitoringStatus, NodeMonitoringStatusResponse } from 'mysterium-vpn-js/lib/node/status'
import { ReactNode } from 'react'
import { themeCommon } from '../../../../theme/themeCommon'
import { Tooltip } from '../../../../Components/Tooltip/Tooltip'
import * as React from 'react'
import { InfoIcon } from '../../../../Components/Icons/Icons'

export type StatusIndicatorVariants = 'online' | 'offline' | 'monitoringFailed' | 'pending'

interface IndicatorProps {
  $variant: StatusIndicatorVariants
}

export const Indicator = styled.div<IndicatorProps>`
  background: ${({ theme, $variant }) => theme.nodeStatus.bg[$variant]};
  border-radius: 50%;
  height: 15px;
  width: 15px;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-family: Ubuntu, sans-serif;
  font-size: ${themeCommon.fontSizeSmall};
  color: ${({ theme }) => theme.nodeStatus.textColor};
  gap: 4px;
`

const resolveVariant = (anyOnline: boolean, monitoringStatus: NodeMonitoringStatus): StatusIndicatorVariants => {
  if (!anyOnline) {
    return 'offline'
  }

  if (anyOnline && monitoringStatus === 'failed') {
    return 'monitoringFailed'
  }
  if (anyOnline && monitoringStatus === 'pending') {
    return 'pending'
  }

  return 'online'
}

const Icon = styled(InfoIcon)`
  height: 10px;
  width: 10px;
  position: absolute;
  right: 10px;
  top: 0;
`
export const resolveContent = (variant: StatusIndicatorVariants): ReactNode => {
  switch (variant) {
    case 'online':
      return <Content>Online</Content>
    case 'offline':
      return <Content>Offline</Content>
    case 'monitoringFailed':
      return <Content>Monitoring failed</Content>
  }
}

export const NodeStatus = () => {
  const services = useAppSelector(selectors.runningServices)
  const anyOnline = services.length > 0

  const [data = { status: 'pending' } as NodeMonitoringStatusResponse] = useFetch(() =>
    tequila.api.nodeMonitoringStatus(),
  )

  const variant = resolveVariant(anyOnline, data.status)
  const content = resolveContent(variant)

  return (
    <HeaderItem
      title="Node status"
      dataTestId="NodeStatus.container"
      content={
        <>
          <Indicator data-test-id="NodeStatus.indicator" $variant={variant}></Indicator>
          {content}
          <Tooltip content={'Placeholder text for tooltip'}>
            <Icon data-test-id="Icons.infoIcon" />
          </Tooltip>
        </>
      }
    />
  )
}
