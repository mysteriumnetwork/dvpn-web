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
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import { Link } from '../../../../Components/Common/Link'
import { NODE_STATUS } from '../../../../constants/urls'
import { useStores } from '../../../../mobx/store'
import { StatusIndicatorVariants } from '../Layout/store'

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

const Tooltip = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const resolveStatusTitle = (variant: StatusIndicatorVariants): string => {
  switch (variant) {
    case 'online':
      return 'Online'
    case 'offline':
      return 'Offline'
    case 'monitoringFailed':
      return 'Monitoring failed'
    case 'unknown':
      return 'Pending'
  }
}

export const NodeStatus = observer(() => {
  const services = useAppSelector(selectors.runningServices)
  const anyOnline = services.length > 0

  const { headerStore } = useStores()
  const variant = anyOnline ? headerStore.resolveStatusVariant : 'offline'

  return (
    <HeaderItem
      title={resolveStatusTitle(variant)}
      variant="bubble"
      tooltip={
        <Tooltip>
          <div>Indicated the status of your node.</div>
          <Link href={NODE_STATUS} target="_blank">
            Learn more
          </Link>
        </Tooltip>
      }
      content={<Indicator $variant={variant}></Indicator>}
    />
  )
})
