/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CardVariant } from '../Pages/Authenticated/Components/Notifications/Card'
export const KEY_CURRENT_NODE_VERSION_LAST_CHECK = `CURRENT_NODE_VERSION_LAST_CHECK`
export interface Notification {
  variant: CardVariant
  subject: string
  message: string
}
