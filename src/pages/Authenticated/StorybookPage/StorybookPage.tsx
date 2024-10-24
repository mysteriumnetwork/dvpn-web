/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useMemo } from 'react'
import { NavLinkTabs } from '../../../components/Tabs/NavLinkTabs'
import ROUTES from '../../../constants/routes'
import { useLocation } from 'react-router-dom'
import { STORYBOOK_ROUTES } from './storybook.routes'
import { PageLayout } from '../../components/Layout/PageLayout'
import Title from '../../../components/Typography/Title'

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
    <PageLayout wideContent>
      <Title value="Storybook" />
      <NavLinkTabs tabs={tabs} />
      <React.Suspense>
        <TabComponent />
      </React.Suspense>
    </PageLayout>
  )
}
