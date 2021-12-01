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
import { tequilapiClient } from '../../../api/TequilApiClient'

import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/dashboard/logo.svg'
import { isTestnet } from '../../../commons/config'
import { parseTequilApiError, UNKNOWN_API_ERROR } from '../../../commons/error.utils'
import { isRegistered } from '../../../commons/identity.utils'
import { toastError } from '../../../commons/toast.utils'
import Header from '../../../Components/Header'
import { AppState, currentIdentity } from '../../../redux/app.slice'
import { SSEState } from '../../../redux/sse.slice'
import { RootState } from '../../../redux/store'
import SessionSidebar from '../SessionSidebar/SessionSidebar'
import Charts from './Charts/Charts'

import './Dashboard.scss'
import NodeStatus from './NodeStatus/NodeStatus'
import GlobalServicesSettings from './Services/GlobalServicesSettings'
import Services from './Services/Services'
import Statistics from './Statistics/Statistics'

interface StateProps {
  sessionStatsAllTime: SessionStats
  sessionStatsDaily: {
    [date: string]: SessionStats
  }
  historySessions: Session[]
  currentPrices: CurrentPricesResponse
}

const initialState = {
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

const Dashboard = () => {
  const { config, currentIdentityRef } = useSelector<RootState, AppState>(({ app }) => app)
  const sse = useSelector<RootState, SSEState>(({ sse }) => sse)

  const [state, setState] = useImmer<StateProps>(initialState)

  const identity = currentIdentity(currentIdentityRef, sse.appState?.identities)

  useEffect(() => {
    if (!identity) {
      return
    }

    const sessionFilter = { direction: SessionDirection.PROVIDED, providerId: identity.id }
    Promise.all([
      tequilapiClient.sessionStatsDaily(sessionFilter),
      tequilapiClient.sessionStatsAggregated(sessionFilter),
      tequilapiClient.sessions({
        direction: SessionDirection.PROVIDED,
        providerId: identity.id,
        pageSize: 10,
        status: SessionStatus.COMPLETED,
      }),
      tequilapiClient.pricesCurrent(),
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
        })
      })
      .catch((err) => toastError(parseTequilApiError(err) || UNKNOWN_API_ERROR))
  }, [identity?.id])

  const { appState } = sse
  if (!identity || !appState || !config) {
    return <CircularProgress className="spinner" disableShrink />
  }

  const { serviceInfo } = appState
  const testnet = isTestnet(config)

  return (
    <div className="main">
      <div className="main-block main-block--split">
        <Header logo={Logo} name="Dashboard" />
        <div className="dashboard__statistics">
          <Statistics testnet={testnet} stats={state.sessionStatsAllTime} unsettledEarnings={identity.earnings} />
        </div>
        <div className="dashboard__mainnet-warning">
          You are running Node in TestNet which will be deprecated soon. There are no rewards for running a node in
          TestNet after the 1st of December, 2021 despite what amount might be shown in this UI. Please upgrade your
          node to MainNet to continue earning. Read more about migration{' '}
          <a href="https://docs.mysterium.network/node-runners/mainnet-migration/" rel="noreferrer" target="_blank">
            here
          </a>
          .
        </div>
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
      </div>

      <div className="sidebar-block">
        <SessionSidebar
          liveSessions={sse.appState?.sessions}
          liveSessionStats={sse.appState?.sessionsStats}
          historySessions={state.historySessions}
          headerText="Latest Sessions"
          displayNavigation
        />
      </div>
    </div>
  )
}

export default Dashboard
