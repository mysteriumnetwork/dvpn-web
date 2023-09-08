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
import styled from 'styled-components'
import { useState } from 'react'
import toasts from '../../../../../commons/toasts'
import { tequila } from '../../../../../api/tequila'
import { devices } from '../../../../../theme/themes'

import { useAppSelector } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import identities from '../../../../../commons/identities'
import { passwords } from '../../../../../commons/passwords'

const { exportIdentity } = tequila

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media ${devices.tablet} {
    width: 100%;
  }
`

const Error = styled.div`
  color: ${({ theme }) => theme.common.colorRed};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  font-weight: 700;
  gap: 4px;
  display: flex;
  flex-direction: column;
  > p {
    &:before {
      content: '\t• ';
    }
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
    <SettingsCard
      loading={identities.isEmpty(id)}
      title="Export identity"
      footer={<Button loading={loading} onClick={handleIdentityExport} variant="secondary" label="Export" />}
    >
      <Col>
        <InputGroup
          fluid
          title="password"
          input={<TextField type="password" value={form.password} onChange={handlePassword} icon={<InputLockIcon />} />}
        />
        {!passwordValidation.isStrong && form.password !== '' && (
          <Error>
            {passwordValidation.messages.map((m) => (
              <p>{m}</p>
            ))}
          </Error>
        )}
      </Col>
    </SettingsCard>
  )
}
