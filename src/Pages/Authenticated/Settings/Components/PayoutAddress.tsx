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

interface Props {
  beneficiary?: string
  providerId?: string
  hermesId?: string
  canSettle: boolean
}

interface State {
  beneficiary: string
}

const PayoutAddress = ({ beneficiary, providerId, hermesId, canSettle }: Props) => {
  const [state, setState] = useState<State>({
    beneficiary: beneficiary || '',
  })

  const { enqueueSnackbar } = useSnackbar()
  const saveDisabled = !providerId || !hermesId || !beneficiary
  return (
    <>
      <div className="input-group">
        <div className="flex-row">
          <div className="input-group__label m-t-5">Beneficiary wallet address</div>
          <CopyToClipboard text={beneficiary || ''} />
        </div>
        <TextField
          stateName="beneficiary"
          placeholder="0x..."
          disabled={!canSettle}
          handleChange={() => (e: React.ChangeEvent<HTMLInputElement>) => {
            setState({ ...state, beneficiary: e.target.value })
          }}
          value={state?.beneficiary}
        />
        {!canSettle && (
          <p className="input-group__help m-t-20" style={{ maxWidth: '100%' }}>
            To change the beneficiary address you need to have earned at least a little bit of MYST to be able to settle
            your earnings.
          </p>
        )}
      </div>
      <div className="footer__buttons m-t-40">
        {canSettle && (
          <Button
            onClick={() => {
              tequilapiClient
                .settleWithBeneficiary({
                  providerId: providerId || '',
                  hermesId: hermesId || '',
                  beneficiary: state.beneficiary || '',
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
            disabled={saveDisabled}
          >
            Save
          </Button>
        )}
      </div>
    </>
  )
}

export default PayoutAddress
