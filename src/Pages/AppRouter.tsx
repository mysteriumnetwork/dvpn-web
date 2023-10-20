/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import ROUTES, {
  ADMIN,
  DASHBOARD,
  HISTORY,
  HOME,
  NEW_PASSWORD,
  NODE_CLAIM,
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
import { StorybookPage } from './Authenticated/StorybookPage/StorybookPage'
import { FullPageSpinner } from './Authenticated/Components/Spinner/FullPageSpinner'
import { STORYBOOK_ROUTES } from './Authenticated/StorybookPage/storybook.routes'
import { SSOPage } from './Login/SSOPage'
import { NodeClaimPage } from './Authenticated/NodeClaimPage/NodeClaimPage'
import { ClickBoarding } from './ClickBoarding'
import { NewPasswordSetPage } from './Authenticated/Onboarding/NewPasswordSetPage'
import { QuickOnboardingPage } from './Authenticated/Onboarding/Password/QuickOnboardingPage'
import { AdvancedBoardingPage } from './Authenticated/Onboarding/Password/AdvancedBoardingPage'
import { PasswordResetPage } from './Authenticated/Onboarding/Password/PasswordResetPage'

const AppRouter = () => {
  const loading = useAppSelector(({ app }) => app.loading)
  const { authenticated: loggedIn } = useAppSelector(selectors.auth)
  const onBoarding = useAppSelector(selectors.onBoarding)

  const storybookRoutes = useMemo(
    () => Object.keys(STORYBOOK_ROUTES).map((path) => <Route key={path} path={path} element={<StorybookPage />} />),
    [STORYBOOK_ROUTES],
  )

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
        path={NODE_CLAIM}
        element={
          <Protected redirects={toLoginOrOnBoarding}>
            <NodeClaimPage />
          </Protected>
        }
      />
      <Route path={ROUTES.CLICKBOARDING} element={<ClickBoarding />} />
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
            <NewPasswordSetPage />
          </Protected>
        }
      />
      <Route
        path={ROUTES.QUICK_ONBOARDING}
        element={
          <Protected redirects={[{ condition: !onBoarding.needsPasswordChange, to: HOME }]}>
            <QuickOnboardingPage />
          </Protected>
        }
      />
      <Route
        path={ROUTES.ADVANCED_ONBOARDING}
        element={
          <Protected redirects={[{ condition: !onBoarding.needsPasswordChange, to: HOME }]}>
            <AdvancedBoardingPage />
          </Protected>
        }
      />
      <Route
        path={ROUTES.PASSWORD_RESET}
        element={
          <Protected redirects={[{ condition: !onBoarding.needsPasswordChange, to: HOME }]}>
            <PasswordResetPage />
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
      <Route path={ROUTES.AUTH_SSO} element={<SSOPage />} />
      <Route
        path={ROUTES.STORYBOOK}
        element={
          <Protected redirects={[{ condition: !loggedIn, to: HOME }]}>
            <WithNavigation content={<StorybookPage />} />
          </Protected>
        }
      >
        {storybookRoutes}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRouter
