/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useMemo } from 'react'
import { Layout, LayoutHeroCardRow, LayoutUnstyledRow } from '../Components/Layout/Layout'
import { TransactionsHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Table, PrimaryCell, SecondaryCell } from '../../../Components/Table/Table'
import { DownloadTransactionCSV } from './DownloadTransactionCSV'
import { TotalSettled } from './TotalSettled'
import { SettlementCard } from './SettlementCard'
import { Column } from 'react-table'
import { Pagination } from '../../../Components/Pagination/Pagination'

const data = [
  {
    date: '19/05/2022, 09:37:24',
    extwallet: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    transaction_id: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    fee: '1.038 MYST',
    ammount: '1.038 MYST',
  },
  {
    date: '19/05/2022, 09:37:24',
    extwallet: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    transaction_id: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    fee: '1.038 MYST',
    ammount: '1.038 MYST',
  },
  {
    date: '19/05/2022, 09:37:24',
    extwallet: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    transaction_id: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    fee: '1.038 MYST',
    ammount: '1.038 MYST',
  },
  {
    date: '19/05/2022, 09:37:24',
    extwallet: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    transaction_id: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    fee: '1.038 MYST',
    ammount: '1.038 MYST',
  },
  {
    date: '19/05/2022, 09:37:24',
    extwallet: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    transaction_id: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    fee: '1.038 MYST',
    ammount: '1.038 MYST',
  },
  {
    date: '19/05/2022, 09:37:24',
    extwallet: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    transaction_id: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    fee: '1.038 MYST',
    ammount: '1.038 MYST',
  },
  {
    date: '19/05/2022, 09:37:24',
    extwallet: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    transaction_id: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    fee: '1.038 MYST',
    ammount: '1.038 MYST',
  },
  {
    date: '19/05/2022, 09:37:24',
    extwallet: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    transaction_id: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    fee: '1.038 MYST',
    ammount: '1.038 MYST',
  },
  {
    date: '19/05/2022, 09:37:24',
    extwallet: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    transaction_id: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    fee: '1.038 MYST',
    ammount: '1.038 MYST',
  },
  {
    date: '19/05/2022, 09:37:24',
    extwallet: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    transaction_id: '0x045f95f2df037539bb8a242b87d820ff58460fc1',
    fee: '1.038 MYST',
    ammount: '1.038 MYST',
  },
]

export const TransactionsPage = () => {
  const Columns: Column<any>[] = useMemo(
    () => [
      { Header: 'Date', accessor: 'date', Cell: (c) => <PrimaryCell>{c.value}</PrimaryCell>, minWidth: 50 },
      {
        Header: 'External Wallet Address',
        accessor: 'extwallet',
        Cell: (c) => <SecondaryCell>{c.value}</SecondaryCell>,
        minWidth: 300,
      },
      {
        Header: 'Transaction ID',
        accessor: 'transaction_id',
        Cell: (c) => <SecondaryCell>{c.value}</SecondaryCell>,
        minWidth: 300,
      },
      {
        Header: 'Fee',
        accessor: 'fee',
        Cell: (c) => <PrimaryCell>{c.value}</PrimaryCell>,
        minWidth: 50,
        maxWidth: 100,
      },
      {
        Header: 'Received ammount',
        accessor: 'ammount',
        Cell: (c) => <PrimaryCell>{c.value}</PrimaryCell>,
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
        <Table columns={Columns} data={data} />
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        <Pagination />
      </LayoutUnstyledRow>
    </Layout>
  )
}
