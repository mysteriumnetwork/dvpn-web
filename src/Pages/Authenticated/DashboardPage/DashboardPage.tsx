/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Layout, LayoutRow } from '../Components/Layout/Layout'
import { Report } from './Report/Report'
import { DashboardHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Services } from '../Components/Service/Services'

import { LiveSessions } from './LiveSessions/LiveSessions'
import { useMediaQuery } from 'react-responsive'
import { media } from '../../../commons/media'
import { Activity } from '../Components/Activity/Activity'
import { ConfirmationDialog } from '../../../Components/ConfirmationDialog/ConfirmationDialog'

const { isDesktopQuery } = media

const DashboardPage = () => {
  const isDesktop = useMediaQuery(isDesktopQuery)

  return (
    <Layout title="Dashboard" logo={<DashboardHeaderIcon />} loading={false}>
      <LayoutRow $variant={isDesktop ? 'hero' : 'plain'}>
        <Services />
      </LayoutRow>
      <LayoutRow>
        <Report />
      </LayoutRow>
      <LayoutRow>
        <Activity />
      </LayoutRow>
      <LayoutRow>
        <LiveSessions />
      </LayoutRow>
      <ConfirmationDialog title="Your password" message="" show={false} />
    </Layout>
  )
}

export default DashboardPage
