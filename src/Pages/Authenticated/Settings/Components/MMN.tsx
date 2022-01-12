/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { tequilaClient } from '../../../../api/tequila-client'
import { tequila } from '../../../../api/wrapped-calls'
import { parseError } from '../../../../commons/error.utils'
import { toastSuccess } from '../../../../commons/toast.utils'

import Button from '../../../../Components/Buttons/Button'
import { TextField } from '../../../../Components/TextField/TextField'
import Errors from '../../../../Components/Validation/Errors'
import styles from './Components.module.scss'
import classNames from 'classnames'

interface StateInterface {
  apiKey: string
  error: boolean
  errorMessage: string
  loading: boolean
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
    loading: false,
  })

  useEffect(() => {
    setState((d) => {
      d.apiKey = apiKey
    })
  }, [apiKey])

  const handleSubmitToken = async () => {
    setState((d) => {
      d.error = false
      d.loading = true
    })

    tequilaClient
      .setMMNApiKey(state.apiKey)
      .then(() => {
        setState((cs) => {
          cs.error = false
          cs.errorMessage = ''
          cs.loading = false
        })
        toastSuccess('MMN API key updated.')
      })
      .then(() => tequila.refreshStoreConfig())
      .catch((error) =>
        setState((d) => {
          d.error = true
          d.errorMessage = parseError(error, 'Validation Error')
          d.loading = false
        }),
      )
  }

  const link = (
    <a href={`${mmnUrl}/me`} target="_blank" rel="noopener noreferrer">
      Get it here
    </a>
  )
  return (
    <form onSubmit={handleSubmitToken}>
      <Errors error={state.error} errorMessage={state.errorMessage} />

      <div className="input-group">
        <div className="input-group__label">API Key ({link})</div>
        <TextField
          onChange={(value: string) => {
            setState((d) => {
              d.apiKey = value
            })
          }}
          value={state.apiKey}
        />
      </div>
      <div className={classNames(styles.buttons, 'm-t-40')}>
        <Button type="submit" isLoading={state.loading}>
          Save
        </Button>
      </div>
    </form>
  )
}

export default MMN
