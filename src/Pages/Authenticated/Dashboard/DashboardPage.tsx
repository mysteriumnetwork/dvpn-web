/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CircularProgress } from '@material-ui/core'
import { CurrentPricesResponse, Session, SessionDirection, SessionStats, SessionStatus } from 'mysterium-vpn-js'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useImmer } from 'use-immer'
import { api } from '../../../api/Api'

import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/dashboard/logo.svg'
import { parseTequilApiError, UNKNOWN_API_ERROR } from '../../../commons/error.utils'
import { isEmpty, isRegistered } from '../../../commons/identity.utils'
import { toastError } from '../../../commons/toast.utils'
import { AppState } from '../../../redux/app.slice'
import { SSEState } from '../../../redux/sse.slice'
import { RootState } from '../../../redux/store'
import SessionSidebar from '../SessionSidebar/SessionSidebar'
import Charts from './Charts/Charts'

import './DashboardPage.scss'
import NodeStatus from './NodeStatus/NodeStatus'
import GlobalServicesSettings from './Services/GlobalServicesSettings'
import Services from './Services/Services'
import { selectors } from '../../../redux/selectors'
import { Cards } from '../Components/Card/PreparedCards'
import { CardLayout } from '../Components/Card/CardLayout'
import { Layout } from '../Layout'

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
  },
}

const DashboardPage = () => {
  const identity = useSelector(selectors.currentIdentitySelector)
  const { config } = useSelector<RootState, AppState>(({ app }) => app)
  const sse = useSelector<RootState, SSEState>(({ sse }) => sse)

  const [state, setState] = useImmer<StateProps>(initialState)

  useEffect(() => {
    const sessionFilter = { direction: SessionDirection.PROVIDED, providerId: identity.id }
    Promise.all([
      api.sessionStatsDaily(sessionFilter),
      api.sessionStatsAggregated(sessionFilter),
      api.sessions({
        direction: SessionDirection.PROVIDED,
        providerId: identity.id,
        pageSize: 10,
        status: SessionStatus.COMPLETED,
      }),
      api.pricesCurrent(),
      api.identityBalanceRefresh(identity.id),
    ])
      .then((result) => {
        const [{ items: statsDaily }, { stats: allTimeStats }, { items: sidebarSessions }, prices] = result
        setState((d) => {
          d.sessionStatsDaily = statsDaily
          d.sessionStatsAllTime = allTimeStats
          d.historySessions = sidebarSessions
          d.currentPrices = prices
          d.sessionStatsDaily = statsDaily
          d.sessionStatsDaily = statsDaily
          d.loading = false
        })
      })
      .catch((err) => toastError(parseTequilApiError(err) || UNKNOWN_API_ERROR))
  }, [identity.id])

  const { appState } = sse
  if (isEmpty(identity) || !appState || !config || state.loading) {
    return <CircularProgress className="spinner" disableShrink />
  }

  const { serviceInfo } = appState

  return (
    <Layout
      title="Dashboard"
      logo={<Logo />}
      main={
        <>
          <CardLayout>
            <Cards.TotalEarnings />
            <Cards.SessionTime stats={state.sessionStatsAllTime} />
            <Cards.Transferred stats={state.sessionStatsAllTime} />
            <Cards.Sessions stats={state.sessionStatsAllTime} />
            <Cards.UniqueClients stats={state.sessionStatsAllTime} />
            <Cards.UnsettledEarnings />
            <Cards.Balance />
          </CardLayout>
          <div className="dashboard__widgets">
            <div className="widget widget--chart">
              <Charts statsDaily={state.sessionStatsDaily} />
            </div>
          </div>
          <div className="dashboard__node-status">
            <NodeStatus />
          </div>
          <div className="dashboard__services">
            <Services
              identityRef={identity.id}
              servicesInfos={serviceInfo}
              userConfig={config}
              disabled={!isRegistered(identity)}
              prices={state.currentPrices}
            />
          </div>

          <div className="dashboard__services-settings">
            <GlobalServicesSettings config={config} servicesInfos={serviceInfo} />
          </div>
        </>
      }
      sidebar={
        <SessionSidebar
          liveSessions={sse.appState?.sessions}
          liveSessionStats={sse.appState?.sessionsStats}
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
