/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react'
import CopyToClipboard from '../../../../Components/CopyToClipboard/CopyToClipboard'
import { TextField } from '../../../../Components/TextField'
import Button from '../../../../Components/Buttons/Button'
import { useSnackbar } from 'notistack'
import { tequilapiClient } from '../../../../api/TequilApiClient'
import { parseError } from '../../../../commons/error.utils'
import { currentCurrency, displayMyst } from '../../../../commons/money.utils'
import { Fees, Identity } from 'mysterium-vpn-js'

interface Props {
  identity: Identity
  beneficiary: string
  hermesId: string
  fees: Fees
}

interface State {
  beneficiary: string
}

const timestampKey = 'lastBeneficiaryChange'
const minute = 1000 * 60
const isSettleAllowed = (identity: Identity, fees: Fees): boolean => {
  console.log(identity?.earnings - fees?.settlement)
  return identity?.earnings - fees?.settlement > 0
}

const isSettleInProgress = () => {
  const lastChange = parseInt(localStorage.getItem(timestampKey) || '0')
  return Date.now() - 3 * minute < lastChange
}

const PayoutAddress = ({ beneficiary, identity, hermesId, fees }: Props) => {
  const [state, setState] = useState<State>({
    beneficiary: beneficiary,
  })
  const [txInProgress, setTxInProgress] = useState<boolean>(isSettleInProgress())

  const canSettle = isSettleAllowed(identity, fees)
  const totalFees = fees.settlement + fees.hermes

  const { enqueueSnackbar } = useSnackbar()
  return (
    <>
      <div className="input-group">
        <div className="flex-row">
          <div className="input-group__label m-t-5">Beneficiary wallet address</div>
          <CopyToClipboard text={beneficiary} />
        </div>
        <TextField
          stateName="beneficiary"
          placeholder="0x..."
          disabled={!canSettle}
          handleChange={() => (e: React.ChangeEvent<HTMLInputElement>) => {
            setState({ ...state, beneficiary: e.target.value })
          }}
          value={state.beneficiary}
        />

        <p className="input-group__help m-t-20" style={{ maxWidth: '100%' }}>
          {`To change the beneficiary address you need to have earned some ${currentCurrency()} (approx. ${displayMyst(
            totalFees,
          )}) to be able to settle
            your earnings. Please note that it can take up to 5 minutes to settle.`}
        </p>
      </div>
      <div className="footer__buttons m-t-40">
        {!canSettle && (
          <Button
            isLoading={txInProgress}
            onClick={() => {
              tequilapiClient
                .settleWithBeneficiary({
                  providerId: identity.id,
                  hermesId: hermesId,
                  beneficiary: state.beneficiary,
                })
                .then(() => {
                  enqueueSnackbar('Settlement with beneficiary change submitted!', { variant: 'success' })
                  localStorage.setItem(timestampKey, Date.now().toString())
                  setTxInProgress(isSettleInProgress)
                })
                .catch((errResponse) => {
                  enqueueSnackbar(parseError(errResponse), {
                    variant: 'error',
                  })
                })
            }}
          >
            Save
          </Button>
        )}
      </div>
    </>
  )
}

export default PayoutAddress
