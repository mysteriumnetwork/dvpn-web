/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Button from '../../components/Buttons/Button'
import { LogoDarkIcon } from '../../components/Icons/Icons'
import { tequila } from '../../api/tequila'
import { useMediaQuery } from 'react-responsive'
import { media } from '../../commons/media'
import { urls } from '../../commons/urls'
import { useAppSelector } from '../../commons/hooks'
import { selectors } from '../../redux/selectors'
import { configs } from '../../commons/config'
import FEATURES from '../../commons/features'
import ROUTES from '../../constants/routes'
import { ANDROID_DEEPLINK_SSO } from '../../constants/urls'

const { initSSOAuth } = tequila

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
          onClick={onClick}
          icon={<LogoDarkIcon className="size-6 min-w-6" />}
          variant="primary-outlined"
          type="button"
          label={isDesktop ? 'Sign in with Mystnodes' : ''}
        />
      )}
    </>
  )
}
