/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CircularProgress } from '@material-ui/core'
import { Identity } from 'mysterium-vpn-js'
import React, { useEffect, useState } from 'react'
import { tequilapiClient } from '../../../../api/TequilApiClient'
import { parseError } from '../../../../commons/error.utils'
import { toastError, toastSuccess } from '../../../../commons/toast.utils'
import Button from '../../../../Components/Buttons/Button'
import CopyToClipboard from '../../../../Components/CopyToClipboard/CopyToClipboard'
import { TextField } from '../../../../Components/TextField'
import './PayoutAddress.scss'

interface Props {
  identity?: Identity
}

interface State {
  payoutAddress: string
  initialPayoutAddress: string
  txPending: boolean
  errorMessage: string
  loading: boolean
}

const PayoutAddress = ({ identity }: Props) => {
  const [state, setState] = useState<State>({
    initialPayoutAddress: '',
    payoutAddress: '',
    txPending: false,
    errorMessage: '',
    loading: true,
  })

  useEffect(() => {
    tequilapiClient
      .payoutAddressGet(identity?.id || '')
      .then(({ address }) => setState((cs) => ({ ...cs, payoutAddress: address, initialPayoutAddress: address })))
      .catch(() => {}) // address may not exist
      .finally(() => setState((cs) => ({ ...cs, loading: false })))
  }, [identity?.id])

  if (state.loading) {
    return <CircularProgress className="spinner" disableShrink />
  }

  return (
    <>
      <div className="input-group">
        <div className="flex-row">
          <div className="input-group__label m-t-5">Bounty Payout Address</div>
          <CopyToClipboard text={state.payoutAddress} />
        </div>
        <TextField
          stateName="payoutAddress"
          placeholder="0x..."
          handleChange={() => (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target
            setState((cs) => ({ ...cs, payoutAddress: value }))
          }}
          value={state.payoutAddress}
        />

        <p className="input-group__help m-t-20" style={{ maxWidth: '100%' }}>
          Make sure you enter ERC-20 compatible wallet or MYST compatible exchange wallet address.
        </p>
        {state.errorMessage && <p className="error">{state.errorMessage}</p>}
      </div>
      <div className="footer__buttons m-t-40">
        <Button
          isLoading={state.txPending}
          disabled={
            state.payoutAddress === state.initialPayoutAddress ||
            state.payoutAddress === '' ||
            state.payoutAddress.length < 42
          }
          onClick={() => {
            Promise.resolve()
              .then(() => setState((cs) => ({ ...cs, txPending: true })))
              .then(() => tequilapiClient.payoutAddressSave(identity?.id || '', state.payoutAddress))
              .then(() => setState((cs) => ({ ...cs, txPending: false, initialPayoutAddress: cs.payoutAddress })))
              .then(() => toastSuccess('Bounty Payout Address updated'))
              .catch((err) => toastError(parseError(err)))
              .finally(() => setState((cs) => ({ ...cs, txPending: false })))
          }}
        >
          Save
        </Button>
      </div>
    </>
  )
}

export default PayoutAddress
