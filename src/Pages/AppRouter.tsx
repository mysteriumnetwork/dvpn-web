/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { Route, Routes } from 'react-router-dom'
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
import { selectors } from '../redux/selectors'

import WithNavigation from './Authenticated/WithNavigation'
import LoginPage from './Login/LoginPage'

import { Protected } from './ProtectedRoute'
import DashboardPage from './Authenticated/DashboardPage/DashboardPage'
import { AdminPage } from './Authenticated/AdminPage/AdminPage'
import { useAppSelector } from '../commons/hooks'
import { HistoryPage } from './Authenticated/HistoryPage/HistoryPage'
import { SettingsPage } from './Authenticated/SettingsPage/SettingsPage'
import { TransactionsPage } from './Authenticated/TransactionsPage/TransactionsPage'
import PageNotFound from './Error/PageNotFound'
import { SandboxPage } from './Authenticated/SandboxPage/SandboxPage'
import { PasswordChangePage } from './Authenticated/Onboarding/PasswordChangePage'
import { FullPageSpinner } from './Authenticated/Components/Spinner/FullPageSpinner'

const AppRouter = () => {
  const loading = useAppSelector(({ app }) => app.loading)
  const { authenticated: loggedIn } = useAppSelector(selectors.auth)
  const onBoarding = useAppSelector(selectors.onBoarding)

  if (loading) {
    return <FullPageSpinner />
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
            <LoginPage />
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
            <PasswordChangePage />
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
