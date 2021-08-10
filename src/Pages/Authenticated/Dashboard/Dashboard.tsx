/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CircularProgress } from '@material-ui/core'
import {
  CurrentPricesResponse,
  NatStatusV2,
  Session,
  SessionDirection,
  SessionStats,
  SessionStatus,
} from 'mysterium-vpn-js'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { tequilapiClient } from '../../../api/TequilApiClient'

import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/dashboard/logo.svg'
import { isTestnet, mmnApiKey, mmnWebAddress } from '../../../commons/config'
import { parseError } from '../../../commons/error.utils'
import { isRegistered } from '../../../commons/identity.utils'
import Header from '../../../Components/Header'
import { AppState, currentIdentity } from '../../../redux/app.slice'
import { SSEState } from '../../../redux/sse.slice'
import { RootState } from '../../../redux/store'
import SessionSidebar from '../SessionSidebar/SessionSidebar'
import BountyWidget from './Bounty/BountyWidget'
import Charts from './Charts/Charts'

import './Dashboard.scss'
import NodeStatus from './NodeStatus/NodeStatus'
import GlobalServicesSettings from './Services/GlobalServicesSettings'
import Services from './Services/Services'
import Statistics from './Statistics/Statistics'
import { DOCS_NAT_FIX } from '../../../constants/urls'

interface StateProps {
  sessionStatsAllTime: SessionStats
  sessionStatsDaily: {
    [date: string]: SessionStats
  }
  historySessions: Session[]
  currentPrices: CurrentPricesResponse
  natType: {
    loading: boolean
    type: string
    error?: string
  }
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
  natType: {
    loading: true,
    type: '',
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

  const updateNATType = () => {
    tequilapiClient
      .natType()
      .then((resp) => setState((cs) => ({ ...cs, natType: { loading: false, type: resp.type, error: resp.error } })))
  }
  useEffect(() => {
    updateNATType()
    const natPollInterval = setInterval(() => updateNATType(), 60_000 * 5)
    return () => clearInterval(natPollInterval)
  }, [])

  const { appState } = sse
  if (!identity || !appState || !config) {
    return <CircularProgress className="spinner" disableShrink />
  }

  const { serviceInfo, nat } = appState
  const testnet = isTestnet(config)

  const isServiceOn = (): boolean => serviceInfo && serviceInfo.length > 0

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
        <div className="dashboard__node-status">
          <NodeStatus
            nodeStatus={isServiceOn() ? nat.status : { status: NatStatusV2.OFFLINE }}
            natType={state.natType.type}
            natTypeLoading={state.natType.loading}
            natTypeError={state.natType.error}
            nodeStatusFixUrl={DOCS_NAT_FIX}
          />
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
