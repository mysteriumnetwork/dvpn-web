/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TequilapiError } from 'mysterium-vpn-js'
import { useImmer } from 'use-immer'

import { tequilapiClient } from '../../../../api/TequilApiClient'
import { validatePassword } from '../../../../commons/password'
import { toastSuccess } from '../../../../commons/toast.utils'
import Button from '../../../../Components/Buttons/Button'
import { TextField } from '../../../../Components/TextField/TextField'
import Errors from '../../../../Components/Validation/Errors'
import { DEFAULT_USERNAME } from '../../../../constants/defaults'

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
  const [values, setValues] = useImmer<StateInterface>(defaultState)

  const handleSubmitPassword = () => {
    setValues((d) => {
      d.error = false
    })

    const isPasswordValid = validatePassword(values.newPassword, values.newPasswordConfirmation)
    if (!isPasswordValid.success) {
      setValues((d) => {
        d.error = true
        d.errorMessage = isPasswordValid.errorMessage
      })

      return
    }
    setValues((d) => {
      d.loading = true
    })
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
          setValues({ ...values, error: true, errorMessage: apiError.message, loading: false })
        }
      })
  }

  return (
    <form onSubmit={handleSubmitPassword}>
      <Errors error={values.error} errorMessage={values.errorMessage} />

      <div className="input-group">
        <div className="text-field-label">Current password</div>
        <TextField
          onChange={(value) => {
            setValues((d) => {
              d.currentPassword = value
            })
          }}
          type="password"
          placeholder={'*********'}
          value={values.currentPassword}
        />
      </div>
      <div className="input-group">
        <div className="input-group__label">New password</div>
        <TextField
          onChange={(value) => {
            setValues((d) => {
              d.newPassword = value
            })
          }}
          type="password"
          placeholder={'*********'}
          value={values.newPassword}
        />
      </div>
      <div className="input-group">
        <div className="input-group__label">Repeat password</div>
        <TextField
          onChange={(value) => {
            setValues((d) => {
              d.newPasswordConfirmation = value
            })
          }}
          type="password"
          placeholder={'*********'}
          value={values.newPasswordConfirmation}
        />
      </div>
      <div className="footer__buttons m-t-40">
        <Button type="submit" isLoading={values.loading}>
          Save
        </Button>
      </div>
    </form>
  )
}

export default PasswordChange
