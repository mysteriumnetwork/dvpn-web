/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useMemo } from 'react'
import { Layout, LayoutRow } from '../Components/Layout/Layout'
import { HistoryHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Column } from 'react-table'
import { Table } from '../../../Components/Table/Table'
import { cells } from '../../../Components/Table/cells'
import { Pagination } from '../../../Components/Pagination/Pagination'
import dates from '../../../commons/dates'
import location from '../../../commons/location'
import { myst } from '../../../commons/mysts'
import bytes from '../../../commons/bytes'
import { Option } from '../../../types/common'
import { media } from '../../../commons/media'
import { useMediaQuery } from 'react-responsive'
import { SessionV2 } from 'mysterium-vpn-js'
import services from '../../../commons/services'
import { RangePicker } from '../../../Components/Inputs/RangePicker'
import { List } from '../../../Components/List/List'
import { SessionCard } from './SessionCard'
import { Placeholder } from './Placeholder'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../mobx/store'

const { date2human, seconds2Time } = dates
const { countryName } = location
const { format } = bytes
const { isDesktopQuery } = media
const { PrimaryCell, SecondaryCell } = cells

const session2human = (session: string) => {
  return session.split('-')[0]
}

export const HistoryPage = observer(() => {
  const { historyPage } = useStores()
  const isDesktop = useMediaQuery(isDesktopQuery)

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
        <RangePicker
          options={historyPage.rangeOptions}
          value={historyPage.range}
          onChange={(o: Option) => historyPage.setRange(o)}
        />
      </LayoutRow>
      <LayoutRow>
        {isDesktop && (
          <Table
            noContent={<Placeholder />}
            columns={DesktopColumns}
            data={historyPage.pagedSessions}
            loading={historyPage.loading}
          />
        )}
        {!isDesktop && (
          <List
            items={historyPage.pagedSessions}
            mapper={(item) => <SessionCard item={item} />}
            noContent={<Placeholder />}
            loading={historyPage.loading}
          />
        )}
      </LayoutRow>
      <LayoutRow>
        {!historyPage.noData && (
          <Pagination
            currentPage={historyPage.page}
            totalPages={historyPage.totalPages}
            handlePageChange={(p) => historyPage.setPage(p)}
          />
        )}
      </LayoutRow>
    </Layout>
  )
})
