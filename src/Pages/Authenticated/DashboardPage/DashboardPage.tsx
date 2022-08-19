/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Layout, LayoutCard, LayoutHeroCardRow, LayoutUnstyledRow } from '../Components/Layout/Layout'
import { Report } from './Report/Report'
import { DashboardHeaderIcon } from '../../../Components/Icons/PageIcons'
import { IdleStat } from '../Components/IdleStat/IdleStat'
import { Services } from '../Components/Service/Services'

import { LiveSessions } from './LiveSessions/LiveSessions'
const DashboardPage = () => {
  return (
    <Layout title="Dashboard" logo={<DashboardHeaderIcon />} isLoading={false}>
      <LayoutHeroCardRow>
        <Services />
      </LayoutHeroCardRow>
      <LayoutUnstyledRow>
        <Report />
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        <LayoutCard>
          <IdleStat />
        </LayoutCard>
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        <LiveSessions />
      </LayoutUnstyledRow>
    </Layout>
  )
}

export default DashboardPage
