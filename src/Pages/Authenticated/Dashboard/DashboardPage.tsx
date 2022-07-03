/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

import { Layout, LayoutAccentedRow, LayoutRow } from '../Components/Layout/Layout'
import { ServiceCard } from '../Components/ServiceCard/ServiceCard'
import { Report } from './Report/Report'
import { DashboardIcon } from '../../../Components/Icons/Icons'

const DashboardPage = () => {
  return (
    <Layout title="Dashboard" logo={<DashboardIcon />} isLoading={false}>
      <LayoutAccentedRow>
        {[
          {
            name: 'Public',
            description: 'Open to the whole network -dVPN app, independent builders etc.',
            enabled: true,
            approvalPending: false,
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
            name={s.name}
            description={s.description}
            enabled={s.enabled}
            onChange={s.onChange}
            approvalPending={s.approvalPending}
          />
        ))}
      </LayoutAccentedRow>
      <LayoutRow>
        <Report />
      </LayoutRow>
    </Layout>
  )
}

export default DashboardPage
