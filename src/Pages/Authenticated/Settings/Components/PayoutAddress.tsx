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
import { Fees } from 'mysterium-vpn-js'

interface Props {
  beneficiary: string
  providerId: string
  hermesId: string
  canSettle: boolean
  fees: Fees
}

interface State {
  beneficiary: string
}

const PayoutAddress = ({ beneficiary, providerId, hermesId, canSettle, fees }: Props) => {
  const [state, setState] = useState<State>({
    beneficiary: beneficiary,
  })
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
        {canSettle && (
          <Button
            onClick={() => {
              tequilapiClient
                .settleWithBeneficiary({
                  providerId: providerId,
                  hermesId: hermesId,
                  beneficiary: state.beneficiary,
                })
                .then(() =>
                  enqueueSnackbar('Settlement with beneficiary change submitted!', {
                    variant: 'success',
                  }),
                )
                .catch((errResponse) => {
                  const msg = parseError(errResponse)
                  enqueueSnackbar(msg, {
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
