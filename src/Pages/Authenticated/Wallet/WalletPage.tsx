/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SettlementListResponse } from 'mysterium-vpn-js'
import { Settlement } from 'mysterium-vpn-js/lib/transactor/settlement'
import React, { ReactNode, useMemo, useState } from 'react'
import { Column, Row } from 'react-table'
import { tequila } from '../../../api/wrapped-calls'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/wallet/logo.svg'
import dates from '../../../commons/dates'
import { myst } from '../../../commons/mysts'
import { strings } from '../../../commons/strings'
import { DownloadCSV } from '../../../Components/Download/DownloadCSV'
import { MobileRow } from '../../../Components/Table/MobileRow'
import Table, { PagingProps } from '../../../Components/Table/Table'
import { Header } from '../../../Components/Table/TableComponents'
import { CardLayout } from '../Components/Card/CardLayout'
import { Cards } from '../Components/Card/PreparedCards'
import { Layout } from '../Layout'
import { toCsv } from './settlement.mapper'
import styles from './WalletPage.module.scss'
import hooks from '../../../commons/hooks'

const { date2human } = dates

interface State {
  page: number
  pageSize: number
}

const EMPTY_RESPONSE = { items: [], totalPages: 0, page: 1, pageSize: 10, totalItems: 0, withdrawalTotal: '0' }

const WalletPage = () => {
  const { api } = tequila

  const [state, setState] = useState<State>({
    page: 1,
    pageSize: 2,
  })

  const [data = EMPTY_RESPONSE, loading] = hooks.useFetch(
    () => api.settlementHistory({ pageSize: state.pageSize, page: state.page }),
    [state.pageSize, state.page],
  )

  const fetchDownloadData = async () => {
    const { totalItems } = await api.settlementHistory({ pageSize: 0 })
    return await api.settlementHistory({ pageSize: totalItems })
  }

  const handlePageChange = ({ pageSize, page }: PagingProps) => {
    setState((p) => ({ ...p, pageSize, page }))
  }

  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'settledAt',
        width: 15,
        Cell: ({ value }) => {
          return date2human(value)
        },
      },
      {
        Header: 'External Wallet Address',
        accessor: 'beneficiary',
        width: 25,
        Cell: ({ value }) => {
          return value === '0x0000000000000000000000000000000000000000' ? '-' : value
        },
      },
      {
        Header: 'Transaction ID',
        width: 40,
        Cell: ({ row }: { row: Row<Settlement> }) => {
          const { txHash, blockExplorerUrl } = row.original
          return blockExplorerUrl ? (
            <a href={blockExplorerUrl} target="_blank" rel="noopener noreferrer">
              {txHash}
            </a>
          ) : (
            txHash
          )
        },
      },
      {
        Header: (
          <Header
            name="Fee"
            tooltip={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p>This fee includes a 20% network fee plus blockchain transaction fees for settlement transactions.</p>
              </div>
            }
          />
        ),
        accessor: 'fees',
        width: 10,
        Cell: ({ value }) => {
          return myst.display(value)
        },
      },
      {
        Header: (
          <HeaderWithAction
            title="Received Amount"
            control={<DownloadCSV<SettlementListResponse> fetchData={fetchDownloadData} mapper={toCsv} />}
          />
        ),
        accessor: 'amount',
        width: 15,
        Cell: ({ value }) => {
          return myst.display(value)
        },
      },
    ],
    [],
  )

  return (
    <Layout
      title="Wallet"
      logo={<Logo />}
      main={
        <>
          <div className={styles.cards}>
            <CardLayout wrap="nowrap">
              <Cards.TotalWithdrawn amount={data.withdrawalTotal} />
              <Cards.EarningsCard />
            </CardLayout>
          </div>
          <Table
            data={data.items}
            lastPage={data.totalPages}
            loading={loading}
            columns={columns}
            pagination={{ pageSize: state.pageSize }}
            onPaginationChange={handlePageChange}
            responsivePaging
            mobileRow={(row: Row<Settlement>, index) => {
              const { settledAt, txHash, fees, amount, beneficiary } = row.original
              return (
                <MobileRow
                  key={index}
                  topLeft={date2human(settledAt)}
                  topLeftSub={strings.truncateHash(txHash)}
                  topRightSub={strings.truncateHash(beneficiary)}
                  bottomLeft={myst.display(fees)}
                  bottomRight={myst.display(amount)}
                />
              )
            }}
          />
        </>
      }
    />
  )
}

interface HeaderWithActionProps {
  title: string
  control?: ReactNode
}

const HeaderWithAction = ({ title, control }: HeaderWithActionProps) => {
  return (
    <div className={styles.headerWithControl}>
      {title} {control}
    </div>
  )
}

export default WalletPage
