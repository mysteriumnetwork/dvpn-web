/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import { Session, SessionDirection, SessionStats, SessionStatus } from 'mysterium-vpn-js'
import { useSnackbar } from 'notistack'
import { isTestnet, mmnWebAddress } from '../../../commons/config'

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

interface Props {
  app: AppState
  sse: SSEState
}

const mapStateToProps = (state: RootState) => ({
  app: state.app,
  sse: state.sse,
})

interface StateProps {
  sessionStatsAllTime: SessionStats
  sessionStatsDaily: {
    [date: string]: SessionStats
  }
  historySessions: Session[]
}

const Dashboard = ({ app, sse }: Props) => {
  const [state, setState] = useState<StateProps>({
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
  })

  const { enqueueSnackbar } = useSnackbar()
  const { config } = app
  const identity = currentIdentity(app.currentIdentityRef, sse.appState?.identities)

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
    ])
      .then((result) => {
        const [{ items: statsDaily }, { stats: allTimeStats }, { items: sidebarSessions }] = result
        setState({
          ...state,
          sessionStatsDaily: statsDaily,
          sessionStatsAllTime: allTimeStats,
          historySessions: sidebarSessions,
        })
      })
      .catch((err) => {
        enqueueSnackbar(parseError(err), { variant: 'error' })
      })
  }, [identity?.id])

  const { appState } = sse
  if (!identity || !appState || !config) {
    return <CircularProgress className="spinner" />
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
            <BountyWidget mmnUrl={mmnWebAddress(config)} />
          </div>
          <div className="widget widget--chart">
            <Charts statsDaily={state.sessionStatsDaily} />
          </div>
        </div>
        <div className="dashboard__services">
          <div className="services-header">
            <p className="services-header__title">Services</p>
            <div className="services-header__status">
              <NatStatus status={status} />
            </div>
          </div>
          <Services
            identityRef={identity.id}
            servicesInfos={serviceInfos}
            userConfig={config}
            disabled={!isRegistered(identity)}
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

export default connect(mapStateToProps)(Dashboard)
