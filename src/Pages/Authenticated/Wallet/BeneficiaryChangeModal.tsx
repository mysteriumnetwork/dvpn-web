/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import { Fade, Modal } from '@material-ui/core'
import './WalletModel.scss'

import Button from '../../../Components/Buttons/Button'
import { TextField } from '../../../Components/TextField/TextField'

interface Props {
  isOpen: boolean
  onClose: () => void
  identityId: string
  beneficiary?: string
}

interface State {
  beneficiary: string
}

const BeneficiaryChangeModal = ({ isOpen, onClose, beneficiary, identityId }: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [state, setState] = useState<State>({
    beneficiary: '',
  })
  useEffect(() => {
    setState((cs) => ({ ...cs, beneficiary: beneficiary || '' }))
  }, [beneficiary])

  const handleTextFieldsChange = (value: string) => {
    setState((cs) => ({ ...cs, value: value }))
  }

  const updateBeneficiary = () => {
    /*    setIsLoading(true)
    tequilapiClient
      .updateIdentityPayout(identityId, state.beneficiary)
      .then(() => {
        enqueueSnackbar('Beneficiary address changed', { variant: 'success' })
        onClose()
      })
      .catch((err) => {
        const msg = parseError(err)
        enqueueSnackbar(msg || 'Beneficiary update failed', { variant: 'error' })
        console.log(err)
      })
      .finally(() => setIsLoading(false))*/
  }

  return (
    <Modal
      className="settings-modal"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      disableAutoFocus={true}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className="wallet-modal--block">
          <div className="title">Update beneficiary address</div>
          <div className="settings">
            <TextField onChange={handleTextFieldsChange} value={state.beneficiary} defaultValue={{}} />
          </div>
          <div className="buttons-block">
            <Button
              onClick={() => {
                onClose()
              }}
              className="button btn close"
            >
              Close
            </Button>
            <Button onClick={updateBeneficiary} isLoading={isLoading}>
              Save
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default BeneficiaryChangeModal
