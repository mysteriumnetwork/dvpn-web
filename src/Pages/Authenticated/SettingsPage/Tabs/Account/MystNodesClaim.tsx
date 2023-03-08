/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MMN_SITE, MMN_SITE_ME_URL } from '../../../../../constants/names'
import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import { TextField } from '../../../../../Components/Inputs/TextField'
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
import CopyToClipboardButtonIcon from '../../../../../Components/Inputs/CopyToClipboardButtonIcon'
import { capitalizeFirstLetter } from '../../../../../commons'
import { ReactComponent as ExternalSVG } from '../../../../../assets/images/input/external.svg'
import styled from 'styled-components'
import { Tooltip } from '../../../../../Components/Tooltip/Tooltip'
const { api } = tequila

const Title = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  align-items: center;
`
const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const MystNodesClaim = () => {
  const identity = useAppSelector(selectors.currentIdentity)
  const config = useAppSelector(selectors.currentConfig)
  const mmnWebAddress = configs.mmnWebAddress(config)

  const [token, setToken] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [data = [], dataLoading] = useFetch(() => Promise.all([api.getMMNApiKey()]), [identity.id])
  const [apiToken] = data
  const handleApiKey = (value: string) => setToken(value)

  useEffect(() => {
    if (apiToken?.apiKey) {
      setToken(apiToken?.apiKey)
    }
  }, [apiToken?.apiKey])

  const valid = (token: string): boolean => {
    if (token.length === 0) {
      toasts.toastError('Please enter API key')
      return false
    }

    if (token.length !== 40) {
      toasts.toastError('Token should be 40 characters long')
      return false
    }

    return true
  }

  const handleClaim = async () => {
    if (!valid(token)) {
      return
    }
    setLoading(true)
    try {
      await api.setMMNApiKey(token)
      toasts.toastSuccess(`${mmnWebAddress} API key updated.`)
    } catch (err: any) {
      errors.parseToastError(err)
    }
    setLoading(false)
  }

  return (
    <SettingsCard
      dataTestId="SettingsCard.MyNodesClaim"
      loading={dataLoading}
      title={
        <Title>
          <div>{capitalizeFirstLetter(MMN_SITE)} Integrations</div>
          <Tooltip placement="top" content="Go to mystnodes.com/me">
            <Link href={MMN_SITE_ME_URL} target="_blank" rel="noreferrer">
              <ExternalSVG />
            </Link>
          </Tooltip>
        </Title>
      }
      footer={
        <Button
          dataTestId="MystNodesClaim.save"
          type="submit"
          variant="secondary"
          loading={loading || dataLoading}
          onClick={handleClaim}
          label="Save"
        />
      }
    >
      <Form onSubmit={handleClaim}>
        <InputGroup
          title="API Key"
          dataTestId="MystNodesClaim.APIKey"
          input={
            <TextField
              value={token}
              onChange={handleApiKey}
              tooltip
              icon={<CopyToClipboardButtonIcon text={token} />}
            />
          }
        />
      </Form>
    </SettingsCard>
  )
}
