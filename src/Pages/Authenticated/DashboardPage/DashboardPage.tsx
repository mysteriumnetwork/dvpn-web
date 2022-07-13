/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

import { Layout, LayoutCard, LayoutHeroCardRow, LayoutUnstyledRow } from '../Components/Layout/Layout'
import { Report } from './Report/Report'
import { DashboardHeaderIcon } from '../../../Components/Icons/PageIcons'
import { IdleStat } from '../Components/IdleStat/IdleStat'
import { Services } from '../Components/Service/Services'

const DashboardPage = () => {
  return (
    <Layout title="Dashboard" logo={<DashboardHeaderIcon />} isLoading={false}>
      <LayoutHeroCardRow>
        <Services />
        {/*{[
          {
            name: 'Public',
            description: 'Open to the whole network -dVPN app, independent builders etc.',
            enabled: true,
            approvalPending: false,
            serviceName: 'wireguard',
            onChange: () => {},
          },
          {
            name: 'B2B VPN and data transfer',
            description: 'Streaming and data transfer traffic from B2B clients',
            enabled: true,
            approvalPending: true,
            onChange: () => {},
          },
          {
            name: 'B2B Data Scrapping',
            description: 'Data scrapping traffic from B2B clients',
            enabled: false,
            approvalPending: false,
            onChange: () => {},
          },
        ].map((s) => (
          <ServiceCard
            key={s.name}
            name={s.name}
            description={s.description}
            enabled={s.enabled}
            onChange={s.onChange}
            approvalPending={s.approvalPending}
          />
        ))}*/}
      </LayoutHeroCardRow>
      <LayoutUnstyledRow>
        <Report />
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        <LayoutCard>
          <IdleStat />
        </LayoutCard>
      </LayoutUnstyledRow>
    </Layout>
  )
}

export default DashboardPage
