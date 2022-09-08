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
import { ReactComponent as WarningSVG } from '../../../../assets/images/toasts/warning.svg'
import { Tooltip } from '../../../../Components/Tooltip/Tooltip'

export type IndicatorVariants = 'online' | 'offline' | 'monitoringFailed'

interface IndicatorProps {
  $variant: IndicatorVariants
}

export const Indicator = styled.div<IndicatorProps>`
  background: ${({ theme, $variant }) => theme.nodeStatus.bg[$variant]};
  color: ${({ theme, $variant }) => theme.nodeStatus.textColor[$variant]};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  font-weight: 500;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const resolveVariant = (anyOnline: boolean, monitoringStatus: NodeMonitoringStatus): IndicatorVariants => {
  if (!anyOnline) {
    return 'offline'
  }

  if (anyOnline && monitoringStatus === 'failed') {
    return 'monitoringFailed'
  }

  return 'online'
}

const WarningIcon = styled(WarningSVG)`
  width: ${({ theme }) => theme.common.fontSizeSmall};
  height: ${({ theme }) => theme.common.fontSizeSmall};
  path,
  circle {
    stroke: ${({ theme }) => theme.nodeStatus.textColor.monitoringFailed};
    stroke: ${({ theme }) => theme.nodeStatus.textColor.monitoringFailed};
  }
`

export const resolveContent = (variant: IndicatorVariants): ReactNode => {
  switch (variant) {
    case 'online':
      return <Content>Online</Content>
    case 'offline':
      return <Content>Offline</Content>
    case 'monitoringFailed':
      return (
        <Tooltip content="Please contact support">
          <Content>
            <WarningIcon />
            Monitoring failed
          </Content>
        </Tooltip>
      )
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

  return <HeaderItem title="Status" content={<Indicator $variant={variant}>{content}</Indicator>} />
}
