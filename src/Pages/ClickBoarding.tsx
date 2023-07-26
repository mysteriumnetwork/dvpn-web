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
import { CircularSpinner } from '../Components/CircularSpinner/CircularSpinner'
import styled from 'styled-components'
import { Button } from '../Components/Inputs/Button'

const AUTHORIZATION_GRANT = 'authorizationGrant'
const { verifyOnboardingGrant } = tequila

interface ErrorState {
  type?: 'identity' | 'wallet' | 'apiKey' | 'server'
  message?: string
}

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
  const [error, setError] = useState<ErrorState>({})
  const [loading, setLoading] = useState(false)

  const autoOnBoard = async () => {
    const authorizationGrantToken = params.get(AUTHORIZATION_GRANT)
    if (!authorizationGrantToken) {
      navigate(ROUTES.HOME, { replace: true })
      return
    }

    try {
      setLoading(true)
      const info = await verifyOnboardingGrant({ authorizationGrantToken })

      if ([IdentityRegistrationStatus.InProgress, IdentityRegistrationStatus.Registered].includes(registrationStatus)) {
        //Error - identity already registered or in progress
        setLoading(false)
        setError({ type: 'identity', message: 'Identity was already registered or registration is in progress!' })
        return
      }

      if (!info.apiKey) {
        //Error - no api key??
        setLoading(false)
        //TODO: Refine error messages
        setError({ type: 'apiKey', message: 'Something bad happened. Please retry.' })
        return
      }

      if (!info.walletAddress) {
        //Error - no wallet
        setLoading(false)
        setError({ type: 'wallet', message: 'Please set your wallet on MystNodes to onboard your node' })
        return
      }

      // Following actions must happen in this particular order
      const newPassword = strings.generate(16)
      await tequila.api.authChangePassword({ oldPassword: DEFAULT_PASSWORD, newPassword, username: DEFAULT_USERNAME })
      await tequila.api.setMMNApiKey(info.apiKey) // calls mystnodes.com and marks node for free registration if it is first one
      await tequila.api.identityRegister(id, { beneficiary: info.walletAddress, stake: 0 })
      await complexActions.loadAppStateAfterAuthenticationAsync({ isDefaultPassword: false })
      setLoading(false)
      navigate(ROUTES.DASHBOARD, { replace: true })
    } catch (e: unknown) {
      setLoading(false)
      // TODO: Refine error messages
      setError({ type: 'server', message: 'Something bad happened, please retry' })
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
      {loading && (
        <Row>
          <h1>Please wait while we onboard your node</h1>
          <Spinner />
        </Row>
      )}
      {error.message && (
        <>
          <Error>{error.message}</Error>
          {/*TODO: Consider timeout instead of button?*/}
          <Button
            label={error.type === 'identity' ? 'Go Back' : 'Try Again'}
            rounded
            size="large"
            onClick={() => {
              navigate(ROUTES.HOME, { replace: true })
            }}
          />
        </>
      )}
    </div>
  )
}
