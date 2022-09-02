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
import styled from 'styled-components'
import { SettingsHeaderIcon } from '../../../Components/Icons/PageIcons'

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`

export const AdminPage = () => {
  return (
    <Layout title="Admin panel" loading={false} logo={<SettingsHeaderIcon />}>
      <LayoutRow>
        <VersionManagement />
        <Column>
          <FeatureToggle />
          <ErrorLog />
        </Column>
      </LayoutRow>
    </Layout>
  )
}
