/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TequilapiError } from 'mysterium-vpn-js'
import React, { useEffect } from 'react'
import { tequilapiClient } from '../../../../api/TequilApiClient'
import { toastSuccess } from '../../../../commons/toast.utils'

import Button from '../../../../Components/Buttons/Button'
import { TextField } from '../../../../Components/TextField'
import Errors from '../../../../Components/Validation/Errors'

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
  const [state, setState] = React.useState<StateInterface>({
    apiKey: '',
    error: false,
    errorMessage: '',
  })

  useEffect(() => {
    setState((cs) => ({ ...cs, apiKey: apiKey }))
  }, [apiKey])
  const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setState((cs) => ({ ...cs, [prop]: value }))
  }

  const getValidationMessage = (response: any): string => {
    return response?.data?.errors['api_key'][0]?.message || 'Validation error'
  }

  const handleSubmitToken = async () => {
    setState((cs) => ({ ...cs, error: false }))

    tequilapiClient
      .setMMNApiKey(state.apiKey)
      .then(() => {
        setState((cs) => ({ ...cs, error: false, errorMessage: '' }))
        toastSuccess('MMN API key updated. Refresh the dashboard to view the bounty report.')
      })
      .catch((error: Error) => {
        if (error instanceof TequilapiError) {
          const apiError = getValidationMessage(error._originalError.response)
          setState((cs) => ({ ...cs, error: true, errorMessage: apiError }))
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
