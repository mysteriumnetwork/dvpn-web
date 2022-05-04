/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SettlementListResponse } from 'mysterium-vpn-js'
import { Settlement } from 'mysterium-vpn-js/lib/transactor/settlement'
import React, { ReactNode, useEffect, useMemo } from 'react'
import { Column, Row } from 'react-table'
import { useImmer } from 'use-immer'
import { tequila } from '../../../api/wrapped-calls'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/wallet/logo.svg'
import { date2human } from '../../../commons/date.utils'
import { parseError } from '../../../commons/error.utils'
import { myst } from '../../../commons/myst.utils'
import page from '../../../commons/page'
import { strings } from '../../../commons/strings.utils'
import { toastError } from '../../../commons/toast.utils'
import Button from '../../../Components/Buttons/Button'
import { DownloadCSV } from '../../../Components/Download/DownloadCSV'
import { MobileRow } from '../../../Components/Table/MobileRow'
import Table, { PagingProps } from '../../../Components/Table/Table'
import { Header } from '../../../Components/Table/TableComponents'
import { CardLayout } from '../Components/Card/CardLayout'
import { Cards } from '../Components/Card/PreparedCards'
import { Layout } from '../Layout'
import { toCsv } from './settlement.mapper'
import styles from './WalletPage.module.scss'

interface State {
  isTableLoading: boolean
  page: number
  pageSize: number
  lastPage: number
  settlementResponse: SettlementListResponse
}

const EMPTY_RESPONSE = { items: [], totalPages: 0, page: 1, pageSize: 10, totalItems: 0 }

const WalletPage = () => {
  const { api } = tequila

  const [state, setState] = useImmer<State>({
    isTableLoading: true,
    lastPage: 1,
    page: 1,
    pageSize: 10,
    settlementResponse: EMPTY_RESPONSE,
  })

  const setLoading = (b: boolean = true) => {
    setState((d) => {
      d.isTableLoading = b
    })
  }
  const { items, withdrawalTotal } = state.settlementResponse

  useEffect(() => {
    fetchData()
  }, [state.page])

  const fetchData = async () => {
    try {
      setLoading()
      const settlements = await api.settlementHistory({ pageSize: state.pageSize, page: state.page })
      setState((d) => {
        d.lastPage = settlements.totalPages
        d.settlementResponse = settlements
      })
    } catch (err) {
      toastError(parseError(err))
    } finally {
      setLoading(false)
    }
  }

  const fetchDownloadData = async () => {
    const { totalItems } = await api.settlementHistory({ pageSize: 0 })
    return await api.settlementHistory({ pageSize: totalItems })
  }

  const handlePageChange = ({ pageSize, page }: PagingProps) => {
    setState((d) => {
      d.page = page
      d.pageSize = pageSize
    })
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
              <Cards.TotalWithdrawn amount={withdrawalTotal} />
              <Cards.EarningsCard />
            </CardLayout>
          </div>
          <Button onClick={() => page.refreshPage(5)}>Do Refresh</Button>
          <Table
            data={items}
            lastPage={state.lastPage}
            loading={state.isTableLoading}
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
