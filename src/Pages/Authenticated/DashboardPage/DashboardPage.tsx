/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

import { Layout, LayoutCard, LayoutHeroCardRow, LayoutUnstyledRow, TableCard } from '../Components/Layout/Layout'
import { Report } from './Report/Report'
import { DashboardHeaderIcon } from '../../../Components/Icons/PageIcons'
import { IdleStat } from '../Components/IdleStat/IdleStat'
import { Services } from '../Components/Service/Services'
import { Media } from '../../../commons/media'
import { LiveSessions } from './LiveSessions/LiveSessions'
const DashboardPage = () => {
  return (
    <Layout title="Dashboard" logo={<DashboardHeaderIcon />} isLoading={false}>
      <Media.Desktop>
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
          <TableCard>
            <LiveSessions />
          </TableCard>
        </LayoutUnstyledRow>
      </Media.Desktop>
      <Media.Mobile>
        <LayoutUnstyledRow>
          <Services />
        </LayoutUnstyledRow>
        <LayoutUnstyledRow>
          <Report />
        </LayoutUnstyledRow>
        <LayoutUnstyledRow>
          <LayoutCard>
            <IdleStat />
          </LayoutCard>
        </LayoutUnstyledRow>
      </Media.Mobile>
    </Layout>
  )
}

export default DashboardPage
