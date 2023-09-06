/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { HeaderItem } from '../../../../Components/Header/HeaderItem'
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import { nat2Human } from '../../SettingsPage/Tabs/Advanced/utils'
import styled from 'styled-components'
import { themeCommon } from '../../../../theme/themeCommon'
import * as React from 'react'
import { Link } from '../../../../Components/Common/Link'
import { DOCS_NAT_FIX } from '../../../../constants/urls'

const Content = styled.div`
  color: ${({ theme }) => theme.nodeStatus.textColor};
  font-weight: 400;
  font-family: Ubuntu, sans-serif;
  font-size: ${themeCommon.fontSizeSmall};
  margin-left: -10px;
`

const Tooltip = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const NATStatus = () => {
  const { type } = useAppSelector(selectors.natType)
  const natInfo = nat2Human(type)
  return (
    <HeaderItem
      title="NAT:"
      tooltip={
        <Tooltip>
          <div style={{ marginBottom: '6px' }}>NAT determines with whom you can establish connections.</div>
          <div>
            <b>Open</b> - connects to any consumer.
          </div>
          <div>
            <b>Moderate</b> - connects to most consumers.
          </div>
          <div>
            <b>Strict</b> - connects only to Open-type consumers.
          </div>
          <Link style={{ marginTop: '6px' }} href={DOCS_NAT_FIX} target="_blank">
            Learn more
          </Link>
        </Tooltip>
      }
      content={<Content>{natInfo.human}</Content>}
    />
  )
}
