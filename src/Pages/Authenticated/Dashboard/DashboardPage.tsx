/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/dashboard/logo.svg'
import { Layout } from '../Components/Layout/Layout'
import { ServiceCard } from '../Components/ServiceCard/ServiceCard'
import styles from './DashboardPage.module.scss'
import { Report } from './Report/Report'

const DashboardPage = () => {
  return (
    <Layout
      title="Dashboard"
      logo={<Logo />}
      isLoading={false}
      main={
        <>
          <div className={styles.services}>
            {[
              {
                name: 'Public',
                description: 'Open to the whole network -dVPN app, independent builders etc.',
                enabled: true,
                onChange: () => {},
              },
              {
                name: 'B2B VPN and data transfer',
                description: 'Streaming and data transfer traffic from B2B clients',
                enabled: true,
                onChange: () => {},
              },
              {
                name: 'B2B Data Scrapping',
                description: 'Data scrapping traffic from B2B clients',
                enabled: false,
                onChange: () => {},
              },
            ].map((s) => (
              <ServiceCard name={s.name} description={s.description} enabled={s.enabled} onChange={s.onChange} />
            ))}
          </div>
          <div className={styles.report}>
            <Report />
          </div>
        </>
      }
    />
  )
}

export default DashboardPage
