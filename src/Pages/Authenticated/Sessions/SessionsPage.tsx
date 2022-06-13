/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Session, SessionDirection } from 'mysterium-vpn-js'
import React, { useMemo, useState } from 'react'

import { tequila } from '../../../api/wrapped-calls'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/sessions/logo.svg'
import countries from '../../../commons/countries'
import dates from '../../../commons/dates'
import bytes from '../../../commons/bytes'
import SessionSidebar from '../SessionSidebar/SessionSidebar'
import './SessionsPage.scss'
import { Layout } from '../Layout'
import Table, { PagingProps } from '../../../Components/Table/Table'
import { MobileRow } from '../../../Components/Table/MobileRow'
import { Row } from 'react-table'
import { myst } from '../../../commons/mysts'
import { selectors } from '../../../redux/selectors'
import { useAppSelector, useFetch } from '../../../commons/hooks'
import { SESSIONS_LIST_RESPONSE_EMPTY } from '../../../constants/instances'

const { format } = bytes
const { seconds2Time, date2human } = dates
const { countryName } = countries
const { api } = tequila

interface State {
  page: number
  pageSize: number
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
    earnings: myst.display(s.tokens),
    transferred: format(s.bytesReceived + s.bytesSent),
    sessionId: s.id.split('-')[0],
  }
}

const SessionsPage = () => {
  const [state, setState] = useState<State>({
    page: 1,
    pageSize: 10,
  })

  const { id } = useAppSelector(selectors.currentIdentitySelector)
  const liveSessions = useAppSelector(selectors.liveSessionsSelector)
  const liveSessionStats = useAppSelector(selectors.liveSessionStatsSelector)

  const [data = SESSIONS_LIST_RESPONSE_EMPTY, loading] = useFetch(
    () =>
      api.sessions({
        direction: SessionDirection.PROVIDED,
        providerId: id,
        pageSize: state.pageSize,
        page: state.page,
      }),
    [id, state.pageSize, state.page],
  )

  const handlePageChange = ({ pageSize, page }: PagingProps) => {
    setState((cs) => ({ ...cs, page, pageSize }))
  }

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
      isLoading={loading}
      main={
        <Table
          columns={columns}
          data={data.items.map(row)}
          onPaginationChange={handlePageChange}
          pagination={{ pageSize: state.pageSize }}
          lastPage={data.totalPages}
          loading={loading}
          responsivePaging
          mobileRow={({ original }: Row<SessionRow>, index) => {
            const { country, duration, transferred, earnings, sessionId } = original
            return (
              <MobileRow
                key={index}
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

export default SessionsPage
