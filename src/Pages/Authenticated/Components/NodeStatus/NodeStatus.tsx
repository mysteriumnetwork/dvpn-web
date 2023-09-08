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
import * as React from 'react'
import { ReactNode } from 'react'
import { themeCommon } from '../../../../theme/themeCommon'
import { Link } from '../../../../Components/Common/Link'
import { NODE_STATUS } from '../../../../constants/urls'

export type StatusIndicatorVariants = 'online' | 'offline' | 'monitoringFailed' | 'pending'

interface IndicatorProps {
  $variant: StatusIndicatorVariants
}

export const Indicator = styled.div<IndicatorProps>`
  background: ${({ theme, $variant }) => theme.nodeStatus.bg[$variant]};
  border-radius: 50%;
  min-height: 15px;
  height: 15px;
  max-height: 15px;
  min-width: 15px;
  width: 15px;
  max-width: 15px;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-family: Ubuntu, sans-serif;
  font-size: ${themeCommon.fontSizeSmall};
  color: ${({ theme }) => theme.nodeStatus.textColor};
`

const Tooltip = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
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
      title="Status"
      tooltip={
        <Tooltip>
          <div>Indicated the status of your node.</div>
          <Link href={NODE_STATUS} target="_blank">
            Learn more
          </Link>
        </Tooltip>
      }
      content={
        <>
          <Indicator $variant={variant}></Indicator>
          {content}
        </>
      }
    />
  )
}
