/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Layout, LayoutRow } from '../Components/Layout/Layout'
import React, { useMemo } from 'react'
import { NavLinkTabs } from '../../../Components/Tabs/NavLinkTabs'
import ROUTES from '../../../constants/routes'
import { useLocation } from 'react-router-dom'

interface RouteInfo {
  title: string
  component: string
}

const subRoute = (subRoute: string): string => `${ROUTES.STORYBOOK}${subRoute}`

export const STORYBOOK_ROUTES: { [key: string]: RouteInfo } = {
  [subRoute('/buttons')]: {
    component: './Items/ButtonsBook',
    title: 'Buttons',
  },
  [subRoute('/indicators')]: {
    component: './Items/IndicatorsBook',
    title: 'Indicators',
  },
  [subRoute('/nat-tooltips')]: {
    component: './Items/TooltipsBook',
    title: 'Tooltips',
  },
  [subRoute('/notifications')]: {
    component: './Items/NotificationsBook',
    title: 'Notifications',
  },
  [subRoute('/inputs')]: {
    component: './Items/InputsBook',
    title: 'Inputs',
  },
  [subRoute('/password-change')]: {
    component: './Items/PasswordChangeBook',
    title: 'PasswordChange',
  },
  [subRoute('/progress-bar')]: {
    component: './Items/ProgressBarBook',
    title: 'Progress',
  },
}

const toTabs = () =>
  Object.keys(STORYBOOK_ROUTES).map((path) => ({
    name: STORYBOOK_ROUTES[path].title,
    to: path,
  }))

export const StorybookPage = () => {
  const location = useLocation()

  const tabs = useMemo(() => toTabs(), [STORYBOOK_ROUTES])

  const TabComponent = useMemo(() => {
    return React.lazy(() => {
      if (location.pathname === ROUTES.STORYBOOK) {
        return import('./Items/Greeting')
      }
      return import(`${STORYBOOK_ROUTES[location.pathname].component}`).catch(() => import('./Items/Oops'))
    })
  }, [location.pathname])

  return (
    <Layout title="Storybook">
      <LayoutRow>
        <NavLinkTabs tabs={tabs} />
      </LayoutRow>
      <React.Suspense>
        <TabComponent />
      </React.Suspense>
    </Layout>
  )
}
