/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CardVariant } from './Card'
import { ReactNode } from 'react'

export type CardVariant = 'positive' | 'neutral' | 'negative' | 'update'

export type NotificationProps = {
  id: string
} & NotificationCardProps

export type NotificationCardProps = {
  variant: CardVariant
  subject: string
  message: ReactNode
}
