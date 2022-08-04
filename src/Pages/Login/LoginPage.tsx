/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react'
import { tequila } from '../../api/tequila'
import { DEFAULT_USERNAME } from '../../constants/defaults'

import { updateAuthenticatedStore } from '../../redux/app.slice'
import { store } from '../../redux/store'
import styled from 'styled-components'
import { InputGroup } from '../../Components/Inputs/InputGroup'
import { TextField } from '../../Components/Inputs/TextField'
import { Form } from '../../Components/Inputs/Form'
import { Button } from '../../Components/Inputs/Button'
import { toast } from 'react-toastify'
import errors from '../../commons/errors'

const { api } = tequila

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface Props {
  onSuccess: () => void
}

const LoginPage = ({ onSuccess }: Props) => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePassword = (value: string) => setPassword(value)

  const handleLogin = async () => {
    try {
      setLoading(true)
      await api.authLogin({
        username: DEFAULT_USERNAME,
        password: password,
      })
      store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false }))
      await onSuccess()
    } catch (err: any) {
      toast.error(errors.apiError(err).human())
    } finally {
      setLoading(false)
    }
  }
  return (
    <Page>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <InputGroup input={<TextField type="password" value={password} onChange={handlePassword} />} />
        <Button type="submit" variant="primary" label="Login" loading={loading} />
      </Form>
    </Page>
  )
}

export default LoginPage
