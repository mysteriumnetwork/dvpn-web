/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Layout } from '../Components/Layout/Layout'
import { SettingsHeaderIcon } from '../../../Components/Icons/Icons'
import { AccountTab } from './Tabs/AccountTab'

export const SettingsPage = () => {
  return (
    <Layout logo={<SettingsHeaderIcon />} title="Settings">
      <AccountTab />
    </Layout>
  )
}
