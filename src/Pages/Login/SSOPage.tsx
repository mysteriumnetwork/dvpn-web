/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ROUTES from '../../constants/routes'
import { tequila } from '../../api/tequila'
import complexActions from '../../redux/complex.actions'
import { FullPageSpinner } from '../Authenticated/Components/Spinner/FullPageSpinner'

const AUTHORIZATION_GRANT = 'authorizationGrant'

const { loginWithAuthorizationGrant } = tequila

export const SSOPage = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  useEffect(() => {
    ;(async () => {
      const authorizationGrantToken = params.get(AUTHORIZATION_GRANT)
      if (!authorizationGrantToken) {
        navigate(ROUTES.HOME, { replace: true })
        return
      }

      try {
        await loginWithAuthorizationGrant({ authorizationGrantToken })
        await complexActions.loadAppStateAfterAuthenticationAsync({ isDefaultPassword: false })
        navigate(ROUTES.DASHBOARD)
      } catch (e) {
        navigate(ROUTES.HOME, { replace: true })
        return
      }
    })()
  }, [])

  return <FullPageSpinner />
}
