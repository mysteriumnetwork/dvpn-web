/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useMemo, useState } from 'react'
import { Layout, LayoutUnstyledRow } from '../Components/Layout/Layout'
import { HistoryHeaderIcon } from '../../../Components/Icons/PageIcons'
// import { Table } from '../../../Components/Table/Table'
import { Column } from 'react-table'
import { Table, PrimaryCell, SecondaryCell } from '../../../Components/Table/Table'
import { Pagination } from '../../../Components/Pagination/Pagination'
import { tequila } from '../../../api/tequila'
import { SESSIONS_LIST_RESPONSE_EMPTY } from '../../../constants/instances'
import dates from '../../../commons/dates'
import { useFetch } from '../../../commons/hooks'
import countries from '../../../commons/countries'
import { myst } from '../../../commons/mysts'
import bytes from '../../../commons/bytes'

const { api } = tequila
const { date2human, seconds2Time } = dates
const { countryName } = countries
const { format, add } = bytes
interface State {
  page: number
  pageSize: number
}

// TODO: Improve switch statement once its clear what other services are named
const service2human = (service: string) => {
  switch (service) {
    case 'wireguard':
      return 'Public'
  }
}
const session2human = (session: string) => {
  return session.split('-')[0]
}
export const HistoryPage = () => {
  const [state, setState] = useState<State>({
    page: 1,
    pageSize: 20,
  })

  const [data = SESSIONS_LIST_RESPONSE_EMPTY, loading] = useFetch(
    () => api.sessions({ pageSize: state.pageSize, page: state.page }),
    [state.pageSize, state.page],
  )
  console.log(data.items)
  const Columns: Column<any>[] = useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'consumerCountry',
        Cell: (c) => <PrimaryCell>{countryName(c.value)}</PrimaryCell>,
        maxWidth: 100,
      },
      {
        Header: 'Duration',
        accessor: 'duration',
        Cell: (c) => <SecondaryCell>{seconds2Time(c.value)}</SecondaryCell>,
      },
      {
        Header: 'Started',
        accessor: 'createdAt',
        Cell: (c) => <SecondaryCell>{date2human(c.value)}</SecondaryCell>,
      },
      {
        Header: 'Services',
        accessor: 'serviceType',
        Cell: (c) => <SecondaryCell>{service2human(c.value)}</SecondaryCell>,
      },
      {
        Header: 'Earnings',
        accessor: 'tokens',
        Cell: (c) => <PrimaryCell>{myst.display(c.value, { fractionDigits: 3 })}</PrimaryCell>,
      },
      {
        Header: 'Transfered',
        accessor: (row): any => add(row.bytesSent, row.bytesReceived),
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
      <LayoutUnstyledRow>
        <Table columns={Columns} data={data.items} />
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        <Pagination />
      </LayoutUnstyledRow>
    </Layout>
  )
}
