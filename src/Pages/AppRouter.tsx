/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AppState } from 'mysterium-vpn-js'
import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { tequila } from '../api/wrapped-calls'
import toasts from '../commons/toasts'
import { IDENTITY_EMPTY } from '../constants/instances'
import { localStorageKeys } from '../constants/local_storage_keys'
import {
  ADMIN,
  DASHBOARD,
  LOGIN,
  ON_BOARDING_HOME,
  SESSIONS,
  SESSIONS_SIDE,
  SETTINGS,
  WALLET,
} from '../constants/routes'
import {
  fetchChainSummaryAsync,
  fetchConfigAsync,
  fetchFeesAsync,
  fetchIdentityAsync,
  updateTermsStoreAsync,
} from '../redux/app.async.actions'
import { Auth, isLoggedIn, updateAuthenticatedStore, updateAuthFlowLoadingStore } from '../redux/app.slice'
import { selectors } from '../redux/selectors'
import { sseAppStateStateChanged } from '../redux/sse.slice'
import { RootState } from '../redux/store'
import ConnectToSSE from '../sse/server-sent-events'

import './App.scss'
import ContentWithNavigation from './Authenticated/ContentWithNavigation'
import LoginPage from './Login/LoginPage'

import { Protected } from './ProtectedRoute'
import DashboardPage from './Authenticated/Dashboard/DashboardPage'
import SessionsPage from './Authenticated/Sessions/SessionsPage'
import SettingsPage from './Authenticated/Settings/SettingsPage'
import WalletPage from './Authenticated/Wallet/WalletPage'
import { AdminPage } from './Authenticated/Admin/AdminPage'
import OnBoardingPage from './Onboarding/OnBoardingPage'
import SessionSidebarPage from './Authenticated/SessionSidebar/SessionSidebarPage'

const { parseToastError } = toasts

const AppRouter = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const actions = {
    fetchIdentityAsync: async () => fetchIdentityAsync(),
    fetchConfigAsync: async () => fetchConfigAsync(),
    updateTermsStoreAsync: async () => updateTermsStoreAsync(),
    fetchFeesAsync: async () => fetchFeesAsync(),
    fetchChainSummaryAsync: async () => fetchChainSummaryAsync(),
    updateAuthenticatedStore: async (auth: Auth) => dispatch(updateAuthenticatedStore(auth)),
    updateAuthFlowLoadingStore: async (loading: boolean) => dispatch(updateAuthFlowLoadingStore(loading)),
    sseAppStateStateChanged: (state: AppState) => dispatch(sseAppStateStateChanged(state)),
  }

  const loading = useSelector<RootState, boolean>(({ app }) => app.loading)
  const loggedIn = useSelector<RootState, boolean>(({ app }) => isLoggedIn(app.auth))
  const identity = useSelector(selectors.currentIdentitySelector)
  const onBoarding = useSelector(selectors.onBoardingStateSelector)

  const authenticatedActions = async (defaultCredentials: boolean) => {
    await actions.updateAuthenticatedStore({
      authenticated: true,
      withDefaultCredentials: defaultCredentials,
    })
    await actions.updateTermsStoreAsync()
    await actions.fetchIdentityAsync()
    await actions.fetchConfigAsync()
    await actions.fetchFeesAsync()
    await actions.fetchChainSummaryAsync()
  }

  const loadIntercomCookie = () => {
    const intercomUserId = localStorage.getItem(localStorageKeys.INTERCOM_USER_ID)
    if (intercomUserId !== null && intercomUserId !== '') {
      // @ts-ignore
      window.Intercom('boot', {
        anonymous_id: intercomUserId,
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (identity.id !== IDENTITY_EMPTY.id) {
          await tequila.refreshBeneficiary(identity.id)
        }
      } catch (e: any) {
        parseToastError(e)
      }
    })()
  }, [identity.id])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     try {
  //       actions.fetchFeesAsync()
  //     } catch (e: any) {
  //       console.log(e)
  //     }
  //   }, 30_000)
  //   return () => clearInterval(interval)
  // }, [])

  useLayoutEffect(() => {
    const blockingCheck = async () => {
      let isDefaultPassword = await tequila.loginWithDefaultCredentials()
      let isAuthenticated = isDefaultPassword

      //check if there is a token cookie saved
      if (!isAuthenticated) {
        isAuthenticated = await tequila.isUserAuthenticated()
      }

      if (isAuthenticated) {
        await authenticatedActions(isDefaultPassword)
      }

      await actions.updateAuthFlowLoadingStore(false)
    }
    blockingCheck()
  }, [])

  useEffect(() => {
    if (!loggedIn) {
      return
    }

    loadIntercomCookie()

    ConnectToSSE((state: AppState) => actions.sseAppStateStateChanged(state))
  }, [loggedIn])

  if (loading) {
    return <></>
  }

  const toLoginOrOnBoarding = [
    { condition: !loggedIn, to: LOGIN },
    { condition: onBoarding.needsOnBoarding, to: ON_BOARDING_HOME },
  ]

  const toDashboardIfLoggedIn = [{ condition: loggedIn, to: DASHBOARD }]

  return (
    <Routes>
      <Route
        index={true}
        element={
          <Protected redirects={toDashboardIfLoggedIn}>
            <LoginPage onSuccessLogin={() => authenticatedActions(false)} />
          </Protected>
        }
      />
      <Route
        path={DASHBOARD}
        element={
          <Protected redirects={toLoginOrOnBoarding}>
            <ContentWithNavigation content={<DashboardPage />} />
          </Protected>
        }
      />
      <Route
        path={SESSIONS}
        element={
          <Protected redirects={toLoginOrOnBoarding}>
            <ContentWithNavigation content={<SessionsPage />} />
          </Protected>
        }
      />
      <Route
        path={SETTINGS}
        element={
          <ContentWithNavigation
            content={
              <Protected redirects={toLoginOrOnBoarding}>
                <SettingsPage />
              </Protected>
            }
          />
        }
      />
      <Route
        path={WALLET}
        element={
          <Protected redirects={toLoginOrOnBoarding}>
            <ContentWithNavigation content={<WalletPage />} />
          </Protected>
        }
      />
      <Route
        path={SESSIONS_SIDE}
        element={
          <Protected redirects={toLoginOrOnBoarding}>
            <ContentWithNavigation content={<SessionSidebarPage />} />
          </Protected>
        }
      />
      <Route
        path={LOGIN}
        element={
          <Protected redirects={toDashboardIfLoggedIn}>
            <LoginPage
              onSuccessLogin={async () => {
                await authenticatedActions(false)
                navigate(DASHBOARD)
              }}
            />
          </Protected>
        }
      />
      <Route
        path={ON_BOARDING_HOME}
        element={
          <Protected redirects={[{ condition: !onBoarding.needsOnBoarding, to: LOGIN }]}>
            <OnBoardingPage />
          </Protected>
        }
      />
      <Route
        path={ADMIN}
        element={
          <Protected redirects={[{ condition: !loggedIn, to: LOGIN }]}>
            <ContentWithNavigation content={<AdminPage />} />
          </Protected>
        }
      />
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  )
}

export default AppRouter
