/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react'
import { FeatureToggle } from './FeatureToggle/FeatureToggle'
import { VersionManagement } from './VersionManagement/VersionManagement'
import { ErrorLog } from './ErrorLog/ErrorLog'
import { PageLayout } from '../../components/Layout/PageLayout'
import Title from '../../../components/Typography/Title'

export const AdminPage = () => {
  return (
    <PageLayout>
      <Title value="Admin panel" />
      <div className="flex flex-col gap-6">
        <VersionManagement />
        <FeatureToggle />
        <ErrorLog />
      </div>
    </PageLayout>
  )
}
