/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ROUTES from '../constants/routes'
import { tequila } from '../api/tequila'
import { strings } from '../commons/strngs'
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../constants/defaults'
import { useAppSelector } from '../commons/hooks'
import { selectors } from '../redux/selectors'
import { IdentityRegistrationStatus } from 'mysterium-vpn-js'
import complexActions from '../redux/complex.actions'

const AUTHORIZATION_GRANT = 'authorizationGrant'

const { verifyOnboardingGrant } = tequila

export const ClickBoarding = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { id, registrationStatus } = useAppSelector(selectors.currentIdentity)

  const autoOnBoard = async () => {
    const authorizationGrantToken = params.get(AUTHORIZATION_GRANT)
    if (!authorizationGrantToken) {
      navigate(ROUTES.HOME, { replace: true })
      return
    }

    try {
      const info = await verifyOnboardingGrant({ authorizationGrantToken })

      if ([IdentityRegistrationStatus.InProgress, IdentityRegistrationStatus.Registered].includes(registrationStatus)) {
        // TODO error here - identity already registered or in progress
        // navigate(ROUTES.HOME, { replace: true })
        return
      }

      if (!info.apiKey) {
        // TODO error here - no wallet
        // navigate(ROUTES.HOME, { replace: true })
      }

      if (!info.walletAddress) {
        // TODO error here - no wallet
        // navigate(ROUTES.HOME, { replace: true })
        return
      }

      // Following actions must happen in this particular order
      const newPassword = strings.generate(16)
      await tequila.api.authChangePassword({ oldPassword: DEFAULT_PASSWORD, newPassword, username: DEFAULT_USERNAME })
      await tequila.api.setMMNApiKey(info.apiKey) // calls mystnodes.com and marks node for free registration if it is first one
      await tequila.api.identityRegister(id, { beneficiary: info.walletAddress, stake: 0 })
      await complexActions.loadAppStateAfterAuthenticationAsync({ isDefaultPassword: false })
      navigate(ROUTES.DASHBOARD, { replace: true })
    } catch (e: unknown) {
      // navigate(ROUTES.HOME, { replace: true })
    }
  }

  useEffect(() => {
    autoOnBoard()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Birka 😏</h1>
    </div>
  )
}
