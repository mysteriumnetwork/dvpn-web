/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import SettingsCard from './SettingsCard'
import { tequilapiClient } from '../../../api/TequilApiClient'
import { parseError } from '../../../commons/error.utils'
import StakeEditModal from './StakeEditModal'
import { displayMyst } from '../../../commons/money.utils'
import { Fees, Identity } from 'mysterium-vpn-js'
import { useSnackbar } from 'notistack'
import './Wallet.scss'
import TotalMystCard from './TotalMystCard'

interface Props {
  beneficiary: string
  identity: Identity
  hermesId: string
}

interface State {
  totalMyst: number
}

interface StakeEditState {
  modalOpen: boolean
  loading: boolean
  fees?: Fees
}

const WalletSidebar = ({ beneficiary, identity, hermesId }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [stakeEditState, setStakeEditState] = useState<StakeEditState>({
    modalOpen: false,
    loading: false,
  })
  const [state, setState] = useState<State>({
    totalMyst: 0,
  })

  useEffect(() => {
    tequilapiClient
      .sessionStatsAggregated()
      .then((resp) => setState({ ...state, totalMyst: resp.stats.sumTokens }))
      .catch((err) => enqueueSnackbar(parseError(err), { variant: 'error' }))
  }, [])

  const autoThresholdInfo = () => {
    const number = displayMyst(identity.stake * 0.9)
    return number ? `${number} MYST (90% of max settlement amount)` : 'You have no stake'
  }

  return (
    <>
      <div className="wallet-sidebar">
        <SettingsCard
          header="Payout Beneficiary address"
          contentHeader={beneficiary}
          isContentLoading={!beneficiary}
          content={
            <>
              <div>This is where you will get paid your ETH. Don't have a wallet?</div>
              {/*<p className="m-t-10">*/}
              {/*    <a href="#">Get it here.</a>*/}
              {/*</p>*/}
            </>
          }
        />

        <SettingsCard
          header="Auto settlement threshold"
          contentHeader={autoThresholdInfo()}
          isButtonLoading={stakeEditState.loading}
          onEdit={() => {
            Promise.all([setStakeEditState({ ...stakeEditState, loading: true })])
              .then(() => tequilapiClient.transactorFees())
              .then((resp) =>
                setStakeEditState({
                  ...stakeEditState,
                  loading: false,
                  fees: resp,
                  modalOpen: true,
                }),
              )
              .catch((err) => {
                enqueueSnackbar('Error: ' + parseError(err), { variant: 'error' })
                setStakeEditState({ ...stakeEditState, loading: false })
              })
          }}
          content={
            <div>
              When unsettled earning will reach threshold node will do on-chain transaction and move funds into your
              beneficiary address.
            </div>
          }
        />
        <div className="flex-grow" />
        <div className="wallet-sidebar-footer">
          <TotalMystCard myst={state.totalMyst} />
        </div>
      </div>
      <StakeEditModal
        onDecreaseStake={(amount) => {
          return tequilapiClient.decreaseStake({
            amount: amount,
            id: identity.id,
          })
        }}
        onIncreaseStake={() => {
          return tequilapiClient.settleIntoStakeAsync({
            hermesId: hermesId,
            providerId: identity.id,
          })
        }}
        identity={identity}
        fees={stakeEditState.fees}
        isOpen={stakeEditState.modalOpen}
        onClose={() => {
          setStakeEditState({ ...stakeEditState, modalOpen: false })
        }}
      />
    </>
  )
}

export default WalletSidebar
