/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useMemo } from 'react'
import { Layout, LayoutRow } from '../Components/Layout/Layout'
import { TransactionsHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Table } from '../../../Components/Table/Table'
import { DownloadTransactionCSV } from './DownloadTransactionCSV'
import { TotalSettled } from './TotalSettled'
import { SettlementCard } from './SettlementCard'
import { Column } from 'react-table'
import { Pagination } from '../../../Components/Pagination/Pagination'
import { myst } from '../../../commons/mysts'
import dates from '../../../commons/dates'
import { cells } from '../../../Components/Table/cells'
import { media } from '../../../commons/media'
import { useMediaQuery } from 'react-responsive'
import { Placeholder } from './Placeholder'
import { Settlement } from 'mysterium-vpn-js'
import { TransactionCard } from './TransactionCard'
import { List } from '../../../Components/List/List'
import { Tooltip } from '../../../Components/Tooltip/Tooltip'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../../mobx/store'

const { isDesktopQuery } = media
const { date2human } = dates
const { PrimaryCell, SecondaryCell } = cells

const SpecializedRow = styled(LayoutRow)`
  > :nth-child(2) {
    flex-grow: 2;
  }
`

export const TransactionsPage = observer(() => {
  const { transactionsPage } = useStores()
  const isDesktop = useMediaQuery(isDesktopQuery)

  const Columns: Column<Settlement>[] = useMemo(
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
        Header: () => (
          <>
            {'Fee'}
            <Tooltip content="This fee includes a 20% network fee plus blockchain transaction fees for settlement transactions." />
          </>
        ),
        accessor: 'fees',
        Cell: (c) => <PrimaryCell>{myst.display(c.value, { fractions: 3 })}</PrimaryCell>,
        minWidth: 50,
        maxWidth: 100,
      },
      {
        Header: 'Received amount',
        accessor: 'amount',
        Cell: (c) => <PrimaryCell>{myst.display(c.value, { fractions: 3 })}</PrimaryCell>,
        minWidth: 50,
        maxWidth: 100,
      },
    ],
    [],
  )
  useEffect(() => {
    transactionsPage.fetchTransactions()
  }, [])
  return (
    <Layout logo={<TransactionsHeaderIcon />} title="Transactions">
      <SpecializedRow $variant={isDesktop ? 'hero' : 'plain'}>
        <TotalSettled />
        {isDesktop && <SettlementCard />}
        <DownloadTransactionCSV data={transactionsPage.transactions} />
      </SpecializedRow>
      <LayoutRow>
        {isDesktop && (
          <Table
            noContent={<Placeholder />}
            columns={Columns}
            loading={transactionsPage.loading}
            data={transactionsPage.transactions}
          />
        )}
        {!isDesktop && (
          <List
            items={transactionsPage.transactions}
            mapper={(item) => <TransactionCard item={item} />}
            loading={transactionsPage.loading}
            noContent={<Placeholder />}
          />
        )}
      </LayoutRow>
      <LayoutRow>
        {!transactionsPage.noData && (
          <Pagination
            currentPage={transactionsPage.page}
            totalPages={transactionsPage.totalPages}
            handlePageChange={(p) => transactionsPage.setPage(p)}
          />
        )}
      </LayoutRow>
    </Layout>
  )
})
