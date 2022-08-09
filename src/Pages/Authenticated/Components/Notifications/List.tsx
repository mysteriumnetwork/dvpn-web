/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { Card } from './Card'
import { useMemo } from 'react'
import { NotificationProps } from './types'

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

const NoNotifications = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  color: ${({ theme }) => theme.common.colorGrayBlue};
`

interface Props {
  list: NotificationProps[]
}
export const List = ({ list }: Props) => {
  const Notifications = useMemo(() => {
    return list.map((notification) => {
      return <Card variant={notification.variant} subject={notification.subject} message={notification.message} />
    })
  }, [list])

  return (
    <Container>
      {Notifications.length === 0 ? <NoNotifications>No notification yet.</NoNotifications> : Notifications}
    </Container>
  )
}
