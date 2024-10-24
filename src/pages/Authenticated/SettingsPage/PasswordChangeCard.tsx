/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import Card from '../../../components/Cards/Card'
import Button from '../../../components/Buttons/Button'
import { Form } from '../../../components/Inputs/Form'
import { PasswordInput } from '../../components/Input/PasswordInput'
import { validatePassword } from '../../../commons/passwords'
import toasts from '../../../commons/toasts'
import { DEFAULT_USERNAME } from '../../../constants/defaults'
import { tequila } from '../../../api/tequila'

const { api } = tequila

type FormState = {
  readonly oldPassword: string
  readonly newPassword: string
  readonly repeatNewPassword: string
}

const DEFAULT_FORM: FormState = {
  oldPassword: '',
  newPassword: '',
  repeatNewPassword: '',
}

const PasswordChangeCard = observer(() => {
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
      toasts.toastError('Please enter a valid password')
    }

    setLoading(false)
  }
  return (
    <Card fluid className="mb-10">
      <Form
        className="flex flex-col w-full max-w-[500px] min-w-[240px] items-start mt-4 md:mt-5"
        onSubmit={handlePasswordChange}
      >
        <div className="flex w-full flex-col">
          <PasswordInput label="Old password" fluid onChange={handleOldPassword} />
          <PasswordInput label="New password" fluid onChange={handleNewPassword} />
          <PasswordInput label="Confirm new password" fluid onChange={handleRepeatNewPassword} />
        </div>
        <div className="w-full sm:w-52">
          <Button fluid disabled={loading} type="submit" label="Save" />
        </div>
      </Form>
    </Card>
  )
})

export default PasswordChangeCard
