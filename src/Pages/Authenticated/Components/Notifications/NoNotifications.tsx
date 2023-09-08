/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { ReactComponent as EmptySVG } from '../../../../assets/images/notifications/empty.svg'

const Icon = styled(EmptySVG)`
  width: 82px;
`

const Container = styled.div`
  display: flex;
  padding: 20px 20px 20px 20px;
  gap: 12px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Title = styled.div`
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.common.colorDarkBlue};
  font-weight: 400;
  font-style: normal;
  line-height: 21px;
`
const Description = styled.div`
  font-size: ${({ theme }) => theme.common.fontSizeSmaller};
  color: ${({ theme }) => theme.common.colorGrayBlue};
  font-weight: 400;
  font-style: normal;
  line-height: 14px;
`

export const NoNotifications = () => (
  <Container>
    <Icon />
    <Column>
      <Title>No notification yet. </Title>
      <Description>When you get notifications, they'll show up here</Description>
    </Column>
  </Container>
)
