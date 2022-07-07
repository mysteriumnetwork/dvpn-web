/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LayoutUnstyledRow } from '../../Components/Layout/Layout'
import { SettingsCard } from '../SettingsCard'
import { YourIdentity } from './Account/YourIdentity'
import { MystNodesClaim } from './Account/MystNodesClaim'
import { PasswordChange } from './Account/PasswordChange'

const AccountTab = () => {
  return (
    <>
      <LayoutUnstyledRow>
        <YourIdentity />
        <MystNodesClaim />
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        <PasswordChange />
        <SettingsCard title="Select Avatar" />
      </LayoutUnstyledRow>
    </>
  )
}

export default AccountTab
