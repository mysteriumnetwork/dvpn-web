/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { TequilapiError } from 'mysterium-vpn-js'

import Button from '../../../../Components/Buttons/Button'
import Errors from '../../../../Components/Validation/Errors'
import { tequilapiClient } from '../../../../api/TequilApiClient'
import { TextField } from '../../../../Components/TextField'

interface StateInterface {
  apiKey: string
  error: boolean
  errorMessage: string
}

interface Props {
  apiKey: string
  mmnUrl: string
}

const MMN = ({ apiKey, mmnUrl }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = React.useState<StateInterface>({
    apiKey: '',
    error: false,
    errorMessage: '',
  })

  useEffect(() => {
    setState({ ...state, apiKey: apiKey })
  }, [apiKey])
  const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [prop]: event.target.value })
  }

  const getValidationMessage = (response: any): string => {
    return response.data?.errors['api_key'][0]?.message || 'Validation error'
  }

  const handleSubmitToken = () => {
    setState({ ...state, error: false })

    tequilapiClient
      .setMMNApiKey(state.apiKey)
      .then(() => {
        setState({ ...state, error: false, errorMessage: '' })
        enqueueSnackbar('MMN API key updated.', { variant: 'success' })
      })
      .catch((error: Error) => {
        if (error instanceof TequilapiError) {
          const apiError = getValidationMessage(error._originalError.response)
          setState({ ...state, error: true, errorMessage: apiError })
        }
      })
  }

  const link = (
    <a href={`${mmnUrl}/user/profile`} target="_blank" rel="noopener noreferrer">
      Get it here
    </a>
  )
  return (
    <div>
      <Errors error={state.error} errorMessage={state.errorMessage} />

      <div className="input-group">
        <div className="input-group__label">API Key ({link})</div>
        <TextField stateName={'apiKey'} id={'api_key'} handleChange={handleTextFieldsChange} value={state.apiKey} />
      </div>
      <div className="footer__buttons m-t-40">
        <Button onClick={handleSubmitToken}>Save</Button>
      </div>
    </div>
  )
}

export default MMN
