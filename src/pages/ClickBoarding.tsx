/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ROUTES from '../constants/routes'
import { tequila } from '../api/tequila'
import { strings } from '../commons/strngs'
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../constants/defaults'
import { useAppSelector } from '../commons/hooks'
import { selectors } from '../redux/selectors'
import { IdentityRegistrationStatus } from 'mysterium-vpn-js'
import complexActions from '../redux/complex.actions'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useStores } from '../mobx/store'
import { events } from '../commons/events'
import errors from '../commons/errors'
import Spinner from '../components/Spinner/Spinner'

const AUTHORIZATION_GRANT = 'authorizationGrant'
const { verifyOnboardingGrant } = tequila

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const Error = styled.h2`
  color: ${({ theme }) => theme.common.colorKey};
`

type Info = {
  readonly identity: string
  readonly apiKey: string
  readonly walletAddress?: string
}

export const ClickBoarding = observer(() => {
  const { clickBoardingStore: store } = useStores()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { id, registrationStatus } = useAppSelector(selectors.currentIdentity)
  const [error, setError] = useState('')

  const toDashboardWithPassword = async (password: string) => {
    store.generatedPassword = password
    await events.send('action_clickboarding_complete')
    navigate(ROUTES.DASHBOARD, { replace: true })
  }

  const autoOnBoard = async () => {
    const authorizationGrantToken = params.get(AUTHORIZATION_GRANT)

    if (!authorizationGrantToken) {
      navigate(ROUTES.HOME, { replace: true })
      return
    }

    try {
      const mmnReport = await verifyOnboardingGrant({ authorizationGrantToken })

      if (!mmnReport.apiKey) {
        noApiKeyFlow()
        return
      }

      const info: Info = { identity: id, walletAddress: mmnReport.walletAddress, apiKey: mmnReport.apiKey }

      if (!mmnReport.isEligibleForFreeRegistration) {
        await noFreeRegistrationsLeftFlow(info)
        return
      }

      if ([IdentityRegistrationStatus.InProgress, IdentityRegistrationStatus.Registered].includes(registrationStatus)) {
        await identityAlreadyRegisteredFlow(info)
        return
      }

      await regularFlow({ identity: id, walletAddress: mmnReport.walletAddress, apiKey: mmnReport.apiKey })
    } catch (e: unknown) {
      setError('Could not proceed with Quick onboarding')
      await events.send('error_clickboarding_flow', { error: errors.string(e).substring(0, 1024) })
      navigate(ROUTES.HOME)
    }
  }

  const noFreeRegistrationsLeftFlow = async ({ apiKey, identity, walletAddress }: Info) => {
    const newPassword = strings.generate(16)
    await tequila.api.setMMNApiKey(apiKey) // just claim
    await tequila.api.authChangePassword({ oldPassword: DEFAULT_PASSWORD, newPassword, username: DEFAULT_USERNAME })
    await complexActions.loadAppStateAfterAuthenticationAsync({ isDefaultPassword: false })
    if (walletAddress) {
      await tequila.api.payment.changeBeneficiaryAsync({ identity, address: walletAddress })
    }
    await events.send('action_complete_clickboarding_no_free_registrations_left_flow')
    await toDashboardWithPassword(newPassword)
  }

  const identityAlreadyRegisteredFlow = noFreeRegistrationsLeftFlow

  const noApiKeyFlow = () => {
    //TODO: Refine error messages
    setError('Something bad happened. Please retry.')

    setTimeout(() => {
      navigate(ROUTES.HOME, { replace: true })
    }, 3000)
  }

  const regularFlow = async ({ apiKey, walletAddress, identity }: Info) => {
    const newPassword = strings.generate(16)
    await tequila.api.authChangePassword({ oldPassword: DEFAULT_PASSWORD, newPassword, username: DEFAULT_USERNAME })
    await tequila.api.setMMNApiKey(apiKey)
    await tequila.api.identityRegister(identity, { beneficiary: walletAddress, stake: 0 })
    await complexActions.loadAppStateAfterAuthenticationAsync({ isDefaultPassword: false })
    if (walletAddress) {
      await tequila.api.payment.changeBeneficiaryAsync({ identity, address: walletAddress })
    }
    await events.send('action_complete_clickboarding_regular_flow')
    await toDashboardWithPassword(newPassword)
  }

  useEffect(() => {
    autoOnBoard()
    events.send('page_view_clickboarding')
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
        <Spinner size="lg" />
      </Row>
      {error && <Error>{error}</Error>}
    </div>
  )
})
