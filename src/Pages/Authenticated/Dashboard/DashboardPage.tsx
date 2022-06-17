/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SessionDirection, SessionStatus } from 'mysterium-vpn-js'
import React from 'react'
import { tequila } from '../../../api/tequila'

import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/dashboard/logo.svg'
import { stats } from '../../../commons/stats'
import { selectors } from '../../../redux/selectors'
import { CardLayout } from '../Components/Card/CardLayout'
import { Cards } from '../Components/Card/PreparedCards'
import { Layout } from '../Layout'
import SessionSidebar from '../SessionSidebar/SessionSidebar'
import Charts from './Charts/Charts'

import styles from './DashboardPage.module.scss'
import NodeStatus from './NodeStatus/NodeStatus'
import GlobalServicesSettings from './Services/GlobalServicesSettings'
import Service from './Services/Service'
import { useAppSelector, useFetch } from '../../../commons/hooks'
import { SESSION_STATS_EMPTY } from '../../../constants/instances'

const { api } = tequila

const DashboardPage = () => {
  const identity = useAppSelector(selectors.currentIdentitySelector)
  const liveSessionStats = useAppSelector(selectors.liveSessionStatsSelector)
  const liveSessions = useAppSelector(selectors.liveSessionsSelector)

  const sessionFilter = { direction: SessionDirection.PROVIDED, providerId: identity.id }
  const [data = [], loading] = useFetch(
    () =>
      Promise.all([
        api.sessionStatsDaily(sessionFilter),
        api.sessionStatsAggregated(sessionFilter),
        api.sessions({
          direction: SessionDirection.PROVIDED,
          providerId: identity.id,
          pageSize: 10,
          status: SessionStatus.COMPLETED,
        }),
        api.identityBalanceRefresh(identity.id),
      ]),
    [identity.id],
  )

  const [
    { items: statsDaily } = { items: {} },
    { stats: allTimeStats } = { stats: SESSION_STATS_EMPTY },
    { items: historySessions } = { items: [] },
  ] = data
  const allTimeAggregatedStats = stats.addStats(allTimeStats, liveSessionStats)

  return (
    <Layout
      title="Dashboard"
      logo={<Logo />}
      isLoading={loading}
      main={
        <>
          <div className={styles.statistics}>
            <CardLayout>
              <Cards.TotalEarnings />
              <Cards.SessionTime stats={allTimeAggregatedStats} />
              <Cards.Transferred stats={allTimeAggregatedStats} />
              <Cards.Sessions stats={allTimeAggregatedStats} />
              <Cards.UniqueClients stats={allTimeAggregatedStats} />
              <Cards.EarningsCard />
            </CardLayout>
          </div>
          <div className={styles.widgets}>
            <div className={styles.widget}>
              <Charts statsDaily={statsDaily} />
            </div>
          </div>
          <div className={styles.nodeStatus}>
            <NodeStatus />
          </div>
          <div className={styles.services}>
            <Service />
          </div>

          <div className={styles.servicesSettings}>
            <GlobalServicesSettings />
          </div>
        </>
      }
      sidebar={
        <SessionSidebar
          liveSessions={liveSessions}
          liveSessionStats={liveSessionStats}
          historySessions={historySessions}
          headerText="Latest Sessions"
          displayNavigation
        />
      }
      showSideBar
    />
  )
}

export default DashboardPage
