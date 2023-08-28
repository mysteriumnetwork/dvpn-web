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
import { validatePassword } from '../../../../../commons/passwords'
import { devices } from '../../../../../theme/themes'
import { Media } from '../../../../../commons/media'

import { useAppSelector } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import identities from '../../../../../commons/identities'

const { api } = tequila

const Row = styled.div`
  display: flex;
  gap: 20px;
  @media ${devices.tablet} {
    width: 100%;
  }
`

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media ${devices.tablet} {
    align-items: flex-start;
    justify-content: center;
  }
`

interface FormState {
  password: string
}

const DEFAULT_FORM: FormState = {
  password: '',
}

export const IdentityExport = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [form, setForm] = useState<FormState>(DEFAULT_FORM)

  const { id } = useAppSelector(selectors.currentIdentity)

  const handlePassword = (v: string) => setForm((p) => ({ ...p, password: v }))
  const handleIdentityExport = async () => {
    setLoading(true)
    try {
      let r = await api.exportIdentity({
        identity: id,
        newpassphrase: form.password,
      })

      var data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(r))
      var a = document.createElement('a')
      a.href = 'data:' + data
      a.download = 'keystore_' + id + '.json'
      a.innerHTML = 'download JSON'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      setForm(DEFAULT_FORM)
      toasts.toastSuccess('Export finished')
    } catch (err: any) {
      toasts.toastError('Please enter a valid password')
    }
    setLoading(false)
  }

  return (
    <SettingsCard
      loading={identities.isEmpty(id)}
      title="Export identity"
      dataTestId="SettingsCard.exportIdentity"
      footer={
        <Button
          dataTestId="IdentityExport.identityExport"
          loading={loading}
          onClick={handleIdentityExport}
          variant="secondary"
          label="Export"
        />
      }
    >
      <Form>
        <FormContent>
          <Row>
            <InputGroup
              fluid
              title="password"
              dataTestId="IdentityExport.password"
              input={
                <TextField type="password" value={form.password} onChange={handlePassword} icon={<InputLockIcon />} />
              }
            />
          </Row>
        </FormContent>
      </Form>
    </SettingsCard>
  )
}
