/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Session, SessionDirection, SessionListResponse, SessionStats } from 'mysterium-vpn-js'
import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'

import { tequilapiClient } from '../../../api/TequilApiClient'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/sessions/logo.svg'
import '../../../assets/styles/pages/sessionsList.scss'
import formatBytes from '../../../commons/formatBytes'
import { displayMyst } from '../../../commons/money.utils'
import { seconds2Time } from '../../../commons/date.utils'
import Header from '../../../Components/Header'
import Table, { TableRow } from '../../../Components/Table/Table'
import SessionSidebar from '../SessionSidebar/SessionSidebar'
import './Sessions.scss'
import { parseError } from '../../../commons/error.utils'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { date2human } from '../../../commons/date.utils'

export interface Props {
  filterDirection?: SessionDirection
  filterProviderId?: string
  liveSessions?: Session[]
  liveSessionStats?: SessionStats
}

interface StateProps {
  isLoading: boolean
  pageSize: number
  sessionListResponse?: SessionListResponse
  currentPage: number
}

const row = (s: Session): TableRow => {
  const cells = [
    {
      className: 'w-10',
      content: s.consumerCountry,
    },
    {
      className: 'w-10',
      content: seconds2Time(s.duration),
    },
    {
      className: 'w-20',
      content: date2human(s.createdAt),
    },
    {
      className: 'w-20',
      content: displayMyst(s.tokens),
    },
    {
      className: 'w-20',
      content: formatBytes(s.bytesReceived + s.bytesSent),
    },
    {
      className: 'w-20',
      content: s.id.split('-')[0],
    },
  ]

  return {
    key: s.id,
    cells: cells,
  }
}

const Sessions = ({ filterDirection = SessionDirection.PROVIDED }: Props) => {
  const [state, setState] = useState<StateProps>({
    isLoading: true,
    pageSize: 10,
    currentPage: 1,
  })

  const filterProviderId = useSelector<RootState, string | undefined>(({ app }) => app.currentIdentity?.id)
  const liveSessions = useSelector<RootState, Session[] | undefined>(({ sse }) => sse.appState?.sessions)
  const liveSessionStats = useSelector<RootState, SessionStats | undefined>(({ sse }) => sse.appState?.sessionsStats)

  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    tequilapiClient
      .sessions({
        direction: filterDirection,
        providerId: filterProviderId,
        pageSize: state.pageSize,
        page: state.currentPage,
      })
      .then((resp) => {
        setState((cs) => ({ ...cs, isLoading: false, sessionListResponse: resp }))
      })
      .catch((err) => {
        enqueueSnackbar(parseError(err) || 'Fetching Sessions Failed!')
        console.log(err)
      })
  }, [state.pageSize, state.currentPage])

  const { items = [], totalPages = 0 } = { ...state.sessionListResponse }

  const handlePrevPageButtonClick = () => {
    setState((cs) => ({ ...cs, currentPage: state.currentPage - 1, isLoading: true }))
  }

  const handleNextPageButtonClick = () => {
    setState((cs) => ({ ...cs, currentPage: state.currentPage + 1, isLoading: true }))
  }

  const onPageClicked = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
    setState((cs) => ({ ...cs, currentPage: pageNumber, isLoading: true }))
  }

  return (
    <div className="main">
      <div className="main-block main-block--split">
        <Header logo={Logo} name="Sessions" />
        <Table
          headers={[
            { name: 'Country', className: 'w-10' },
            { name: 'Duration', className: 'w-10' },
            { name: 'Started', className: 'w-20' },
            { name: 'Earnings', className: 'w-20' },
            { name: 'Transferred', className: 'w-20' },
            { name: 'Session ID', className: 'w-20' },
          ]}
          rows={items.map(row)}
          currentPage={state.currentPage}
          lastPage={totalPages}
          handlePrevPageButtonClick={handlePrevPageButtonClick}
          handleNextPageButtonClick={handleNextPageButtonClick}
          onPageClick={onPageClicked}
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
