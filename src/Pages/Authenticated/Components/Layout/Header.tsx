/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { devices } from '../../../../theme/themes'
import { NodeStatus } from '../NodeStatus/NodeStatus'
import { Quality } from '../Quality/Quality'
import { SettlementStatus } from '../SettlementStatus/SettlementStatus'
import { Profile } from '../Profile/Profile'
import { Notifications } from '../Notifications/Notifications'
import PageTitle from '../../../../Components/LayoutHeader/LayoutHeader'
import { ReactNode } from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 32px 20px 32px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media ${devices.laptopL} {
    gap: 15px;
  }
`
const Group = styled.div`
  display: flex;
  gap: 26px;
  align-items: center;
  @media ${devices.laptopL} {
    gap: 15px;
  }
`
interface Props {
  logo?: ReactNode
  title?: string
}
export const Header = ({ logo, title }: Props) => {
  return (
    <Container>
      <PageTitle logo={logo} name={title} />
      <NodeStatus />
      <Quality />
      <SettlementStatus />
      <Group>
        <Notifications />
        <Profile />
      </Group>
    </Container>
  )
}
