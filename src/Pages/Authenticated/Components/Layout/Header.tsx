/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../../mobx/store'
import { devices } from '../../../../theme/themes'
import { SettlementStatus } from '../SettlementStatus/SettlementStatus'
import { Profile } from '../Profile/Profile'
import PageTitle from '../../../../Components/LayoutHeader/PageTitle'
import { NodeStatus } from '../NodeStatus/NodeStatus'
import { Quality } from '../Quality/Quality'
import { Notifications } from '../Notifications/Notifications'
import { NATStatus } from '../NATStatus/NATStatus'
import { themeCommon } from '../../../../theme/themeCommon'
import { useMediaQuery } from 'react-responsive'
import { media } from '../../../../commons/media'
import { MobileHeader } from '../../Navigation/Mobile/MobileHeader'
import { LayoutRow } from './Layout'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 32px 20px 32px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  > div:not(:nth-last-of-type(2)) {
    border-right: ${`1px solid ${themeCommon.colorGrayBlue}`};
  }

  > div:first-child,
  div:last-child {
    border-right: none;
  }

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

const MobileHeaderMargin = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 86px;
  width: 100%;
`

interface Props {
  logo?: ReactNode
  title?: string
}

export const Header = observer(({ logo, title }: Props) => {
  const isMobile = useMediaQuery(media.isMobileQuery)
  const { headerStore } = useStores()
  const intervalId = headerStore.updateStateInterval()

  useEffect(() => {
    return () => {
      clearTimeout(intervalId)
    }
  }, [intervalId])

  if (isMobile) {
    return (
      <LayoutRow>
        <MobileHeaderMargin>
          <MobileHeader />
        </MobileHeaderMargin>
      </LayoutRow>
    )
  }
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
})
