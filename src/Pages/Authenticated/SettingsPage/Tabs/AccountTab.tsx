/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LayoutRow } from '../../Components/Layout/Layout'
import { YourIdentity } from './Account/YourIdentity'
import { MystNodesClaim } from './Account/MystNodesClaim'
import { PasswordChange } from './Account/PasswordChange'
import { AvatarChoice } from './Account/AvatarChoice'
import { IdentityExport } from './Account/IdentityExport'

const AccountTab = () => {
  const isLocalhost = window.location.hostname === 'localhost'
  return (
    <>
      <LayoutRow>
        <YourIdentity />
        <MystNodesClaim />
      </LayoutRow>
      <LayoutRow>
        <PasswordChange />
        <AvatarChoice />
      </LayoutRow>
      {isLocalhost && (
        <LayoutRow>
          <IdentityExport />
        </LayoutRow>
      )}
    </>
  )
}

export default AccountTab
