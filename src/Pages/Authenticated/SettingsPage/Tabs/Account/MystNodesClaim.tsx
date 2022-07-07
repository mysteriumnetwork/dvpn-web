/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MMN_SITE } from '../../../../../constants/names'
import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import { TextField } from '../../../../../Components/Inputs/TextField'
import { InputCopyToClipboardIcon } from '../../../../../Components/Icons/InputIcons'
import { SettingsCard } from '../../SettingsCard'
import { Button } from '../../../../../Components/Inputs/Button'
import { useAppSelector, useFetch } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import { configs } from '../../../../../commons/config'
import { tequila } from '../../../../../api/tequila'
import { useEffect, useState } from 'react'
import toasts from '../../../../../commons/toasts'
import errors from '../../../../../commons/errors'
import { Form } from '../../../../../Components/Inputs/Form'

const { api } = tequila

export const MystNodesClaim = () => {
  const identity = useAppSelector(selectors.currentIdentitySelector)
  const config = useAppSelector(selectors.configSelector)
  const mmnWebAddress = configs.mmnWebAddress(config)

  const [token, setToken] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [data = [], fetchLoading] = useFetch(() => Promise.all([api.getMMNApiKey()]), [identity.id])
  const [apiToken] = data
  const handleApiKey = (value: string) => setToken(value)

  useEffect(() => {
    if (apiToken?.apiKey) {
      setToken(apiToken?.apiKey)
    }
  }, [apiToken?.apiKey])

  const handleClaim = async () => {
    setLoading(true)
    try {
      await api.setMMNApiKey(token)
      toasts.toastSuccess(`${mmnWebAddress} API key updated.`)
    } catch (err: any) {
      errors.parseToastError(err)
    }
    setLoading(false)
  }

  const resolvedLoading = loading || fetchLoading

  return (
    <SettingsCard
      loading={fetchLoading}
      title={`${MMN_SITE} Integrations`}
      footer={<Button type="submit" loading={resolvedLoading} onClick={handleClaim} label="Save" />}
    >
      <Form onSubmit={handleClaim}>
        <InputGroup
          title="API Key"
          input={<TextField value={token} onChange={handleApiKey} icon={<InputCopyToClipboardIcon />} />}
        />
      </Form>
    </SettingsCard>
  )
}