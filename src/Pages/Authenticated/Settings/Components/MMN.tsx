/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { tequilapiClient } from '../../../../api/TequilApiClient'
import { parseError } from '../../../../commons/error.utils'
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
  const [state, setState] = useImmer<StateInterface>({
    apiKey: '',
    error: false,
    errorMessage: '',
  })

  useEffect(() => {
    setState((d) => {
      d.apiKey = apiKey
    })
  }, [apiKey])

  const handleSubmitToken = async () => {
    setState((d) => {
      d.error = false
    })

    tequilapiClient
      .setMMNApiKey(state.apiKey)
      .then(() => {
        setState((cs) => {
          cs.error = false
          cs.errorMessage = ''
        })
        toastSuccess('MMN API key updated. Refresh the dashboard to view the bounty report.')
      })
      .catch((error) =>
        setState((d) => {
          d.error = true
          d.errorMessage = parseError(error, 'Validation Error')
        }),
      )
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
        <TextField
          stateName={'apiKey'}
          id={'api_key'}
          handleChange={(prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target
            setState((d) => {
              d.apiKey = value
            })
          }}
          value={state.apiKey}
        />
      </div>
      <div className="footer__buttons m-t-40">
        <Button onClick={handleSubmitToken}>Save</Button>
      </div>
    </div>
  )
}

export default MMN
