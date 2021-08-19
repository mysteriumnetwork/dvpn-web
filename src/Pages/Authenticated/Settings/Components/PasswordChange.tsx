/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TequilapiError } from 'mysterium-vpn-js'
import { toastSuccess } from '../../../../commons/toast.utils'
import Button from '../../../../Components/Buttons/Button'
import Errors from '../../../../Components/Validation/Errors'

import { tequilapiClient } from '../../../../api/TequilApiClient'
import { validatePassword } from '../../../../commons/password'
import { DEFAULT_USERNAME } from '../../../../constants/defaults'
import { TextField } from '../../../../Components/TextField'
import { useState } from 'react'

interface StateInterface {
  newPasswordConfirmation: string
  newPassword: string
  currentPassword: string
  error: boolean
  errorMessage: string
}

const defaultState = {
  newPasswordConfirmation: '',
  newPassword: '',
  currentPassword: '',
  error: false,
  errorMessage: '',
}

const PasswordChange = () => {
  const [values, setValues] = useState<StateInterface>(defaultState)

  const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValues((cs) => ({ ...cs, [prop]: value }))
  }

  const handleSubmitPassword = () => {
    setValues((cs) => ({ ...cs, error: false }))

    const isPasswordValid = validatePassword(values.newPassword, values.newPasswordConfirmation)
    if (!isPasswordValid.success) {
      setValues((cs) => ({ ...cs, error: true, errorMessage: isPasswordValid.errorMessage }))

      return
    }

    tequilapiClient
      .authChangePassword({
        username: DEFAULT_USERNAME,
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
      .then(() => {
        setValues(defaultState)
        toastSuccess('Password changed.')
      })
      .catch((error: Error) => {
        if (error instanceof TequilapiError) {
          const apiError = error as TequilapiError
          setValues({ ...values, error: true, errorMessage: apiError.message })
        }
      })
  }

  return (
    <div>
      <Errors error={values.error} errorMessage={values.errorMessage} />

      <div className="input-group">
        <div className="text-field-label">Current password</div>
        <TextField
          handleChange={handleTextFieldsChange}
          password={true}
          placeholder={'*********'}
          value={values.currentPassword}
          stateName="currentPassword"
        />
      </div>
      <div className="input-group">
        <div className="input-group__label">New password</div>
        <TextField
          handleChange={handleTextFieldsChange}
          password={true}
          placeholder={'*********'}
          value={values.newPassword}
          stateName="newPassword"
        />
      </div>
      <div className="input-group">
        <div className="input-group__label">Repeat password</div>
        <TextField
          handleChange={handleTextFieldsChange}
          password={true}
          placeholder={'*********'}
          value={values.newPasswordConfirmation}
          stateName="newPasswordConfirmation"
        />
      </div>
      <div className="footer__buttons m-t-40">
        <Button onClick={handleSubmitPassword}>Save</Button>
      </div>
    </div>
  )
}

export default PasswordChange
