/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Layout, LayoutHeroRow, LayoutRow } from '../Components/Layout/Layout'
import { Report } from './Report/Report'
import { DashboardHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Services } from '../Components/Service/Services'

import { LiveSessions } from './LiveSessions/LiveSessions'

const DashboardPage = () => {
  return (
    <Layout title="Dashboard" logo={<DashboardHeaderIcon />} loading={false}>
      <LayoutHeroRow>
        <Services />
      </LayoutHeroRow>
      <LayoutRow>
        <Report />
      </LayoutRow>
      <LayoutRow>
        <LiveSessions />
      </LayoutRow>
    </Layout>
  )
}

export default DashboardPage
