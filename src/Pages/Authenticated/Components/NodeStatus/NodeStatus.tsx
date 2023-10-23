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
import { useAppSelector, useFetch } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import { themeCommon } from '../../../../theme/themeCommon'
import { Link } from '../../../../Components/Common/Link'
import { NODE_STATUS } from '../../../../constants/urls'
import { useStores } from '../../../../mobx/store'

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

export const resolveContent = (variant: StatusIndicatorVariants): string => {
  switch (variant) {
    case 'online':
      return 'Online'
    case 'offline':
      return 'Offline'
    case 'monitoringFailed':
      return 'Monitoring failed'
  }
  return ''
}

export const NodeStatus = observer(() => {
  const services = useAppSelector(selectors.runningServices)
  const anyOnline = services.length > 0

  const { headerStore } = useStores()
  const variant = anyOnline ? headerStore.resolveStatusVariant : 'offline'

  return (
    <HeaderItem
      title={resolveContent(variant)}
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
