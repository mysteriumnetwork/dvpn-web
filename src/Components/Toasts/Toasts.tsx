/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactComponent as SuccessSVG } from '../../assets/images/toasts/success.svg'
import { ReactComponent as WarningSVG } from '../../assets/images/toasts/warning.svg'
import { ReactComponent as ErrorSVG } from '../../assets/images/toasts/error.svg'
import { ReactComponent as InfoSVG } from '../../assets/images/toasts/info.svg'
import { ReactNode } from 'react'
import styled from 'styled-components'

export type Variant = 'success' | 'warning' | 'info' | 'error'

const Card = styled.div`
  background-color: ${({ theme }) => theme.toasts.background};
  display: flex;
  height: 100%;
  width: 300px;
`

interface IconContainerProps {
  $variant: Variant
}

const IconContainer = styled.div<IconContainerProps>`
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, $variant }) => theme.toasts[$variant].iconBackground};
`

const Message = styled.div`
  width: 100%;
  margin: 8px;
`

const Content = styled.div`
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.toasts.contentTextColor};
  font-weight: 400;
  line-height: 14px;
`

type ToastProps = {
  icon: ReactNode
  variant: Variant
} & Props

const Toast = ({ icon, message, variant }: ToastProps) => {
  return (
    <Card>
      <IconContainer $variant={variant}>{icon}</IconContainer>
      <Message>
        <Content>{message}</Content>
      </Message>
    </Card>
  )
}

type Props = {
  message: string
}
export const SuccessToast = ({ message }: Props) => {
  return <Toast variant="success" icon={<SuccessSVG />} message={message} />
}

export const WarningToast = ({ message }: Props) => {
  return <Toast variant="warning" icon={<WarningSVG />} message={message} />
}

export const ErrorToast = ({ message }: Props) => {
  return <Toast variant="error" icon={<ErrorSVG />} message={message} />
}

export const InfoToast = ({ message }: Props) => {
  return <Toast variant="info" icon={<InfoSVG />} message={message} />
}
