/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useMemo, useState } from 'react'
import { Layout, LayoutHeroCardRow, LayoutUnstyledRow } from '../Components/Layout/Layout'
import { TransactionsHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Table, PrimaryCell, SecondaryCell } from '../../../Components/Table/Table'
import { DownloadTransactionCSV } from './DownloadTransactionCSV'
import { TotalSettled } from './TotalSettled'
import { SettlementCard } from './SettlementCard'
import { Column } from 'react-table'
import { Pagination, PaginationState } from '../../../Components/Pagination/Pagination'
import { tequila } from '../../../api/tequila'
import { myst } from '../../../commons/mysts'
import { useFetch } from '../../../commons/hooks'
import { SETTLEMENT_LIST_RESPONSE_EMPTY } from '../../../constants/instances'
import dates from '../../../commons/dates'

const { api } = tequila
const { date2human } = dates

export const TransactionsPage = () => {
  const [state, setState] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
  })

  const handlePageChange = ({ page }: PaginationState) => {
    setState((p) => ({ ...p, page }))
  }

  const [data = SETTLEMENT_LIST_RESPONSE_EMPTY] = useFetch(
    () => api.settlementHistory({ pageSize: state.pageSize, page: state.page }),
    [state.pageSize, state.page],
  )

  console.log(data.items)
  const Columns: Column<any>[] = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'settledAt',
        Cell: (c) => <PrimaryCell>{date2human(c.value)}</PrimaryCell>,
        minWidth: 50,
      },
      {
        Header: 'External Wallet Address',
        accessor: 'beneficiary',
        Cell: (c) => <SecondaryCell>{c.value}</SecondaryCell>,
        minWidth: 300,
      },
      {
        Header: 'Transaction ID',
        accessor: 'txHash',
        Cell: (c) => <SecondaryCell>{c.value}</SecondaryCell>,
        minWidth: 300,
      },
      {
        Header: 'Fee',
        accessor: 'fees',
        Cell: (c) => <PrimaryCell>{myst.display(c.value, { fractionDigits: 3 })}</PrimaryCell>,
        minWidth: 50,
        maxWidth: 100,
      },
      {
        Header: 'Received amount',
        accessor: 'amount',
        Cell: (c) => <PrimaryCell>{myst.display(c.value, { fractionDigits: 3 })}</PrimaryCell>,
        minWidth: 50,
        maxWidth: 100,
      },
    ],
    [],
  )
  return (
    <Layout logo={<TransactionsHeaderIcon />} title="Transactions">
      <LayoutHeroCardRow>
        <TotalSettled />
        <SettlementCard />
        <DownloadTransactionCSV />
      </LayoutHeroCardRow>
      <LayoutUnstyledRow>
        <Table columns={Columns} data={data.items} />
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        <Pagination currentPage={state.page} totalPages={data.totalPages} handlePageChange={handlePageChange} />
      </LayoutUnstyledRow>
    </Layout>
  )
}
