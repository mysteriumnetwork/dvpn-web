/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useMemo, useState } from 'react'
import { Layout, LayoutRow } from '../Components/Layout/Layout'
import { HistoryHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Column } from 'react-table'
import { Table } from '../../../Components/Table/Table'
import { cells } from '../../../Components/Table/cells'
import { Pagination } from '../../../Components/Pagination/Pagination'
import { tequila } from '../../../api/tequila'
import dates from '../../../commons/dates'
import { useFetch } from '../../../commons/hooks'
import location from '../../../commons/location'
import { myst } from '../../../commons/mysts'
import bytes from '../../../commons/bytes'
import { MetricsRange, Option } from '../../../types/common'
import { media } from '../../../commons/media'
import { useMediaQuery } from 'react-responsive'
import { SessionV2 } from 'mysterium-vpn-js'
import services from '../../../commons/services'
import { RangePicker } from '../../../Components/Inputs/RangePicker'
import { List } from '../../../Components/List/List'
import { SessionCard } from './SessionCard'
import { Placeholder } from './Placeholder'

const { api } = tequila
const { date2human, seconds2Time } = dates
const { countryName } = location
const { format } = bytes
const { isDesktopQuery } = media
const { PrimaryCell, SecondaryCell } = cells

const session2human = (session: string) => {
  return session.split('-')[0]
}

const PAGE_SIZE = 10
const RANGE_OPTIONS: Option<MetricsRange>[] = [
  { label: 'Last 24 hours', value: '1d' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
]

export const HistoryPage = () => {
  const isDesktop = useMediaQuery(isDesktopQuery)

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
  const noData = data.sessions.length === 0

  const DesktopColumns: Column<SessionV2>[] = useMemo(
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
        Cell: (c) => <PrimaryCell>{myst.display(c.value.wei, { fractions: 5 })}</PrimaryCell>,
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
      <LayoutRow>
        <RangePicker options={RANGE_OPTIONS} value={range} onChange={(option: Option) => setRange(option)} />
      </LayoutRow>
      <LayoutRow>
        {isDesktop && <Table noContent={<Placeholder />} columns={DesktopColumns} data={sessions} loading={loading} />}
        {!isDesktop && (
          <List
            items={sessions}
            mapper={(item) => <SessionCard item={item} />}
            noContent={<Placeholder />}
            loading={loading}
          />
        )}
      </LayoutRow>
      <LayoutRow>
        {!noData && (
          <Pagination currentPage={page} totalPages={totalPages} handlePageChange={(page: number) => setPage(page)} />
        )}
      </LayoutRow>
    </Layout>
  )
}
