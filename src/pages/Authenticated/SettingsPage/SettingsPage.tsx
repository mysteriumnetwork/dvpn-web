/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react'
import GeneralSettingsCard from './GeneralSettingsCard'
import { PageLayout } from '../../components/Layout/PageLayout'
import Title from '../../../components/Typography/Title'
import Label from '../../../components/Typography/Label'
import PasswordChangeCard from './PasswordChangeCard'
import { NodeStatusControlCard } from './NodeStatusControlCard'
import BandwidthControlCard from './BandwidthControlCard'

const SettingsPage = () => {
  return (
    <PageLayout>
      <Title value="Settings" />
      <Label value="General Settings" className="text-pink-525 mb-4" />
      <GeneralSettingsCard />
      <Label value="Change Password" className="text-pink-525 mb-4" />
      <PasswordChangeCard />
      <Label value="Service Status" className="text-pink-525 mb-4" />
      <NodeStatusControlCard />
      <Label value="Bandwidth" className="text-pink-525 mb-4" />
      <BandwidthControlCard />
    </PageLayout>
  )
}

export default SettingsPage
