/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ROUTES from '../constants/routes'
import { GrantVerificationResponse, tequila } from '../api/tequila'
import { strings } from '../commons/strngs'
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../constants/defaults'
import { useAppSelector } from '../commons/hooks'
import { selectors } from '../redux/selectors'
import { IdentityRegistrationStatus } from 'mysterium-vpn-js'
import complexActions from '../redux/complex.actions'
import { CircularSpinner } from '../Components/CircularSpinner/CircularSpinner'
import styled from 'styled-components'

const AUTHORIZATION_GRANT = 'authorizationGrant'
const { verifyOnboardingGrant } = tequila

const Spinner = styled(CircularSpinner)`
  height: 50px;
  width: 50px;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const Error = styled.h2`
  color: ${({ theme }) => theme.common.colorKey};
`
export const ClickBoarding = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { id, registrationStatus } = useAppSelector(selectors.currentIdentity)
  const [error, setError] = useState('')

  const toDashboardWithPassword = (password: string) =>
    navigate(ROUTES.DASHBOARD, { replace: true, state: { generatedPassword: password } })

  const autoOnBoard = async () => {
    const authorizationGrantToken = params.get(AUTHORIZATION_GRANT)

    if (!authorizationGrantToken) {
      navigate(ROUTES.HOME, { replace: true })
      return
    }

    try {
      const info = await verifyOnboardingGrant({ authorizationGrantToken })

      if (!info.isEligibleForFreeRegistration) {
        await noFreeRegistrationsLeftFlow(info)
        return
      }

      if ([IdentityRegistrationStatus.InProgress, IdentityRegistrationStatus.Registered].includes(registrationStatus)) {
        await identityAlreadyRegisteredFlow()
        return
      }

      if (!info.apiKey) {
        noApiKeyFlow()
        return
      }

      if (!info.walletAddress) {
        noWalletFlow()
        return
      }

      await regularFlow(info)
    } catch (e: unknown) {
      setError('Could not proceed with Quick onboarding')
      navigate(ROUTES.HOME)
    }
  }

  const noFreeRegistrationsLeftFlow = async (info: GrantVerificationResponse) => {
    const newPassword = strings.generate(16)
    await tequila.api.setMMNApiKey(info.apiKey) // just claim
    await tequila.api.authChangePassword({ oldPassword: DEFAULT_PASSWORD, newPassword, username: DEFAULT_USERNAME })
    await complexActions.loadAppStateAfterAuthenticationAsync({ isDefaultPassword: false })
    toDashboardWithPassword(newPassword)

    setTimeout(() => {
      navigate(ROUTES.DASHBOARD, { replace: true })
    }, 3000)
  }

  const identityAlreadyRegisteredFlow = async () => {
    const newPassword = strings.generate(16)
    await tequila.api.authChangePassword({ oldPassword: DEFAULT_PASSWORD, newPassword, username: DEFAULT_USERNAME })
    await complexActions.loadAppStateAfterAuthenticationAsync({ isDefaultPassword: false })
    toDashboardWithPassword(newPassword)

    setTimeout(() => {
      navigate(ROUTES.DASHBOARD, { replace: true })
    }, 3000)
  }

  const noApiKeyFlow = () => {
    //TODO: Refine error messages
    setError('Something bad happened. Please retry.')

    setTimeout(() => {
      navigate(ROUTES.HOME, { replace: true })
    }, 3000)
  }

  const noWalletFlow = () => {
    setError('Please set your wallet on MystNodes to onboard your node')

    setTimeout(() => {
      navigate(ROUTES.HOME, { replace: true })
    }, 3000)
  }

  const regularFlow = async (info: GrantVerificationResponse) => {
    const newPassword = strings.generate(16)
    await tequila.api.authChangePassword({ oldPassword: DEFAULT_PASSWORD, newPassword, username: DEFAULT_USERNAME })
    await tequila.api.setMMNApiKey(info.apiKey)
    await tequila.api.identityRegister(id, { beneficiary: info.walletAddress, stake: 0 })
    await complexActions.loadAppStateAfterAuthenticationAsync({ isDefaultPassword: false })
    toDashboardWithPassword(newPassword)
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
      <Row>
        <h1>Please wait while we onboard your node</h1>
        <Spinner />
      </Row>
      {error && <Error>{error}</Error>}
    </div>
  )
}
