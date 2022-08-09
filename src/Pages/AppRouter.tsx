/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AppState, FeesResponse } from 'mysterium-vpn-js'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { tequila } from '../api/tequila'
import errors from '../commons/errors'
import { localStorageKeys } from '../constants/local_storage_keys'
import {
  ADMIN,
  DASHBOARD,
  HISTORY,
  HOME,
  NEW_PASSWORD,
  SANDBOX,
  SESSIONS_SIDE,
  SETTINGS,
  SETTINGS_ACCOUNT,
  SETTINGS_ADVANCED,
  SETTINGS_TRAFFIC,
  TRANSACTIONS,
} from '../constants/routes'
import {
  fetchChainSummaryAsync,
  fetchConfigAsync,
  fetchDefaultConfigAsync,
  fetchIdentityAndRelativeInformationAsync,
  updateTermsStoreAsync,
} from '../redux/app.async.actions'
import {
  Auth,
  isLoggedIn,
  updateAuthenticatedStore,
  updateAuthFlowLoadingStore,
  updateFeesStore,
} from '../redux/app.slice'
import { selectors } from '../redux/selectors'
import { sseAppStateStateChanged } from '../redux/sse.slice'
import ConnectToSSE from '../sse/server-sent-events'

import WithNavigation from './Authenticated/WithNavigation'
import LoginPage from './Login/LoginPage'

import { Protected } from './ProtectedRoute'
import DashboardPage from './Authenticated/DashboardPage/DashboardPage'
import { AdminPage } from './Authenticated/AdminPage/AdminPage'
import identities from '../commons/identities'
import { useAppDispatch, useAppSelector } from '../commons/hooks'
import { HistoryPage } from './Authenticated/HistoryPage/HistoryPage'
import { SettingsPage } from './Authenticated/SettingsPage/SettingsPage'
import { TransactionsPage } from './Authenticated/TransactionsPage/TransactionsPage'
import PageNotFound from './Error/PageNotFound'
import { SandboxPage } from './Authenticated/SandboxPage/SandboxPage'
import { PasswordPage } from './Authenticated/Onboarding/PasswordPage'

const { api } = tequila
const { parseToastError } = errors
const SECOND = 1000

const AppRouter = () => {
  const dispatch = useAppDispatch()
  const actions = {
    fetchIdentityAndRelativeInformationAsync: async () => fetchIdentityAndRelativeInformationAsync(),
    fetchConfigAsync: async () => fetchConfigAsync(),
    fetchDefaultConfigAsync: async () => fetchDefaultConfigAsync(),
    updateTermsStoreAsync: async () => updateTermsStoreAsync(),
    fetchChainSummaryAsync: async () => fetchChainSummaryAsync(),
    updateAuthenticatedStore: async (auth: Auth) => dispatch(updateAuthenticatedStore(auth)),
    updateAuthFlowLoadingStore: async (loading: boolean) => dispatch(updateAuthFlowLoadingStore(loading)),
    sseAppStateStateChanged: (state: AppState) => dispatch(sseAppStateStateChanged(state)),
    updateFeesStore: (fees: FeesResponse) => dispatch(updateFeesStore(fees)),
  }

  const loading = useAppSelector(({ app }) => app.loading)
  const loggedIn = useAppSelector(({ app }) => isLoggedIn(app.auth))
  const identity = useAppSelector(selectors.currentIdentitySelector)
  const onBoarding = useAppSelector(selectors.onBoardingStateSelector)

  const authenticatedActions = async (defaultCredentials: boolean) => {
    await actions.updateAuthenticatedStore({
      authenticated: true,
      withDefaultCredentials: defaultCredentials,
    })
    await actions.updateTermsStoreAsync()
    await actions.fetchIdentityAndRelativeInformationAsync()
    await actions.fetchConfigAsync()
    await actions.fetchDefaultConfigAsync()
    await actions.fetchChainSummaryAsync()
    await updateFees()
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
      if (identities.isEmpty(identity)) {
        return
      }
      try {
        await tequila.refreshBeneficiary(identity.id)
      } catch (e: any) {
        parseToastError(e)
      }
    })()
  }, [identity.id])

  const updateFees = async () => {
    if (loggedIn) {
      return
    }
    try {
      const response = await api.transactorFeesV2()
      const {
        current: { validUntil },
        serverTime,
      } = response
      const staleInMs = new Date(validUntil).getTime() - new Date(serverTime).getTime()
      actions.updateFeesStore(response)
      setTimeout(() => updateFees(), staleInMs - SECOND * 10)
    } catch (ignored: any) {
      setTimeout(() => updateFees(), SECOND * 10)
    }
  }

  useEffect(() => {
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

  const toLoginOrOnBoarding = [{ condition: !loggedIn, to: HOME }]

  const toPasswordChangeOrDashboard = [
    { condition: onBoarding.needsPasswordChange, to: NEW_PASSWORD },
    { condition: loggedIn, to: DASHBOARD },
  ]

  return (
    <Routes>
      <Route
        index={true}
        element={
          <Protected redirects={toPasswordChangeOrDashboard}>
            <LoginPage onSuccess={() => authenticatedActions(false)} />
          </Protected>
        }
      />
      <Route
        path={DASHBOARD}
        element={
          <Protected redirects={toLoginOrOnBoarding}>
            <WithNavigation content={<DashboardPage />} />
          </Protected>
        }
      />
      <Route
        path={HISTORY}
        element={
          <Protected redirects={toLoginOrOnBoarding}>
            <WithNavigation content={<HistoryPage />} />
          </Protected>
        }
      />
      <Route
        path={SETTINGS}
        element={
          <Protected redirects={toLoginOrOnBoarding}>
            <WithNavigation content={<SettingsPage />} />
          </Protected>
        }
      >
        <Route path={SETTINGS_ACCOUNT} element={<SettingsPage />} />
        <Route path={SETTINGS_TRAFFIC} element={<SettingsPage />} />
        <Route path={SETTINGS_ADVANCED} element={<SettingsPage />} />
      </Route>
      <Route
        path={TRANSACTIONS}
        element={
          <Protected redirects={toLoginOrOnBoarding}>
            <WithNavigation content={<TransactionsPage />} />
          </Protected>
        }
      />
      <Route
        path={SESSIONS_SIDE}
        element={
          <Protected redirects={toLoginOrOnBoarding}>
            <WithNavigation content={<DashboardPage />} />
          </Protected>
        }
      />
      <Route
        path={NEW_PASSWORD}
        element={
          <Protected redirects={[{ condition: !onBoarding.needsPasswordChange, to: HOME }]}>
            <PasswordPage />
          </Protected>
        }
      />
      <Route
        path={ADMIN}
        element={
          <Protected redirects={[{ condition: !loggedIn, to: HOME }]}>
            <WithNavigation content={<AdminPage />} />
          </Protected>
        }
      />
      <Route
        path={SANDBOX}
        element={
          <Protected redirects={[{ condition: !loggedIn, to: HOME }]}>
            <WithNavigation content={<SandboxPage />} />
          </Protected>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRouter
