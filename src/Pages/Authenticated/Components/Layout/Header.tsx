/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { devices } from '../../../../theme/themes'
import { SettlementStatus } from '../SettlementStatus/SettlementStatus'
import { Profile } from '../Profile/Profile'
import PageTitle from '../../../../Components/LayoutHeader/PageTitle'
import { ReactNode } from 'react'
import { NodeStatus } from '../NodeStatus/NodeStatus'
import { Quality } from '../Quality/Quality'
import { Notifications } from '../Notifications/Notifications'
import { NATStatus } from '../NATStatus/NATStatus'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 32px 20px 32px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media ${devices.tablet} {
    display: none;
  }
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
      <NATStatus />
      <SettlementStatus />
      <Group>
        <Notifications />
        <Profile />
      </Group>
    </Container>
  )
}
