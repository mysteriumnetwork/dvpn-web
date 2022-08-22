/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LayoutRow } from '../../Components/Layout/Layout'
import { Notifications } from '../../Components/Notifications/Notifications'

const NotificationsBook = () => {
  return (
    <LayoutRow style={{ justifyContent: 'center' }}>
      <Notifications />
    </LayoutRow>
  )
}

export default NotificationsBook
