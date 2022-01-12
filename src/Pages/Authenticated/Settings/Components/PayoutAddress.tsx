/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CircularProgress } from '@material-ui/core'
import { Identity } from 'mysterium-vpn-js'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { tequilaClient } from '../../../../api/tequila-client'
import { parseError } from '../../../../commons/error.utils'
import { toastError, toastSuccess } from '../../../../commons/toast.utils'
import Button from '../../../../Components/Buttons/Button'
import CopyToClipboard from '../../../../Components/CopyToClipboard/CopyToClipboard'
import { TextField } from '../../../../Components/TextField/TextField'
import './PayoutAddress.scss'
import classNames from 'classnames'
import styles from './Components.module.scss'

interface Props {
  identity: Identity
}

interface State {
  payoutAddress: string
  initialPayoutAddress: string
  txPending: boolean
  errorMessage: string
  loading: boolean
}

const PayoutAddress = ({ identity }: Props) => {
  const [state, setState] = useImmer<State>({
    initialPayoutAddress: '',
    payoutAddress: '',
    txPending: false,
    errorMessage: '',
    loading: true,
  })

  useEffect(() => {
    tequilaClient
      .payoutAddressGet(identity.id)
      .then(({ address }) =>
        setState((d) => {
          d.payoutAddress = address
          d.initialPayoutAddress = address
          d.loading = false
        }),
      )
      .catch(() => {
        setState((d) => {
          d.loading = false
        })
      }) // address may not exist
  }, [identity.id])

  const handlePayoutAddressChange = () => {
    setState((d) => {
      d.txPending = true
    })
    tequilaClient
      .payoutAddressSave(identity.id, state.payoutAddress)
      .then((res) => {
        setState((d) => {
          d.txPending = false
          d.initialPayoutAddress = res.address
        })
        toastSuccess('Default Withdrawal Address updated')
      })
      .catch((err) => {
        setState((d) => {
          d.txPending = false
        })
        toastError(parseError(err))
      })
  }

  if (state.loading) {
    return <CircularProgress className="spinner" disableShrink />
  }

  return (
    <form onSubmit={handlePayoutAddressChange}>
      <div className="input-group">
        <div className={styles.row}>
          <div className="input-group__label m-t-5">Default Withdrawal Address</div>
          <CopyToClipboard text={state.payoutAddress} />
        </div>
        <TextField
          placeholder="0x..."
          onChange={(value) => {
            setState((d) => {
              d.payoutAddress = value
            })
          }}
          value={state.payoutAddress}
        />

        <p className="input-group__help m-t-20" style={{ maxWidth: '100%' }}>
          Make sure you enter ERC-20 compatible wallet or MYST compatible exchange wallet address.
        </p>
        {state.errorMessage && <p className="error">{state.errorMessage}</p>}
      </div>
      <div className={classNames(styles.buttons, 'm-t-40')}>
        <Button
          isLoading={state.txPending}
          disabled={
            state.payoutAddress === state.initialPayoutAddress ||
            state.payoutAddress === '' ||
            state.payoutAddress.length !== 42
          }
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  )
}

export default PayoutAddress
