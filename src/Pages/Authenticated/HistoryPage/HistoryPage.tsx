/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { useMemo } from 'react'
import { Layout, LayoutUnstyledRow } from '../Components/Layout/Layout'
import { HistoryHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Table } from '../../../Components/Table/Table'
import { ColumnDef } from '@tanstack/react-table'

const PrimaryCell = styled.div`
  padding: 1em;
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  font-weight: 600;
`
const SecondaryCell = styled.div`
  padding: 1em;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  font-weight: 400;
`

export const HistoryPage = () => {
  const Columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: 'Country',
        accessorKey: 'country',
        cell: (c) => <PrimaryCell>{c.getValue()}</PrimaryCell>,
        width: 80,
      },
      {
        header: 'Duration',
        accessorKey: 'duration',
        cell: (c) => <SecondaryCell>{c.getValue()}</SecondaryCell>,
        width: 80,
      },
      {
        header: 'Started',
        accessorKey: 'started',
        cell: (c) => <SecondaryCell>{c.getValue()}</SecondaryCell>,
        width: 80,
      },
      {
        header: 'Services',
        accessorKey: 'services',
        cell: (c) => <SecondaryCell>{c.getValue()}</SecondaryCell>,
        width: 80,
      },
      {
        header: 'Earnings',
        accessorKey: 'earnings',
        cell: (c) => <PrimaryCell>{c.getValue()}</PrimaryCell>,
        width: 80,
      },
      {
        header: 'Transfered',
        accessorKey: 'transfered',
        cell: (c) => <PrimaryCell>{c.getValue()}</PrimaryCell>,
        width: 80,
      },
      {
        header: 'Session ID',
        accessorKey: 'sessionid',
        cell: (c) => <SecondaryCell>{c.getValue()}</SecondaryCell>,
      },
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
