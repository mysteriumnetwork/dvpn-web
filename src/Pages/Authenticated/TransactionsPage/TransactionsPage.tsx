/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useMemo, useState } from 'react'
import { Layout, LayoutRow } from '../Components/Layout/Layout'
import { TransactionsHeaderIcon } from '../../../Components/Icons/PageIcons'
import { DownloadTransactionCSV } from './DownloadTransactionCSV'
import { TotalSettled } from './TotalSettled'
import { SettlementCard } from './SettlementCard'
import { Pagination } from '../../../Components/Pagination/Pagination'
import { tequila } from '../../../api/tequila'
import { myst } from '../../../commons/mysts'
import { useFetch } from '../../../commons/hooks'
import { SETTLEMENT_LIST_RESPONSE_EMPTY } from '../../../constants/instances'
import dates from '../../../commons/dates'
import { Cells } from '../../../Components/Table/cells'
import { media } from '../../../commons/media'
import { useMediaQuery } from 'react-responsive'
import { Placeholder } from './Placeholder'
import { Settlement } from 'mysterium-vpn-js'
import { ColumnDef } from '@tanstack/react-table'
import { TransactionCard } from './TransactionCard'
import { List } from '../../../Components/List/List'
import styled from 'styled-components'
import { Table } from '../../../Components/Table/Table'
import { Tooltip } from '../../../Components/Tooltip/Tooltip'
import { InfoIcon } from '../../../Components/Icons/Icons'
const { isDesktopQuery } = media
const { api } = tequila
const { date2human } = dates
const { Primary, Secondary, Default } = Cells

const SpecializedRow = styled(LayoutRow)`
  > :nth-child(2) {
    flex-grow: 2;
  }
`

export const TransactionsPage = () => {
  const isDesktop = useMediaQuery(isDesktopQuery)
  const [state, setState] = useState(1)
  const handlePageChange = (page: number) => setState(page)

  const [data = SETTLEMENT_LIST_RESPONSE_EMPTY, loading] = useFetch(
    () => api.settlementHistory({ page: state }),
    [state],
  )
  const noData = data.items.length === 0

  const Columns = useMemo<ColumnDef<Settlement>[]>(
    () => [
      {
        id: 'date',
        header: () => <Default $ml="20px">Date</Default>,
        cell: ({ row: { original } }) => <Primary $ml="20px">{date2human(original.settledAt)}</Primary>,
      },
      {
        id: 'External Wallet Address',
        header: () => <Default>External Wallet Address</Default>,
        cell: ({ row: { original } }) => <Secondary>{original.beneficiary}</Secondary>,
        minSize: 300,
      },
      {
        id: 'Transaction ID',
        header: () => <Default>Transaction ID</Default>,
        cell: ({ row: { original } }) => <Secondary>{original.txHash}</Secondary>,
        minSize: 300,
      },
      {
        id: 'Fee',
        header: () => (
          <Default>
            Fees
            <Tooltip
              placement="top"
              content={
                'This fee includes a 20% network fee plus blockchain transaction fees for settlement transactions.'
              }
            >
              <InfoIcon />
            </Tooltip>
          </Default>
        ),
        cell: ({ row: { original } }) => <Primary>{myst.display(original.fees, { fractions: 3 })}</Primary>,
        minSize: 50,
        maxSize: 100,
      },
      {
        id: 'Received amount',
        header: () => <Default>Received amount</Default>,
        cell: ({ row: { original } }) => <Primary>{myst.display(original.amount, { fractions: 3 })}</Primary>,
        minSize: 50,
        maxSize: 100,
      },
    ],
    [],
  )

  return (
    <Layout logo={<TransactionsHeaderIcon />} title="Transactions">
      <SpecializedRow $variant={isDesktop ? 'hero' : 'plain'}>
        <TotalSettled />
        {isDesktop && <SettlementCard />}
        <DownloadTransactionCSV data={data} />
      </SpecializedRow>
      <LayoutRow>
        {!isDesktop && (
          <List
            items={data.items}
            mapper={(item) => <TransactionCard item={item} />}
            loading={loading}
            noContent={<Placeholder />}
          />
        )}
      </LayoutRow>
      <LayoutRow>
        {isDesktop && <Table noContent={<Placeholder />} columns={Columns} loading={loading} data={data.items} />}
      </LayoutRow>
      <LayoutRow>
        {!noData && <Pagination currentPage={state} totalPages={data.totalPages} handlePageChange={handlePageChange} />}
      </LayoutRow>
    </Layout>
  )
}
