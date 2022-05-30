/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APIError } from 'mysterium-vpn-js'

import { tequila } from '../../../../api/wrapped-calls'
import { validatePassword } from '../../../../commons/passwords'
import toasts from '../../../../commons/toasts'
import Button from '../../../../Components/Buttons/Button'
import { TextField } from '../../../../Components/TextField/TextField'
import Error from '../../../../Components/Validation/Error'
import { DEFAULT_USERNAME } from '../../../../constants/defaults'
import styles from './Components.module.scss'
import classNames from 'classnames'
import React, { useState } from 'react'
import { InputGroup } from '../../../../Components/InputGroups/InputGroup'

const { toastSuccess } = toasts
const { api } = tequila

interface StateInterface {
  newPasswordConfirmation: string
  newPassword: string
  currentPassword: string
  error: boolean
  errorMessage: string
  loading: boolean
}

const defaultState = {
  newPasswordConfirmation: '',
  newPassword: '',
  currentPassword: '',
  error: false,
  errorMessage: '',
  loading: false,
}

const PasswordChange = () => {
  const [values, setValues] = useState<StateInterface>(defaultState)

  const handleSubmitPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValues((d) => ({ ...d, error: false }))

    const isPasswordValid = validatePassword(values.newPassword, values.newPasswordConfirmation)
    if (!isPasswordValid.success) {
      setValues((d) => ({ ...d, error: true, errorMessage: isPasswordValid.errorMessage }))

      return
    }
    setValues((d) => ({ ...d, loading: true }))
    api
      .authChangePassword({
        username: DEFAULT_USERNAME,
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
      .then(() => {
        setValues(defaultState)
        toastSuccess('Password changed.')
      })
      .catch((error: APIError) => {
        setValues({ ...values, error: true, errorMessage: error.message, loading: false })
      })
  }

  return (
    <form onSubmit={handleSubmitPassword}>
      <Error show={values.error} errorMessage={values.errorMessage} />

      <InputGroup label="Current password">
        <TextField
          onChange={(currentPassword) => setValues((d) => ({ ...d, currentPassword }))}
          type="password"
          placeholder={'*********'}
          value={values.currentPassword}
        />
      </InputGroup>
      <InputGroup label="New password">
        <TextField
          onChange={(newPassword) => setValues((d) => ({ ...d, newPassword }))}
          type="password"
          placeholder={'*********'}
          value={values.newPassword}
        />
      </InputGroup>
      <InputGroup label="Repeat password">
        <TextField
          onChange={(newPasswordConfirmation) => setValues((d) => ({ ...d, newPasswordConfirmation }))}
          type="password"
          placeholder={'*********'}
          value={values.newPasswordConfirmation}
        />
      </InputGroup>
      <div className={classNames(styles.buttons, 'm-t-40')}>
        <Button type="submit" isLoading={values.loading}>
          Save
        </Button>
      </div>
    </form>
  )
}

export default PasswordChange
