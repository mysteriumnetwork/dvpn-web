/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import { TextField } from '../../../../../Components/Inputs/TextField'
import { InputLockIcon } from '../../../../../Components/Icons/InputIcons'
import { SettingsCard } from '../../SettingsCard'
import { Button } from '../../../../../Components/Inputs/Button'
import { Form } from '../../../../../Components/Inputs/Form'
import styled from 'styled-components'
import { useState } from 'react'
import toasts from '../../../../../commons/toasts'
import { tequila } from '../../../../../api/tequila'
import { DEFAULT_USERNAME } from '../../../../../constants/defaults'
import errors from '../../../../../commons/errors'
import { validatePassword } from '../../../../../commons/passwords'

const { api } = tequila

const Row = styled.div`
  display: flex;
  gap: 20px;
`

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

interface FormState {
  oldPassword: string
  newPassword: string
  repeatNewPassword: string
}

const DEFAULT_FORM: FormState = {
  oldPassword: '',
  newPassword: '',
  repeatNewPassword: '',
}

export const PasswordChange = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [form, setForm] = useState<FormState>(DEFAULT_FORM)

  const handleOldPassword = (v: string) => setForm((p) => ({ ...p, oldPassword: v }))
  const handleNewPassword = (v: string) => setForm((p) => ({ ...p, newPassword: v }))
  const handleRepeatNewPassword = (v: string) => setForm((p) => ({ ...p, repeatNewPassword: v }))
  const handlePasswordChange = async () => {
    const validation = validatePassword(form.newPassword, form.repeatNewPassword)

    if (!validation.success) {
      toasts.toastError(validation.errorMessage)
      return
    }

    setLoading(true)
    try {
      await api.authChangePassword({
        username: DEFAULT_USERNAME,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      })
      setForm(DEFAULT_FORM)
      toasts.toastSuccess('Password changed')
    } catch (err: any) {
      errors.parseToastError(err)
    }

    setLoading(false)
  }

  return (
    <SettingsCard
      footer={<Button loading={loading} onClick={handlePasswordChange} variant="secondary" label="Update Password" />}
      title="Change Password"
    >
      <Form onSubmit={handlePasswordChange}>
        <FormContent>
          <Row>
            <InputGroup
              fluid
              title="Current password"
              input={
                <TextField
                  type="password"
                  value={form.oldPassword}
                  onChange={handleOldPassword}
                  icon={<InputLockIcon />}
                />
              }
            />
            <InputGroup title="" fluid input={null} />
          </Row>
          <Row>
            <InputGroup
              fluid
              title="New password"
              input={
                <TextField
                  type="password"
                  value={form.newPassword}
                  onChange={handleNewPassword}
                  icon={<InputLockIcon />}
                />
              }
            />
            <InputGroup
              fluid
              title="Confirm new password"
              input={
                <TextField
                  type="password"
                  value={form.repeatNewPassword}
                  onChange={handleRepeatNewPassword}
                  icon={<InputLockIcon />}
                />
              }
            />
          </Row>
        </FormContent>
      </Form>
    </SettingsCard>
  )
}
