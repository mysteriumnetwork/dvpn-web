/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Session, SessionDirection } from 'mysterium-vpn-js'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { tequila } from '../../../api/wrapped-calls'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/sessions/logo.svg'
import { countryName } from '../../../commons/country'
import { date2human, seconds2Time } from '../../../commons/date.utils'
import formatBytes from '../../../commons/formatBytes'
import { parseToastError } from '../../../commons/toast.utils'
import SessionSidebar from '../SessionSidebar/SessionSidebar'
import './SessionsPage.scss'
import { Layout } from '../Layout'
import Table, { PagingProps } from '../../../Components/Table/Table'
import { MobileRow } from '../../../Components/Table/MobileRow'
import { Row } from 'react-table'
import { myst } from '../../../commons/myst.utils'
import { selectors } from '../../../redux/selectors'

const { api } = tequila

interface State {
  isLoading: boolean
  sessionList: SessionRow[]
  sessionListPages: number

  page: number
  pageSize: number
  lastPage: number
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
    transferred: formatBytes(s.bytesReceived + s.bytesSent),
    sessionId: s.id.split('-')[0],
  }
}

const SessionsPage = () => {
  const [state, setState] = useState<State>({
    isLoading: true,
    sessionList: [],
    sessionListPages: 0,
    page: 1,
    pageSize: 10,
    lastPage: 1,
  })

  const { id } = useSelector(selectors.currentIdentitySelector)
  const liveSessions = useSelector(selectors.liveSessionsSelector)
  const liveSessionStats = useSelector(selectors.liveSessionStatsSelector)

  useEffect(() => {
    fetchData()
  }, [state.page])

  const fetchData = async () => {
    setState((cs) => ({ ...cs, isLoading: false }))
    try {
      const response = await api.sessions({
        direction: SessionDirection.PROVIDED,
        providerId: id,
        pageSize: state.pageSize,
        page: state.page,
      })
      const { items = [], totalPages = 0 } = { ...response }
      setState((cs) => ({ ...cs, sessionList: items.map(row), sessionListPages: totalPages }))
    } catch (err) {
      parseToastError(err)
    } finally {
      setState((cs) => ({ ...cs, isLoading: false }))
    }
  }

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
      isLoading={state.isLoading}
      main={
        <Table
          columns={columns}
          data={state.sessionList}
          onPaginationChange={handlePageChange}
          pagination={{ pageSize: state.pageSize }}
          lastPage={state.sessionListPages}
          loading={state.isLoading}
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
