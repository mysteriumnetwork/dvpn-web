/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Button } from '../../Components/Inputs/Button'
import { MystnodesIcon } from '../../Components/Icons/Icons'
import { tequila } from '../../api/tequila'
import { useMediaQuery } from 'react-responsive'
import { media } from '../../commons/media'
import styled from 'styled-components'
import { urls } from '../../commons/urls'
import { useAppSelector } from '../../commons/hooks'
import { selectors } from '../../redux/selectors'
import { configs } from '../../commons/config'
import FEATURES from '../../commons/features'
import ROUTES from '../../constants/routes'
import { ANDROID_DEEPLINK_SSO } from '../../constants/urls'

const { initSSOAuth } = tequila

const Label = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`
export const MystnodesSSO = () => {
  const config = useAppSelector(selectors.currentConfig)
  const ssoDisabled = configs.isFeatureEnabled(config, FEATURES.SSO_HIDE.name)
  const isDesktop = useMediaQuery(media.isDesktopQuery)
  const onClick = async () => {
    const { link } = await initSSOAuth(urls.featureAwareCurrentOrigin(config, ROUTES.AUTH_SSO, ANDROID_DEEPLINK_SSO))
    window.location.href = link
  }
  return (
    <>
      {!ssoDisabled && (
        <Button
          size="large"
          onClick={onClick}
          rounded
          label={
            <Label>
              <MystnodesIcon /> {isDesktop && 'Sign in with Mystnodes'}
            </Label>
          }
          variant="secondary"
          type="button"
        />
      )}
    </>
  )
}
