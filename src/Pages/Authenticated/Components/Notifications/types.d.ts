/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CardVariant } from './Card'

export interface NotificationCardProps {
  variant: CardVariant
  subject: string
  message: string
}
