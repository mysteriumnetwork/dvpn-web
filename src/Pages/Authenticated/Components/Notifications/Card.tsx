/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { ReactComponent as PositiveSvg } from '../../../../assets/images/notifications/positive.svg'
import { ReactComponent as NeutralSvg } from '../../../../assets/images/notifications/neutral.svg'
import { ReactComponent as NegativeSvg } from '../../../../assets/images/notifications/negative.svg'
import { ReactComponent as UpdateSvg } from '../../../../assets/images/notifications/update.svg'
import { CardVariant, NotificationCardProps } from './types'
import { DOCS_UPDATE_NODE } from '../../../../constants/urls'

interface StyleProps {
  $variant: CardVariant
}

const Container = styled.div<StyleProps>`
  min-height: 88px;
  display: flex;
  width: 100%;
  border-radius: 15px;
  padding: 16px;
  background: ${({ theme, $variant }) => theme.notifications.card[$variant].background};
`

const IconContainer = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background: ${({ theme, $variant }) => theme.notifications.card[$variant].background};
`

const Row = styled.div`
  display: flex;
  gap: 14px;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const Subject = styled.div`
  font-weight: 400;
  line-height: 21px;
  color: ${({ theme }) => theme.notifications.card.subjectTextColor};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
`
const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  line-height: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.notifications.card.messageTextColor};
  font-size: ${({ theme }) => theme.common.fontSizeSmaller};
`

const icon = (variant: CardVariant) => {
  switch (variant) {
    case 'negative':
      return <NegativeSvg />
    case 'neutral':
      return <NeutralSvg />
    case 'positive':
      return <PositiveSvg />
    case 'update':
      return <UpdateSvg />
  }
}

export const Card = ({ variant, subject, message }: NotificationCardProps) => {
  return (
    <Container $variant={variant}>
      <Row>
        <Column>
          <IconContainer $variant={variant}>{icon(variant)}</IconContainer>
        </Column>
        <Column>
          <Subject>{subject}</Subject>
          {typeof message === 'string' ? <Message>{message}</Message> : message}
        </Column>
      </Row>
    </Container>
  )
}

const StyledLink = styled.a`
  text-decoration: underline;
  color: ${({ theme }) => theme.common.colorKey};
  font-weight: 700;
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
`

export const UpdateCardMessage = () => {
  return (
    <Message>
      <span>Update app to experience new features</span>
      <StyledLink href={DOCS_UPDATE_NODE} target="_blank" rel="noopener noreferrer">
        Update
      </StyledLink>
    </Message>
  )
}
