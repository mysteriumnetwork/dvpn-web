/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import React, { useState } from 'react'
import { Form } from '../../../Components/Inputs/Form'
import { InputGroup } from '../../../Components/Inputs/InputGroup'
import { TextField } from '../../../Components/Inputs/TextField'
import { Button } from '../../../Components/Inputs/Button'
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../../../constants/defaults'
import { store } from '../../../redux/store'
import { updateAuthenticatedStore } from '../../../redux/app.slice'
import { tequila } from '../../../api/tequila'
import errors from '../../../commons/errors'
import toasts from '../../../commons/toasts'
import { validatePassword } from '../../../commons/passwords'
import { Checkbox } from '../../../Components/Inputs/Checkbox'
const { api } = tequila

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const useQuery = () => {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

interface State {
  password: string
  confirmPassword: string
  claim: boolean
  mmnApiKey: string
}

const INITIAL_STATE: State = {
  password: '',
  confirmPassword: '',
  claim: false,
  mmnApiKey: '',
}

export const PasswordPage = () => {
  const query = useQuery()
  const mmnApiKey = query.get('mmnApiKey')

  const [state, setState] = useState({
    ...INITIAL_STATE,
    claim: mmnApiKey !== null,
    mmnApiKey: mmnApiKey !== null ? mmnApiKey : '',
  })
  const [loading, setLoading] = useState(false)

  const handlePassword = (value: string) => setState((p) => ({ ...p, password: value }))
  const handleConfirmPassword = (value: string) => setState((p) => ({ ...p, confirmPassword: value }))
  const handleClaim = (value: boolean) => setState((p) => ({ ...p, claim: value }))
  const handleMmnApiKey = (value: string) => setState((p) => ({ ...p, mmnApiKey: value }))

  const handleSubmit = async () => {
    const validationResult = validatePassword(state.password, state.confirmPassword)
    if (!validationResult.success) {
      toasts.toastError(validationResult.errorMessage)
      return
    }

    try {
      setLoading(true)
      if (state.claim) {
        await api.setMMNApiKey(state.mmnApiKey)
      }

      await api.authChangePassword({
        username: DEFAULT_USERNAME,
        oldPassword: DEFAULT_PASSWORD,
        newPassword: state.password,
      })
      store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false }))
    } catch (err: any) {
      const apiError = errors.apiError(err)
      toasts.toastError(apiError.human())
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <Form onSubmit={handleSubmit}>
        <InputGroup
          title="Password"
          input={<TextField type="password" value={state.password} onChange={handlePassword} />}
        />
        <InputGroup
          title="Confirm password"
          input={<TextField type="password" value={state.confirmPassword} onChange={handleConfirmPassword} />}
        />
        <InputGroup
          title="MMN"
          input={<Checkbox checked={state.claim} onChange={handleClaim} disabled={mmnApiKey !== null} />}
        />
        {state.claim && (
          <InputGroup title="MMN API Key" input={<TextField value={state.mmnApiKey} onChange={handleMmnApiKey} />} />
        )}
        <Button
          variant="primary"
          loading={loading}
          label={state.claim ? 'Change Password & Claim' : 'Change Password'}
          type="submit"
        />
      </Form>
    </Page>
  )
}
