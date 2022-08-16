/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useMemo, useState } from 'react'
import { Layout, LayoutUnstyledRow } from '../Components/Layout/Layout'
import { HistoryHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Column } from 'react-table'
import { PrimaryCell, SecondaryCell, Table } from '../../../Components/Table/Table'
import { Pagination } from '../../../Components/Pagination/Pagination'
import { tequila } from '../../../api/tequila'
import dates from '../../../commons/dates'
import { useFetch } from '../../../commons/hooks'
import location from '../../../commons/location'
import { myst } from '../../../commons/mysts'
import bytes from '../../../commons/bytes'
import { SessionV2 } from 'mysterium-vpn-js'
import { Option } from '../../../types/common'
import { RangePicker } from '../../../Components/Inputs/RangePicker'
import services from '../../../commons/services'

const { api } = tequila
const { date2human, seconds2Time } = dates
const { countryName } = location
const { format } = bytes

const session2human = (session: string) => {
  return session.split('-')[0]
}

const PAGE_SIZE = 2
const RANGE_OPTIONS = ['1d', '7d', '30d'].map<Option>((r) => ({ value: r, label: r }))

export const HistoryPage = () => {
  const [range, setRange] = useState<Option>(RANGE_OPTIONS[RANGE_OPTIONS.length - 1])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sessions, setSessions] = useState<SessionV2[]>([])

  const [data = { sessions: [] }, loading] = useFetch(() => api.provider.sessions({ range: range.value }), [
    range.value,
  ])

  useEffect(() => {
    if (data.sessions.length < 1 || loading) {
      return
    }
    setTotalPages(Math.ceil(data.sessions.length / PAGE_SIZE))
    setSessions(data.sessions.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page))
  }, [data.sessions.length, page, loading])

  const Columns: Column<SessionV2>[] = useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'consumerCountry',
        Cell: (c) => <PrimaryCell>{countryName(c.value)}</PrimaryCell>,
        maxWidth: 100,
      },
      {
        Header: 'Duration',
        accessor: 'durationSeconds',
        Cell: (c) => <SecondaryCell>{seconds2Time(c.value)}</SecondaryCell>,
      },
      {
        Header: 'Started',
        accessor: 'startedAt',
        Cell: (c) => <SecondaryCell>{date2human(c.value)}</SecondaryCell>,
      },
      {
        Header: 'Services',
        accessor: 'serviceType',
        Cell: (c) => <SecondaryCell>{services.name(c.value)}</SecondaryCell>,
      },
      {
        Header: 'Earnings',
        accessor: 'earnings',
        Cell: (c) => <PrimaryCell>{myst.display(c.value.wei, { fractionDigits: 3 })}</PrimaryCell>,
      },
      {
        Header: 'Transferred',
        accessor: 'transferredBytes',
        Cell: (c) => <PrimaryCell>{format(c.value)}</PrimaryCell>,
      },
      {
        Header: 'Session ID',
        accessor: 'id',
        Cell: (c) => <SecondaryCell>{session2human(c.value)}</SecondaryCell>,
      },
    ],
    [],
  )
  return (
    <Layout logo={<HistoryHeaderIcon />} title="History">
      <LayoutUnstyledRow>
        <RangePicker options={RANGE_OPTIONS} value={range} onChange={(option: Option) => setRange(option)} />
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        <Table columns={Columns} data={sessions} loading={loading} />
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        <Pagination currentPage={page} totalPages={totalPages} handlePageChange={(page: number) => setPage(page)} />
      </LayoutUnstyledRow>
    </Layout>
  )
}
