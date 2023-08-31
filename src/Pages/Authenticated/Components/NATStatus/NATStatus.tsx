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
import { Tooltip } from '../../../../Components/Tooltip/Tooltip'
import * as React from 'react'
import { InfoIcon } from '../../../../Components/Icons/Icons'

const Content = styled.div`
  color: ${({ theme }) => theme.nodeStatus.textColor};
  font-weight: 400;
  font-family: Ubuntu, sans-serif;
  font-size: ${themeCommon.fontSizeSmall};
  margin-left: -10px;
`
const Icon = styled(InfoIcon)`
  height: 10px;
  width: 10px;
  position: absolute;
  right: 10px;
  top: 0;
`
export const NATStatus = () => {
  const { type } = useAppSelector(selectors.natType)
  const natInfo = nat2Human(type)
  return (
    <HeaderItem
      title={'NAT Status:'}
      data-test-id="NATstatusContainer"
      content={
        <>
          <Content>{natInfo.label}</Content>
          <Tooltip content={'Placeholder text for tooltip'}>
            <Icon data-test-id="Icons.infoIcon" />
          </Tooltip>
        </>
      }
    />
  )
}
