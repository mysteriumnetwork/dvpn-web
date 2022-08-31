/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../commons/hooks'
import { loadAppStateAfterAuthenticationAsync } from '../redux/complex.actions'
import { updateLoadingStore } from '../redux/app.slice'
import { AppState } from 'mysterium-vpn-js'
import { sseAppStateStateChanged } from '../redux/sse.slice'
import { selectors } from '../redux/selectors'
import { tequila } from '../api/tequila'
import ConnectToSSE from '../sse/server-sent-events'
import { loadIntercomCookie } from './intercom'

interface Props {
  children: ReactNode
}

export const StateInitializer = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const actions = {
    updateLoadingStore: async (loading: boolean) => dispatch(updateLoadingStore(loading)),
    sseAppStateStateChanged: (state: AppState) => dispatch(sseAppStateStateChanged(state)),
  }

  const { authenticated: loggedIn } = useAppSelector(selectors.auth)

  useEffect(() => {
    ;(async () => {
      const isDefaultPassword = await tequila.loginWithDefaultCredentials()
      let isAuthenticated = isDefaultPassword

      //check if there is a token cookie saved
      if (!isAuthenticated) {
        isAuthenticated = await tequila.isUserAuthenticated()
      }

      if (isAuthenticated) {
        await loadAppStateAfterAuthenticationAsync({ isDefaultPassword })
        return
      }

      await actions.updateLoadingStore(false)
    })()
  }, [])

  useEffect(() => {
    if (!loggedIn) {
      return
    }

    loadIntercomCookie()

    ConnectToSSE((state: AppState) => actions.sseAppStateStateChanged(state))
  }, [loggedIn])

  return <>{children}</>
}
