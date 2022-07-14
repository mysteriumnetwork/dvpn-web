/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useMemo } from 'react'
import { Layout, LayoutUnstyledRow } from '../Components/Layout/Layout'
import { HistoryHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Table } from '../../../Components/Table/Table'

export const HistoryPage = () => {
  const Columns = useMemo(
    () => [
      { Header: 'Country', accessor: 'country' },
      { Header: 'Duration', accessor: 'duration' },
      { Header: 'Started', accessor: 'started' },
      { Header: 'Services', accessor: 'services' },
      { Header: 'Earnings', accessor: 'earnings' },
      { Header: 'Transfered', accessor: 'transfered' },
      { Header: 'Session ID', accessor: 'sessionid' },
    ],
    [],
  )
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
  return (
    <Layout logo={<HistoryHeaderIcon />} title="History">
      <LayoutUnstyledRow>
        <Table columns={Columns} data={data} />
      </LayoutUnstyledRow>
    </Layout>
  )
}
