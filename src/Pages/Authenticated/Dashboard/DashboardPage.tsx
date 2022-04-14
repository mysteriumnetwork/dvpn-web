/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CurrentPricesResponse, Session, SessionDirection, SessionStats, SessionStatus } from 'mysterium-vpn-js'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useImmer } from 'use-immer'
import { tequilaClient } from '../../../api/tequila-client'

import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/dashboard/logo.svg'
import { tequilUtils } from '../../../commons/tequil.utils'
import { parseToastError } from '../../../commons/toast.utils'
import { TOKENS_EMPTY } from '../../../constants/instances'
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

interface StateProps {
  loading: boolean
  sessionStatsAllTime: SessionStats
  sessionStatsDaily: {
    [date: string]: SessionStats
  }
  historySessions: Session[]
  currentPrices: CurrentPricesResponse
}

const initialState: StateProps = {
  loading: true,
  sessionStatsAllTime: {
    count: 0,
    countConsumers: 0,
    sumBytesReceived: 0,
    sumBytesSent: 0,
    sumDuration: 0,
    sumTokens: 0,
  },
  sessionStatsDaily: {},
  historySessions: [],
  currentPrices: {
    pricePerHour: BigInt(0),
    pricePerGib: BigInt(0),
    pricePerHourTokens: TOKENS_EMPTY,
    pricePerGibTokens: TOKENS_EMPTY,
  },
}

const DashboardPage = () => {
  const identity = useSelector(selectors.currentIdentitySelector)
  const liveSessionStats = useSelector(selectors.liveSessionStatsSelector)
  const liveSessions = useSelector(selectors.liveSessionsSelector)

  const [state, setState] = useImmer<StateProps>(initialState)

  useEffect(() => {
    init()
  }, [identity.id])

  const init = async () => {
    const sessionFilter = { direction: SessionDirection.PROVIDED, providerId: identity.id }
    try {
      const [{ items: statsDaily }, { stats: allTimeStats }, { items: sidebarSessions }, prices] = await Promise.all([
        tequilaClient.sessionStatsDaily(sessionFilter),
        tequilaClient.sessionStatsAggregated(sessionFilter),
        tequilaClient.sessions({
          direction: SessionDirection.PROVIDED,
          providerId: identity.id,
          pageSize: 10,
          status: SessionStatus.COMPLETED,
        }),
        tequilaClient.pricesCurrent(),
        tequilaClient.identityBalanceRefresh(identity.id),
      ])

      setState((d) => {
        d.sessionStatsDaily = statsDaily
        d.sessionStatsAllTime = tequilUtils.addStats(allTimeStats, liveSessionStats)
        d.historySessions = sidebarSessions
        d.currentPrices = prices
        d.loading = false
      })
    } catch (err) {
      parseToastError(err)
    }
  }

  return (
    <Layout
      title="Dashboard"
      logo={<Logo />}
      isLoading={state.loading}
      main={
        <>
          <div className={styles.statistics}>
            <CardLayout>
              <Cards.TotalEarnings />
              <Cards.SessionTime stats={state.sessionStatsAllTime} />
              <Cards.Transferred stats={state.sessionStatsAllTime} />
              <Cards.Sessions stats={state.sessionStatsAllTime} />
              <Cards.UniqueClients stats={state.sessionStatsAllTime} />
              <Cards.EarningsCard />
            </CardLayout>
          </div>
          <div className={styles.widgets}>
            <div className={styles.widget}>
              <Charts statsDaily={state.sessionStatsDaily} />
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
          historySessions={state.historySessions}
          headerText="Latest Sessions"
          displayNavigation
        />
      }
      showSideBar
    />
  )
}

export default DashboardPage
