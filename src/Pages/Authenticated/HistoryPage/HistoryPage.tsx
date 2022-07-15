/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useMemo } from 'react'
import { Layout, LayoutUnstyledRow } from '../Components/Layout/Layout'
import { HistoryHeaderIcon } from '../../../Components/Icons/PageIcons'
// import { Table } from '../../../Components/Table/Table'
import { Column } from 'react-table'
import { Table, PrimaryCell, SecondaryCell } from '../../../Components/Table/Table'
import { Pagination } from '../../../Components/Pagination/Pagination'
const data = [
  {
    country: 'Australia',
    duration: '2:34:15',
    started: '19/05/2022, 09:37:24',
    services: 'Data scraping',
    earnings: '1.038 MYST',
    transfered: '26.5GB',
    sessionid: '30c973d',
  },
  {
    country: 'Australia',
    duration: '2:34:15',
    started: '19/05/2022, 09:37:24',
    services: 'Data scraping',
    earnings: '1.038 MYST',
    transfered: '26.5GB',
    sessionid: '30c973d',
  },
  {
    country: 'Australia',
    duration: '2:34:15',
    started: '19/05/2022, 09:37:24',
    services: 'Data scraping',
    earnings: '1.038 MYST',
    transfered: '26.5GB',
    sessionid: '30c973d',
  },
  {
    country: 'Australia',
    duration: '2:34:15',
    started: '19/05/2022, 09:37:24',
    services: 'Data scraping',
    earnings: '1.038 MYST',
    transfered: '26.5GB',
    sessionid: '30c973d',
  },
  {
    country: 'Australia',
    duration: '2:34:15',
    started: '19/05/2022, 09:37:24',
    services: 'Data scraping',
    earnings: '1.038 MYST',
    transfered: '26.5GB',
    sessionid: '30c973d',
  },
  {
    country: 'Australia',
    duration: '2:34:15',
    started: '19/05/2022, 09:37:24',
    services: 'Data scraping',
    earnings: '1.038 MYST',
    transfered: '26.5GB',
    sessionid: '30c973d',
  },
  {
    country: 'Australia',
    duration: '2:34:15',
    started: '19/05/2022, 09:37:24',
    services: 'Data scraping',
    earnings: '1.038 MYST',
    transfered: '26.5GB',
    sessionid: '30c973d',
  },
  {
    country: 'Australia',
    duration: '2:34:15',
    started: '19/05/2022, 09:37:24',
    services: 'Data scraping',
    earnings: '1.038 MYST',
    transfered: '26.5GB',
    sessionid: '30c973d',
  },
]
export const HistoryPage = () => {
  const Columns: Column<any>[] = useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'country',
        Cell: (c) => <PrimaryCell>{c.value}</PrimaryCell>,
        maxWidth: 100,
      },
      {
        Header: 'Duration',
        accessor: 'duration',
        Cell: (c) => <SecondaryCell>{c.value}</SecondaryCell>,
      },
      {
        Header: 'Started',
        accessor: 'started',
        Cell: (c) => <SecondaryCell>{c.value}</SecondaryCell>,
      },
      {
        Header: 'Services',
        accessor: 'services',
        Cell: (c) => <SecondaryCell>{c.value}</SecondaryCell>,
      },
      {
        Header: 'Earnings',
        accessor: 'earnings',
        Cell: (c) => <PrimaryCell>{c.value}</PrimaryCell>,
      },
      {
        Header: 'Transfered',
        accessor: 'transfered',
        Cell: (c) => <PrimaryCell>{c.value}</PrimaryCell>,
      },
      {
        Header: 'Session ID',
        accessor: 'sessionid',
        Cell: (c) => <SecondaryCell>{c.value}</SecondaryCell>,
      },
    ],
    [],
  )

  return (
    <Layout logo={<HistoryHeaderIcon />} title="History">
      <LayoutUnstyledRow>
        <Table columns={Columns} data={data} />
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        <Pagination />
      </LayoutUnstyledRow>
    </Layout>
  )
}
