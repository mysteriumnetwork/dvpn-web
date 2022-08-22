/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useMemo, useState } from 'react'
import { Layout, LayoutRow } from '../Components/Layout/Layout'
import { TransactionsHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Table } from '../../../Components/Table/Table'
import { DownloadTransactionCSV } from './DownloadTransactionCSV'
import { TotalSettled } from './TotalSettled'
import { SettlementCard } from './SettlementCard'
import { Column } from 'react-table'
import { Pagination } from '../../../Components/Pagination/Pagination'
import { tequila } from '../../../api/tequila'
import { myst } from '../../../commons/mysts'
import { useFetch } from '../../../commons/hooks'
import { SETTLEMENT_LIST_RESPONSE_EMPTY } from '../../../constants/instances'
import dates from '../../../commons/dates'
import { cells } from '../../../Components/Table/cells'
import { media } from '../../../commons/media'
import { useMediaQuery } from 'react-responsive'
import { ReactComponent as Wallet } from '../../../assets/images/transactions.svg'
import styled from 'styled-components'
import { devices } from '../../../theme/themes'

const { isDesktopQuery } = media
const { api } = tequila
const { date2human } = dates
const { PrimaryCell, SecondaryCell, MobileCell, CellHeader, CellData, CellDataOverflow } = cells

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`
const PlaceholderIcon = styled(Wallet)`
  width: 350px;
  @media ${devices.tablet} {
    width: 300px;
  }
`
const PlaceholderText = styled.div`
  color: ${({ theme }) => theme.common.colorGrayBlue};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  font-weight: 700;
  margin-top: 50px;
  margin-bottom: 50px;
`
const Placeholder = () => (
  <PlaceholderContainer>
    <PlaceholderIcon />
    <PlaceholderText>No transactions in Your history yet</PlaceholderText>
  </PlaceholderContainer>
)

export const TransactionsPage = () => {
  const isDesktop = useMediaQuery(isDesktopQuery)
  const [state, setState] = useState(1)

  const handlePageChange = (page: number) => setState(page)

  const [data = SETTLEMENT_LIST_RESPONSE_EMPTY, loading] = useFetch(() => api.settlementHistory({ page: state }), [
    state,
  ])
  const noData = data.items.length === 0

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

  const MobileColumns: Column<any>[] = useMemo(
    () => [
      {
        Header: 'Transaction ID',
        accessor: 'txHash',
        Cell: (c) => (
          <MobileCell>
            <CellHeader>Transaction ID</CellHeader>
            <CellDataOverflow>{c.value}</CellDataOverflow>
          </MobileCell>
        ),
        className: 'grid-half',
      },
      {
        Header: 'Date',
        accessor: 'settledAt',
        Cell: (c) => (
          <MobileCell>
            <CellHeader>{date2human(c.value)}</CellHeader>
          </MobileCell>
        ),
      },
      {
        Header: 'External Wallet Address',
        accessor: 'beneficiary',
        Cell: (c) => (
          <MobileCell>
            <CellHeader>External Wallet</CellHeader>
            <CellDataOverflow>{c.value}</CellDataOverflow>
          </MobileCell>
        ),
        className: 'grid-full',
      },
      {
        Header: 'Fee',
        accessor: 'fees',
        Cell: (c) => (
          <MobileCell>
            <CellHeader>Fees</CellHeader>
            <CellData>{myst.display(c.value, { fractionDigits: 3 })}</CellData>
          </MobileCell>
        ),
      },
      {
        Header: 'Received amount',
        accessor: 'amount',
        Cell: (c) => (
          <MobileCell>
            <CellHeader>Received amount</CellHeader>
            <CellData>{myst.display(c.value, { fractionDigits: 3 })}</CellData>
          </MobileCell>
        ),
      },
    ],
    [],
  )

  return (
    <Layout logo={<TransactionsHeaderIcon />} title="Transactions">
      {isDesktop ? (
        <LayoutRow $variant="hero">
          <TotalSettled isDesktop={isDesktop} />
          <SettlementCard />
          <DownloadTransactionCSV isDesktop={isDesktop} data={data} />
        </LayoutRow>
      ) : (
        <LayoutRow>
          <TotalSettled isDesktop={isDesktop} />
          <DownloadTransactionCSV isDesktop={isDesktop} data={data} />
        </LayoutRow>
      )}
      <LayoutRow>
        <Table
          noContent={<Placeholder />}
          columns={isDesktop ? Columns : MobileColumns}
          loading={loading}
          data={data.items}
          isDesktop={isDesktop}
        />
      </LayoutRow>
      <LayoutRow>
        {!noData && <Pagination currentPage={state} totalPages={data.totalPages} handlePageChange={handlePageChange} />}
      </LayoutRow>
    </Layout>
  )
}
