/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useMemo } from 'react'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/wallet/logo.svg'
import { Layout } from '../Layout'
import { SettlementListResponse } from 'mysterium-vpn-js'
import { useImmer } from 'use-immer'
import { api } from '../../../api/Api'
import { toastError } from '../../../commons/toast.utils'
import { parseError } from '../../../commons/error.utils'
import TableV3 from '../../../Components/Table/TableV2'
import { Column, Row } from 'react-table'
import { date2human } from '../../../commons/date.utils'
import { displayMyst } from '../../../commons/money.utils'
import { Settlement } from 'mysterium-vpn-js/lib/transactor/settlement'
import { MobileRow } from '../../../Components/Table/MobileRow'
import { strings } from '../../../commons/strings.utils'
import { CardLayout } from '../Components/Card/CardLayout'
import { Cards } from '../Components/Card/PreparedCards'

interface State {
  isLoading: boolean
  lastPage: number
  settlementResponse: SettlementListResponse
}

const EMPTY_RESPONSE = { items: [], totalPages: 0, page: 1, pageSize: 50, totalItems: 0 }

const Wallet = () => {
  const [state, setState] = useImmer<State>({
    isLoading: true,
    lastPage: 1,
    settlementResponse: EMPTY_RESPONSE,
  })

  const setLoading = (b: boolean = true) => {
    setState((d) => {
      d.isLoading = b
    })
  }
  const { items, withdrawalTotal } = state.settlementResponse
  const fetchData = async ({ pageSize, page }: { pageSize: number; page: number }) => {
    try {
      setLoading()
      const settlements = await api.settlementHistory({ pageSize, page })
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
        Header: 'Beneficiary',
        accessor: 'beneficiary',
        width: 25,
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
        Header: 'Fee',
        accessor: 'fees',
        width: 10,
        Cell: ({ value }) => {
          return displayMyst(value)
        },
      },
      {
        Header: 'Received Amount',
        accessor: 'amount',
        width: 10,
        Cell: ({ value }) => {
          return displayMyst(value)
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
          <TableV3
            data={items}
            lastPage={state.lastPage}
            loading={state.isLoading}
            fetchData={fetchData}
            columns={columns}
            mobileRow={(row: Row<Settlement>, index) => {
              const { settledAt, txHash, fees, amount, beneficiary } = row.original
              return (
                <MobileRow
                  key={index}
                  topLeft={date2human(settledAt)}
                  topLeftSub={strings.truncateHash(txHash)}
                  topRightSub={strings.truncateHash(beneficiary)}
                  bottomLeft={displayMyst(fees)}
                  bottomRight={displayMyst(amount)}
                />
              )
            }}
          />
        </>
      }
    />
  )
}

export default Wallet
