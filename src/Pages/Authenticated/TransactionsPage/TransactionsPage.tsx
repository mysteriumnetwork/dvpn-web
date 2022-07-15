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
      { Header: 'Date', accessor: 'date', Cell: (c) => <PrimaryCell>{c.value}</PrimaryCell> },
      {
        Header: 'External Wallet Address',
        accessor: 'extwallet',
        Cell: (c) => <SecondaryCell>{c.value}</SecondaryCell>,
      },
      {
        Header: 'Transaction ID',
        accessor: 'transacation_id',
        Cell: (c) => <SecondaryCell>{c.value}</SecondaryCell>,
      },
      {
        Header: 'Fee',
        accessor: 'fee',
        Cell: (c) => <PrimaryCell>{c.value}</PrimaryCell>,
      },
      { Header: 'Received ammount', accessor: 'ammount', Cell: (c) => <PrimaryCell>{c.value}</PrimaryCell> },
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
    </Layout>
  )
}
