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

const Content = styled.div`
  color: ${({ theme }) => theme.nodeStatus.textColor};
  font-weight: 400;
  font-family: Ubuntu, sans-serif;
  font-size: ${themeCommon.fontSizeSmall};
  margin-left: -10px;
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
        </>
      }
    />
  )
}
