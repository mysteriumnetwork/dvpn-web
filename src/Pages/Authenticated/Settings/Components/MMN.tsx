/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import { tequila } from '../../../../api/wrapped-calls'
import { parseError } from '../../../../commons/errors'
import toasts from '../../../../commons/toasts'

import Button from '../../../../Components/Buttons/Button'
import { TextField } from '../../../../Components/TextField/TextField'
import Error from '../../../../Components/Validation/Error'
import styles from './Components.module.scss'
import classNames from 'classnames'
import { InputGroup } from '../../../../Components/InputGroups/InputGroup'

const { toastSuccess } = toasts
const { api } = tequila

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
  const [state, setState] = useState<StateInterface>({
    apiKey: '',
    error: false,
    errorMessage: '',
    loading: false,
  })

  useEffect(() => {
    setState((d) => ({ ...d, apiKey: apiKey }))
  }, [apiKey])

  const handleSubmitToken = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState((d) => ({ ...d, error: false, loading: true }))

    api
      .setMMNApiKey(state.apiKey)
      .then(() => {
        setState((cs) => ({ ...cs, error: false, errorMessage: '', loading: false }))
        toastSuccess('MMN API key updated.')
      })
      .then(() => tequila.refreshStoreConfig())
      .catch((error) =>
        setState((d) => ({ ...d, error: true, errorMessage: parseError(error, 'Validation Error'), loading: false })),
      )
  }

  const link = (
    <a href={`${mmnUrl}/me`} target="_blank" rel="noopener noreferrer">
      Get it here
    </a>
  )
  return (
    <form onSubmit={handleSubmitToken}>
      <Error show={state.error} errorMessage={state.errorMessage} />
      <InputGroup label={<span>API Key ({link})</span>}>
        <TextField onChange={(apiKey: string) => setState((d) => ({ ...d, apiKey }))} value={state.apiKey} />
      </InputGroup>
      <div className={classNames(styles.buttons, 'm-t-40')}>
        <Button type="submit" isLoading={state.loading}>
          Save
        </Button>
      </div>
    </form>
  )
}

export default MMN
