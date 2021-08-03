/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { CurrentPricesResponse, Session, SessionDirection, SessionStats, SessionStatus } from 'mysterium-vpn-js'
import { useSnackbar } from 'notistack'
import { docsAddress, isTestnet, mmnApiKey, mmnWebAddress } from '../../../commons/config'

import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/dashboard/logo.svg'
import Header from '../../../Components/Header'
import { RootState } from '../../../redux/store'
import { AppState, currentIdentity } from '../../../redux/app.slice'
import { SSEState } from '../../../redux/sse.slice'
import SessionSidebar from '../SessionSidebar/SessionSidebar'
import { tequilapiClient } from '../../../api/TequilApiClient'
import { parseError } from '../../../commons/error.utils'

import './Dashboard.scss'
import Charts from './Charts/Charts'
import NatStatus from './NatStatus/NatStatus'
import Services from './Services/Services'
import Statistics from './Statistics/Statistics'
import { isRegistered } from '../../../commons/identity.utils'
import BountyWidget from './Bounty/BountyWidget'
import GlobalServicesSettings from './Services/GlobalServicesSettings'
import { DOCS_NAT_FIX } from '../../../constants/urls'
import NodeStatus from './NatStatus/NodeStatus'

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

  const [state, setState] = useState<StateProps>(initialState)

  const { enqueueSnackbar } = useSnackbar()
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
        setState((cs) => ({
          ...cs,
          sessionStatsDaily: statsDaily,
          sessionStatsAllTime: allTimeStats,
          historySessions: sidebarSessions,
          currentPrices: prices,
        }))
      })
      .catch((err) => {
        enqueueSnackbar(parseError(err), { variant: 'error' })
      })
  }, [identity?.id])

  const { appState } = sse
  if (!identity || !appState || !config) {
    return <CircularProgress className="spinner" disableShrink />
  }

  const serviceInfos = appState.serviceInfo
  const { status } = appState.natStatus
  const testnet = isTestnet(config)

  return (
    <div className="main">
      <div className="main-block main-block--split">
        <Header logo={Logo} name="Dashboard" />
        <div className="dashboard__statistics">
          <Statistics testnet={testnet} stats={state.sessionStatsAllTime} unsettledEarnings={identity.earnings} />
        </div>
        <div className="dashboard__widgets">
          <div className="widget widget--bounty">
            <BountyWidget mmnUrl={mmnWebAddress(config)} apiKey={mmnApiKey(config)} />
          </div>
          <div className="widget widget--chart">
            <Charts statsDaily={state.sessionStatsDaily} />
          </div>
        </div>
        <div className="dashboard__services">
          <div className="services-header">
            <p className="services-header__title">Services</p>
            <div className="services-header__status">
              <NatStatus natFixUrl={`${docsAddress(config)}/${DOCS_NAT_FIX}`} status={status} />
            </div>
          </div>
          <div className="node-status">
            <NodeStatus />
          </div>
          <Services
            identityRef={identity.id}
            servicesInfos={serviceInfos}
            userConfig={config}
            disabled={!isRegistered(identity)}
            prices={state.currentPrices}
          />
          <GlobalServicesSettings config={config} servicesInfos={serviceInfos} />
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
