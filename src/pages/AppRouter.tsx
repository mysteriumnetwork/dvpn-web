/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { RouterProvider, createHashRouter, Outlet } from 'react-router-dom'
import ROUTES, {
  ADMIN,
  DASHBOARD,
  EARNINGS,
  HELP,
  IDENTITY,
  NEW_PASSWORD,
  NODE_CLAIM,
  SESSIONS,
  SETTINGS,
} from '../constants/routes'

import LoginPage from './Login/LoginPage'
import { Layout } from './Layout'
import { ErrorBoundary } from './ErrorBoundary'
import { Protected } from './ProtectedRoute'
import NodePage from './Authenticated/NodePage/NodePage'
import IdentityPage from './Authenticated/IdentityPage/IdentityPage'
import EarningsPage from './Authenticated/EarningsPage/EarningsPage'
import SettingsPage from './Authenticated/SettingsPage/SettingsPage'
import HelpPage from './Authenticated/HelpPage/HelpPage'
import { AdminPage } from './Authenticated/AdminPage/AdminPage'
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
import SessionsPage from './Authenticated/SessionsPage/SessionsPage'
import { Onboarding } from './Authenticated/Onboarding/Onboarding'

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
            element: (
              <>
                <Outlet />
                <Onboarding />
              </>
            ),
            children: [
              {
                path: DASHBOARD,
                element: <NodePage />,
              },
              {
                path: IDENTITY,
                element: <IdentityPage />,
              },
              {
                path: EARNINGS,
                element: <EarningsPage />,
              },
              {
                path: SETTINGS,
                element: <SettingsPage />,
              },
              {
                path: SESSIONS,
                element: <SessionsPage />,
              },
              {
                path: HELP,
                element: <HelpPage />,
              },
            ],
          },
          {
            path: ADMIN,
            element: <AdminPage />,
          },
          {
            path: ROUTES.STORYBOOK,
            element: <StorybookPage />,
            children: [...Object.keys(STORYBOOK_ROUTES).map((path) => ({ path: path, element: <StorybookPage /> }))],
          },
          {
            path: NODE_CLAIM,
            element: <NodeClaimPage />,
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
