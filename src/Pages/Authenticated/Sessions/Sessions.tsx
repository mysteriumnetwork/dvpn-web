/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Session, SessionDirection, SessionStats } from 'mysterium-vpn-js'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { api } from '../../../api/Api'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/sessions/logo.svg'
import { countryName } from '../../../commons/country'
import { date2human, seconds2Time } from '../../../commons/date.utils'
import { parseError } from '../../../commons/error.utils'
import formatBytes from '../../../commons/formatBytes'
import { toastError } from '../../../commons/toast.utils'
import { RootState } from '../../../redux/store'
import SessionSidebar from '../SessionSidebar/SessionSidebar'
import './Sessions.scss'
import { Layout } from '../Layout'
import Table from '../../../Components/Table/Table'
import { MobileRow } from '../../../Components/Table/MobileRow'
import { Row } from 'react-table'
import { myst } from '../../../commons/myst.utils'

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
  sessionId: string
}

const row = (s: Session): SessionRow => {
  return {
    country: countryName(s.consumerCountry),
    duration: seconds2Time(s.duration),
    started: date2human(s.createdAt),
    earnings: myst.displayMYST(s.tokens),
    transferred: formatBytes(s.bytesReceived + s.bytesSent),
    sessionId: s.id.split('-')[0],
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

  const columns = useMemo(
    () => [
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
        accessor: 'sessionId',
        width: 20,
      },
    ],
    [],
  )

  return (
    <Layout
      title="Sessions"
      logo={<Logo />}
      main={
        <Table
          columns={columns}
          data={state.sessionList}
          fetchData={fetchData}
          lastPage={state.sessionListPages}
          loading={state.isLoading}
          mobileRow={({ original }: Row<SessionRow>, index) => {
            const { country, duration, transferred, earnings, sessionId } = original
            return (
              <MobileRow
                topLeft={country}
                topLeftSub={sessionId}
                bottomLeft={duration}
                bottomMiddle={transferred}
                bottomRight={earnings}
              />
            )
          }}
        />
      }
      sidebar={
        <SessionSidebar liveSessions={liveSessions} liveSessionStats={liveSessionStats} headerText="Live Sessions" />
      }
      showSideBar
    />
  )
}

export default Sessions
