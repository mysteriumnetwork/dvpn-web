/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { Card } from './Card'

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

export const List = () => {
  return (
    <Container>
      <Card
        variant="negative"
        subject="Warning Notification heading"
        message="Small description for warning notification"
      />
      <Card
        variant="neutral"
        subject="Warning Notification heading"
        message="Small description for warning notification"
      />
      <Card
        variant="positive"
        subject="Warning Notification heading"
        message="Small description for warning notification"
      />
    </Container>
  )
}
