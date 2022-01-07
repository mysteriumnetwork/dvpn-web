/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useMemo } from 'react'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/wallet/logo.svg'
import { Layout } from '../Layout'
import { SettlementListResponse, SettlementType } from 'mysterium-vpn-js'
import { useImmer } from 'use-immer'
import { toastError } from '../../../commons/toast.utils'
import { parseError } from '../../../commons/error.utils'
import Table, { PagingProps } from '../../../Components/Table/Table'
import { Column, Row } from 'react-table'
import { date2human } from '../../../commons/date.utils'
import { Settlement } from 'mysterium-vpn-js/lib/transactor/settlement'
import { MobileRow } from '../../../Components/Table/MobileRow'
import { strings } from '../../../commons/strings.utils'
import { CardLayout } from '../Components/Card/CardLayout'
import { Cards } from '../Components/Card/PreparedCards'
import { myst } from '../../../commons/myst.utils'
import { FilterBar, FilterItem } from '../../../Components/FilterBar/FilterBar'
import { Option, SelectV3 } from '../../../Components/Select/SelectV3'
import { Header } from '../../../Components/Table/TableComponents'
import { DownloadCSV } from '../../../Components/Download/DownloadCSV'
import { tequila } from '../../../api/ApiWrapper'

interface State {
  isTableLoading: boolean
  page: number
  pageSize: number
  lastPage: number
  filterTypes: Option[]
  settlementResponse: SettlementListResponse
}

const EMPTY_RESPONSE = { items: [], totalPages: 0, page: 1, pageSize: 10, totalItems: 0 }

const settlementTypeItems: Option[] = Object.entries(SettlementType).map(([k, v]) => ({ label: k, value: v }))

const WalletPage = () => {
  const { api } = tequila

  const [state, setState] = useImmer<State>({
    isTableLoading: true,
    lastPage: 1,
    filterTypes: [],
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
  }, [state.filterTypes, state.page])

  const fetchData = async () => {
    try {
      setLoading()
      const types = state.filterTypes.length === 2 ? [] : state.filterTypes.map((t) => t.value as SettlementType)
      const settlements = await api.settlementHistory({ pageSize: state.pageSize, page: state.page, types })
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

  const typeChange = (o: Option | Option[]) => {
    setState((d) => {
      d.filterTypes = o as Option[]
    })
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
        Header: (
          <Header
            name="Type"
            tooltip={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p>
                  Settlement - internal transaction for settling earnings to node's payment channel (withdrawable
                  Balance).
                </p>
                <p> Withdrawal - transfer from Balance to external wallet.</p>
              </div>
            }
          />
        ),
        accessor: 'isWithdrawal',
        width: 10,
        Cell: ({ value }) => {
          return value ? 'Withdrawal' : 'Settlement'
        },
      },
      {
        Header: 'Beneficiary',
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
                <p>For settlement transactions this fee includes 20% network fee plus blockchain transaction fees.</p>
                <p>For withdrawal transactions this fee includes blockchain transaction fees.</p>
              </div>
            }
          />
        ),
        accessor: 'fees',
        width: 10,
        Cell: ({ value }) => {
          return myst.displayMYST(value)
        },
      },
      {
        Header: 'Received Amount',
        accessor: 'amount',
        width: 10,
        Cell: ({ value }) => {
          return myst.displayMYST(value)
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
          <CardLayout>
            <Cards.Balance />
            <Cards.UnsettledEarnings />
            <Cards.TotalWithdrawn amount={withdrawalTotal} />
          </CardLayout>
          <FilterBar
            right={
              <DownloadCSV<SettlementListResponse>
                fetchData={async () => api.settlementHistory({ pageSize: state.settlementResponse.totalItems })}
                mapper={(data) => {
                  return 'test'
                }}
              />
            }
          >
            <FilterItem
              label="Type"
              component={
                <SelectV3
                  value={state.filterTypes}
                  options={settlementTypeItems}
                  onChange={typeChange}
                  isClearable
                  isMulti
                />
              }
            />
          </FilterBar>
          <Table
            data={items}
            lastPage={state.lastPage}
            loading={state.isTableLoading}
            columns={columns}
            pagination={{ pageSize: state.pageSize }}
            onPaginationChange={handlePageChange}
            mobileRow={(row: Row<Settlement>, index) => {
              const { settledAt, txHash, fees, amount, beneficiary } = row.original
              return (
                <MobileRow
                  key={index}
                  topLeft={date2human(settledAt)}
                  topLeftSub={strings.truncateHash(txHash)}
                  topRightSub={strings.truncateHash(beneficiary)}
                  bottomLeft={myst.displayMYST(fees)}
                  bottomRight={myst.displayMYST(amount)}
                />
              )
            }}
          />
        </>
      }
    />
  )
}

export default WalletPage
