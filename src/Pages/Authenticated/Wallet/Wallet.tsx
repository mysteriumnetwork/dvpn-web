/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Fees, Identity } from 'mysterium-vpn-js'
import { Settlement } from 'mysterium-vpn-js'
import { SettlementListResponse } from 'mysterium-vpn-js/lib/transactor/settlement'
import { CircularProgress } from '@material-ui/core'

import Header from '../../../Components/Header'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/wallet/logo.svg'
import Table, { TableRow } from '../../../Components/Table/Table'
import { displayMyst } from '../../../commons/money.utils'
import { RootState } from '../../../redux/store'
import { tequilapiClient } from '../../../api/TequilApiClient'

import './Wallet.scss'
import Button from '../../../Components/Buttons/Button'
import SettlementModal from './SettlementModal'
import { parseError } from '../../../commons/error.utils'
import { useSnackbar } from 'notistack'
import * as config from '../../../commons/config'
import { date2human } from '../../../commons/date.utils'
import { currentIdentity } from '../../../redux/app.slice'
import * as sseSlice from '../../../redux/sse.slice'
import WalletSidebar from './WalletSidebar'

interface State {
  unsettledEarnings: number
  isBeneficiaryModalOpen: boolean
  settlementResponse?: SettlementListResponse
  pageSize: number
  currentPage: number
}

interface SettlementState {
  loading: boolean
  modalOpen: boolean
  fees?: Fees
}

const row = (s: Settlement, etherscanTxUrl: string): TableRow => {
  const cells = [
    {
      className: 'w-20',
      content: date2human(s.settledAt),
    },
    {
      className: 'w-40',
      content: s.beneficiary,
    },
    {
      className: 'w-10',
      content: <a href={`${etherscanTxUrl}/${s.txHash}`}>{s.txHash.substr(s.txHash.length - 8)}</a>,
    },
    {
      className: 'w-15',
      content: displayMyst(s.fees),
    },
    {
      className: 'w-15',
      content: displayMyst(s.amount),
    },
  ]

  return {
    key: s.txHash,
    cells: cells,
  }
}

const Wallet = () => {
  const identity = useSelector<RootState, Identity | undefined>(({ app, sse }) =>
    currentIdentity(app.currentIdentityRef, sse.appState?.identities),
  )
  const etherscanTxUrl = useSelector<RootState, string>(({ app }) => config.etherscanTxUrl(app.config))
  const hermesId = useSelector<RootState, string | undefined>(({ app }) => config.hermesId(app.config))
  const beneficiary = useSelector<RootState, string>(({ sse }) => sseSlice.beneficiary(sse))

  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = useState<State>({
    unsettledEarnings: 0,
    isBeneficiaryModalOpen: false,
    pageSize: 10,
    currentPage: 1,
  })
  const [settlementState, setSettlementState] = useState<SettlementState>({
    loading: false,
    modalOpen: false,
  })

  useEffect(() => {
    tequilapiClient
      .settlementHistory({ pageSize: state.pageSize, page: state.currentPage })
      .then((settlementResponse) => {
        setState((cs) => ({
          ...cs,
          settlementResponse: settlementResponse,
        }))
      })
  }, [state.pageSize, state.currentPage])

  if (!identity || !hermesId) {
    return <CircularProgress className="spinner" disableShrink />
  }

  const handlePrevPageButtonClick = () => {
    setState((cs) => ({ ...cs, currentPage: state.currentPage - 1 }))
  }

  const handleNextPageButtonClick = () => {
    setState((cs) => ({
      ...cs,
      currentPage: state.currentPage + 1,
    }))
  }

  const onPageClicked = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
    setState((cs) => ({ ...cs, currentPage: pageNumber }))
  }

  const { items = [], totalPages = 0 } = { ...state?.settlementResponse }

  return (
    <div className="main">
      <div className="main-block main-block--split">
        <Header logo={Logo} name="Wallet" />

        <div className="wallet__earnings">
          <div className="earnings">
            <p className="earnings__value">{displayMyst(identity.earnings)}</p>
            <p className="earnings__label">Unsettled Earnings</p>
          </div>
          <div>
            <Button
              className="wallet-settle-button"
              isLoading={settlementState.loading}
              onClick={() => {
                Promise.all([setSettlementState({ ...settlementState, loading: true })])
                  .then(() => tequilapiClient.transactorFees())
                  .then((fees) => {
                    setSettlementState({
                      ...settlementState,
                      modalOpen: true,
                      loading: false,
                      fees: fees,
                    })
                  })
                  .catch((err) => {
                    enqueueSnackbar('Error: ' + parseError(err), { variant: 'error' })
                    setSettlementState({ ...settlementState, loading: false })
                  })
              }}
            >
              Settle Now
            </Button>
          </div>
        </div>

        <Table
          headers={[
            { name: 'Date', className: 'w-20' },
            { name: 'Beneficiary', className: 'w-40' },
            { name: 'Transaction ID', className: 'w-10' },
            { name: 'Fee', className: 'w-15' },
            { name: 'Received Amount', className: 'w-15' },
          ]}
          rows={(items || []).map((i) => row(i, etherscanTxUrl))}
          currentPage={state.currentPage}
          lastPage={totalPages}
          handlePrevPageButtonClick={handlePrevPageButtonClick}
          handleNextPageButtonClick={handleNextPageButtonClick}
          onPageClick={onPageClicked}
        />
      </div>

      <SettlementModal
        unsettledEarnings={identity.earnings}
        fees={settlementState.fees}
        open={settlementState.modalOpen}
        beneficiary={beneficiary}
        onClose={() => {
          setSettlementState({ ...settlementState, modalOpen: false })
        }}
        onSettle={() => {
          setSettlementState({ ...settlementState, modalOpen: false })
          tequilapiClient.settleAsync({ providerId: identity.id, hermesId: hermesId })
        }}
      />

      <div className="sidebar-block">
        <WalletSidebar beneficiary={beneficiary} identity={identity} hermesId={hermesId} />
      </div>
    </div>
  )
}

export default Wallet
