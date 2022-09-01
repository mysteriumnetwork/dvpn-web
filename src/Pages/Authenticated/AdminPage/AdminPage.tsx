/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Layout, LayoutRow } from '../Components/Layout/Layout'
import { FeatureToggle } from './FeatureToggle/FeatureToggle'
import { VersionManagement } from './VersionManagement/VersionManagement'
import { ErrorLog } from './ErrorLog/ErrorLog'

export const AdminPage = () => {
  return (
    <Layout title="Admin panel" loading={false}>
      <LayoutRow>
        <VersionManagement />
        <FeatureToggle />
      </LayoutRow>
      <LayoutRow>
        <ErrorLog />
      </LayoutRow>
    </Layout>
  )
}
