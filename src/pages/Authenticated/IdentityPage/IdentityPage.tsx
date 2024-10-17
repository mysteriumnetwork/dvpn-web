/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react'
import { PageLayout } from '../../components/Layout/PageLayout'
import Title from '../../../components/Typography/Title'
import Label from '../../../components/Typography/Label'
import Card from '../../../components/Cards/Card'
import CopyToClipboardInputIcon from '../../../components/Inputs/CopyToClipboardInputIcon'
import { useAppSelector } from '../../../commons/hooks'
import { selectors } from '../../../redux/selectors'
import { LabeledInput } from '../../../components/Inputs/LabeledInput'
import { PasswordInput } from '../../components/Input/PasswordInput'
import { useState } from 'react'
import { passwords } from '../../../commons/passwords'
import toasts from '../../../commons/toasts'
import { tequila } from '../../../api/tequila'
import Button from '../../../components/Buttons/Button'
import ErrorMessage from '../../../components/Typography/ErrorMessage'

const { exportIdentity } = tequila

interface FormState {
  password: string
}

const DEFAULT_FORM: FormState = {
  password: '',
}

const IdentityPage = () => {
  const { id } = useAppSelector(selectors.currentIdentity)
  const [loading, setLoading] = useState<boolean>(false)
  const [form, setForm] = useState<FormState>(DEFAULT_FORM)

  const handlePassword = (value: string) => setForm((p) => ({ ...p, password: value }))

  const passwordValidation = passwords.isStrongPass(form.password)

  const handleIdentityExport = async () => {
    if (!passwordValidation.isStrong) {
      toasts.toastError('Weak password')
      return
    }
    setLoading(true)
    try {
      const response = await exportIdentity({
        identity: id,
        newpassphrase: form.password,
      })

      const data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(response))
      let a = document.createElement('a')
      a.href = 'data:' + data
      a.download = 'keystore_' + id + '.json'
      a.innerHTML = 'download JSON'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      setForm(DEFAULT_FORM)
    } catch (err: any) {
      toasts.toastError('Export failed')
    }
    setLoading(false)
  }

  return (
    <PageLayout>
      <Title value="Identity" />
      <Label value="Identity" className="text-pink-525 mb-4" />
      <Card className="mb-12 md:mb-10" fluid>
        <LabeledInput
          label="Your identity"
          value={id}
          fluid
          disabled
          errorMessagePadding={false}
          controls={<CopyToClipboardInputIcon text={id} />}
        />
      </Card>
      <Label value="Export Identity" className="text-pink-525 mb-4" />
      <Card fluid>
        <div className="mb-4">
          <PasswordInput
            label="Password"
            value={form.password}
            onChange={handlePassword}
            fluid
            errorMessagePadding={false}
          />
          {!passwordValidation.isStrong && form.password !== '' && (
            <ErrorMessage className="mt-2.5" value={passwordValidation.messages.join('\n')} />
          )}
        </div>
        <Button
          variant="primary"
          label="Export"
          className="min-w-50"
          loading={loading}
          onClick={handleIdentityExport}
        />
      </Card>
    </PageLayout>
  )
}

export default IdentityPage
