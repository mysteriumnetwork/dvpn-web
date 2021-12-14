/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Session, SessionDirection, SessionStats } from 'mysterium-vpn-js'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { api } from '../../../api/Api'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/sessions/logo.svg'
import { countryName } from '../../../commons/country'
import { date2human, seconds2Time } from '../../../commons/date.utils'
import { parseError } from '../../../commons/error.utils'
import formatBytes from '../../../commons/formatBytes'
import { displayMyst } from '../../../commons/money.utils'
import { toastError } from '../../../commons/toast.utils'
import Header from '../../../Components/Header/Header'
import { RootState } from '../../../redux/store'
import SessionSidebar from '../SessionSidebar/SessionSidebar'
import './Sessions.scss'
import Table from '../../../Components/Table/Table'

export interface Props {
  filterDirection?: SessionDirection
  filterProviderId?: string
  liveSessions?: Session[]
  liveSessionStats?: SessionStats
}

interface StateProps {
  isLoading: boolean
  sessionList: SessionRow[]
  sessionListPages: number
}

interface SessionRow {
  country: string
  duration: string
  started: string
  earnings: string
  transferred: string
  session_id: string
}

const row = (s: Session): SessionRow => {
  return {
    country: countryName(s.consumerCountry),
    duration: seconds2Time(s.duration),
    started: date2human(s.createdAt),
    earnings: displayMyst(s.tokens),
    transferred: formatBytes(s.bytesReceived + s.bytesSent),
    session_id: s.id.split('-')[0],
  }
}

const Sessions = ({ filterDirection = SessionDirection.PROVIDED }: Props) => {
  const [state, setState] = useState<StateProps>({
    isLoading: true,
    sessionList: [],
    sessionListPages: 0,
  })

  const fetchIdRef = React.useRef(0)

  const filterProviderId = useSelector<RootState, string | undefined>(({ app }) => app.currentIdentity?.id)
  const liveSessions = useSelector<RootState, Session[] | undefined>(({ sse }) => sse.appState?.sessions)
  const liveSessionStats = useSelector<RootState, SessionStats | undefined>(({ sse }) => sse.appState?.sessionsStats)

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    setState((cs) => ({ ...cs, isLoading: true }))

    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      api
        .sessions({
          direction: filterDirection,
          providerId: filterProviderId,
          pageSize: pageSize,
          page: pageIndex,
        })
        .then((resp) => {
          let { items = [], totalPages = 0 } = { ...resp }
          setState((cs) => ({ ...cs, isLoading: false, sessionList: items.map(row), sessionListPages: totalPages }))
        })
        .catch((err) => {
          toastError(parseError(err, 'Fetching Sessions Failed!'))
        })
    }
  }, [])

  return (
    <div className="main">
      <div className="main-block main-block--split">
        <Header logo={Logo} name="Sessions" />
        <Table
          columns={[
            {
              Header: 'Country',
              accessor: 'country',
              width: 10,
            },
            {
              Header: 'Duration',
              accessor: 'duration',
              width: 10,
            },
            {
              Header: 'Started',
              accessor: 'started',
              width: 20,
            },
            {
              Header: 'Earnings',
              accessor: 'earnings',
              width: 20,
            },
            {
              Header: 'Transferred',
              accessor: 'transferred',
              width: 20,
            },
            {
              Header: 'Session ID',
              accessor: 'session_id',
              width: 20,
            },
          ]}
          data={state.sessionList}
          fetchData={fetchData}
          lastPage={state.sessionListPages}
          loading={state.isLoading}
        />
      </div>
      <div className="sidebar-block">
        <SessionSidebar liveSessions={liveSessions} liveSessionStats={liveSessionStats} headerText="Live Sessions" />
      </div>
    </div>
  )
}

export default Sessions
