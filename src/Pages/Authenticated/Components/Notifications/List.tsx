/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { Card } from './Card'
import { useMemo } from 'react'
import { NotificationCardProps } from './types'
import { NoNotifications } from './NoNotifications'

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 14px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  background: ${({ theme }) => theme.notifications.list.background};
  box-shadow: ${({ theme }) => theme.notifications.list.boxShadow};
  border-radius: 20px;
`

interface Props {
  list: NotificationCardProps[]
}
export const List = ({ list }: Props) => {
  const Notifications = useMemo(() => {
    return list.map((notification, index) => {
      return (
        <Card
          key={`notification-${index}`}
          variant={notification.variant}
          subject={notification.subject}
          message={notification.message}
        />
      )
    })
  }, [list])

  return <Container>{Notifications.length === 0 ? <NoNotifications /> : Notifications}</Container>
}
