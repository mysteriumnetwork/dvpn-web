/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useMemo, useEffect } from 'react'
import { Layout, LayoutRow } from '../Components/Layout/Layout'
import { HistoryHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Cells } from '../../../Components/Table/cells'
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
import { HeatAtlas } from '../../../Components/Maps/HeatAtlas'
import { ColumnDef } from '@tanstack/react-table'
import { Table } from '../../../Components/Table/Table'

const { date2human, seconds2Time } = dates
const { countryName } = location
const { format } = bytes
const { isDesktopQuery } = media
const { Primary, Secondary, Default } = Cells

export const HistoryPage = observer(() => {
  const { historyPage } = useStores()
  const isDesktop = useMediaQuery(isDesktopQuery)

  useEffect(() => {
    historyPage.fetchSessions()
  }, [])

  const Columns = useMemo<ColumnDef<SessionV2>[]>(
    () => [
      {
        id: 'Country',
        header: 'Country',
        cell: ({ row: { original } }) => <Primary>{countryName(original.consumerCountry)}</Primary>,
        maxSize: 100,
      },
      {
        id: 'Duration',
        header: 'Duration',
        maxSize: 50,
        minSize: 50,
        cell: ({ row: { original } }) => <Secondary>{seconds2Time(original.durationSeconds)}</Secondary>,
      },
      {
        id: 'Started',
        maxSize: 125,
        minSize: 100,
        header: () => <Default $ml="15px">Started</Default>,
        cell: ({ row: { original } }) => (
          <Secondary $ml="10px" $align={'left'}>
            {date2human(original.startedAt)}
          </Secondary>
        ),
      },
      {
        id: 'Services',
        maxSize: 160,
        minSize: 160,
        header: () => <Default $ml="15px">Services</Default>,
        cell: ({ row: { original } }) => (
          <Secondary $ml="10px" $align={'left'}>
            {services.name(original.serviceType)}
          </Secondary>
        ),
      },
      {
        id: 'Earnings',
        maxSize: 120,
        minSize: 120,
        header: () => <Default $ml="15px">Earnings</Default>,
        cell: ({ row: { original } }) => (
          <Primary $ml="10px">{myst.display(original.earnings.wei, { fractions: 5 })}</Primary>
        ),
      },
      {
        id: 'Transferred',
        maxSize: 90,
        minSize: 90,
        header: () => <Default $ml="15px">Transferred</Default>,
        cell: ({ row: { original } }) => <Primary $ml="10px">{format(original.transferredBytes)}</Primary>,
      },
      {
        id: 'Session ID',
        header: () => <Default $ml="15px">Transferred</Default>,
        cell: ({ row: { original } }) => <Secondary $ml="10px">{original.id}</Secondary>,
      },
    ],
    [],
  )
  return (
    <Layout logo={<HistoryHeaderIcon />} title="History">
      <LayoutRow data-test-id="SessionCard.header">
        <RangePicker
          options={historyPage.rangeOptions}
          value={historyPage.range}
          onChange={(o: Option) => historyPage.setRange(o)}
        />
      </LayoutRow>
      {isDesktop && (
        <LayoutRow data-test-id="HistoryPage.tableContainer">
          <HeatAtlas points={historyPage.points} />
        </LayoutRow>
      )}
      <LayoutRow>
        {isDesktop && (
          <Table
            noContent={<Placeholder />}
            columns={Columns}
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
      <LayoutRow data-test-id="HistoryPage.pagination">
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
