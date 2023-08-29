/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LayoutGrid } from '../../Components/Layout/Layout'
import { YourIdentity } from './Account/YourIdentity'
import { MystNodesClaim } from './Account/MystNodesClaim'
import { PasswordChange } from './Account/PasswordChange'
import { AvatarChoice } from './Account/AvatarChoice'
import { IdentityExport } from './Account/IdentityExport'

const LOCALHOSTS = ['localhost', '127.0.0.1']

const AccountTab = () => {
  const isLocalhost = LOCALHOSTS.includes(window.location.hostname)
  return (
    <LayoutGrid>
      <YourIdentity />
      <MystNodesClaim />
      <PasswordChange />
      {isLocalhost && <IdentityExport />}
      <AvatarChoice />
    </LayoutGrid>
  )
}

export default AccountTab
