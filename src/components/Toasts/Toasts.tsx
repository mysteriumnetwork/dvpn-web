/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import { ReactComponent as SuccessSVG } from '../../assets/images/toasts/success.svg'
import { ReactComponent as WarningSVG } from '../../assets/images/toasts/warning.svg'
import { ReactComponent as ErrorSVG } from '../../assets/images/toasts/error.svg'
import { ReactComponent as InfoSVG } from '../../assets/images/toasts/info.svg'

export type Variant = 'success' | 'warning' | 'info' | 'error'

type ToastProps = {
  readonly icon: ReactNode
  readonly variant: Variant
} & Props

const Toast = ({ icon, message, variant }: ToastProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="pl-2 flex justify-center items-center">
        <div className="[&>svg]:size-6 min-w-6">{icon}</div>
      </div>
      <div className="text-sm text-purple-500 whitespace-pre-wrap">{message}</div>
    </div>
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
