/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import ROUTES, {
  ADMIN,
  DASHBOARD,
  HISTORY,
  NEW_PASSWORD,
  NODE_CLAIM,
  SESSIONS_SIDE,
  SETTINGS,
  SETTINGS_ACCOUNT,
  SETTINGS_ADVANCED,
  SETTINGS_TRAFFIC,
  TRANSACTIONS,
} from '../constants/routes'

import WithNavigation from './Authenticated/WithNavigation'
import LoginPage from './Login/LoginPage'
import { Layout } from './Layout'
import { ErrorBoundary } from './ErrorBoundary'
import { Protected } from './ProtectedRoute'
import DashboardPage from './Authenticated/DashboardPage/DashboardPage'
import { AdminPage } from './Authenticated/AdminPage/AdminPage'
import { HistoryPage } from './Authenticated/HistoryPage/HistoryPage'
import { SettingsPage } from './Authenticated/SettingsPage/SettingsPage'
import { TransactionsPage } from './Authenticated/TransactionsPage/TransactionsPage'
import PageNotFound from './Error/PageNotFound'
import { StorybookPage } from './Authenticated/StorybookPage/StorybookPage'
import { STORYBOOK_ROUTES } from './Authenticated/StorybookPage/storybook.routes'
import { SSOPage } from './Login/SSOPage'
import { NodeClaimPage } from './Authenticated/NodeClaimPage/NodeClaimPage'
import { ClickBoarding } from './ClickBoarding'
import { NewPasswordSetPage } from './Authenticated/Onboarding/NewPasswordSetPage'
import { QuickOnboardingPage } from './Authenticated/Onboarding/Password/QuickOnboardingPage'
import { AdvancedBoardingPage } from './Authenticated/Onboarding/Password/AdvancedBoardingPage'
import { PasswordResetPage } from './Authenticated/Onboarding/Password/PasswordResetPage'

export default function AppRouter() {
  return <RouterProvider key="app-router" router={appRouter} />
}

const appRouter = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <Protected />,
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
          {
            path: DASHBOARD,
            element: <WithNavigation content={<DashboardPage />} />,
          },
          {
            path: NODE_CLAIM,
            element: <NodeClaimPage />,
          },
          {
            path: HISTORY,
            element: <WithNavigation content={<HistoryPage />} />,
          },
          {
            path: SETTINGS,
            element: <WithNavigation content={<SettingsPage />} />,
            children: [
              {
                path: SETTINGS_ACCOUNT,
                element: <SettingsPage />,
              },
              {
                path: SETTINGS_TRAFFIC,
                element: <SettingsPage />,
              },
              {
                path: SETTINGS_ADVANCED,
                element: <SettingsPage />,
              },
            ],
          },
          {
            path: TRANSACTIONS,
            element: <WithNavigation content={<TransactionsPage />} />,
          },
          {
            path: SESSIONS_SIDE,
            element: <WithNavigation content={<DashboardPage />} />,
          },
          {
            path: ADMIN,
            element: <WithNavigation content={<AdminPage />} />,
          },
          {
            path: ROUTES.STORYBOOK,
            element: <WithNavigation content={<StorybookPage />} />,
            children: [...Object.keys(STORYBOOK_ROUTES).map((path) => ({ path: path, element: <StorybookPage /> }))],
          },
          {
            path: NEW_PASSWORD,
            element: <NewPasswordSetPage />,
          },
          {
            path: ROUTES.QUICK_ONBOARDING,
            element: <QuickOnboardingPage />,
          },
          {
            path: ROUTES.ADVANCED_ONBOARDING,
            element: <AdvancedBoardingPage />,
          },
          {
            path: ROUTES.PASSWORD_RESET,
            element: <PasswordResetPage />,
          },
        ],
      },
      {
        path: ROUTES.CLICKBOARDING,
        element: <ClickBoarding />,
      },
      {
        path: ROUTES.AUTH_SSO,
        element: <SSOPage />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
])
