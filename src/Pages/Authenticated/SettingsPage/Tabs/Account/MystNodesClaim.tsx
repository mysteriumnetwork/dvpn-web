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
import { useAppSelector, useFetch } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import { tequila } from '../../../../../api/tequila'
import { useEffect, useState } from 'react'
import CopyToClipboardButtonIcon from '../../../../../Components/Inputs/CopyToClipboardButtonIcon'
import { capitalizeFirstLetter } from '../../../../../commons'
import { ReactComponent as ExternalSVG } from '../../../../../assets/images/input/external.svg'
import styled from 'styled-components'
import { Tooltip } from '../../../../../Components/Tooltip/Tooltip'
import { ClaimButton } from '../../../Components/Claim/ClaimButton'

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

  const [token, setToken] = useState<string>('')

  const [data = [], dataLoading] = useFetch(() => Promise.all([api.getMMNApiKey()]), [identity.id])
  const [apiToken] = data
  const handleApiKey = (value: string) => setToken(value)

  useEffect(() => {
    if (apiToken?.apiKey) {
      setToken(apiToken?.apiKey)
    }
  }, [apiToken?.apiKey])

  return (
    <SettingsCard
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
      footer={<ClaimButton label="Claim on mystnodes.com" />}
    >
      <InputGroup
        title="API Key"
        input={
          <TextField
            disabled
            value={token}
            onChange={handleApiKey}
            tooltip
            icon={<CopyToClipboardButtonIcon text={token} />}
          />
        }
      />
    </SettingsCard>
  )
}
