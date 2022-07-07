/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Layout, LayoutUnstyledRow } from '../Components/Layout/Layout'
import { SettingsHeaderIcon } from '../../../Components/Icons/PageIcons'
import { NavLinkTabs } from '../../../Components/Tabs/NavLinkTabs'
import React, { useMemo } from 'react'
import { SETTINGS, SETTINGS_ACCOUNT, SETTINGS_ADVANCED, SETTINGS_TRAFFIC } from '../../../constants/routes'
import { useLocation } from 'react-router-dom'
import { useFetch } from '../../../commons/hooks'
import { tequila } from '../../../api/tequila'
import { NODE_HEALTH_CHECK_EMPTY } from '../../../constants/instances'
import { Issue } from './Issue'
import styled from 'styled-components'
import packageJson from '../../../../package.json'

const FlexGrow = styled.div`
  flex-grow: 1;
`

const PATH_TO_TAB = {
  [SETTINGS]: './Tabs/AccountTab',
  [SETTINGS_ACCOUNT]: './Tabs/AccountTab',
  [SETTINGS_TRAFFIC]: './Tabs/AccountTab',
}

export const SettingsPage = () => {
  const location = useLocation()

  const [data = NODE_HEALTH_CHECK_EMPTY, loading] = useFetch(() => tequila.api.healthCheck())

  const TabComponent = useMemo(
    () => React.lazy(() => import(`${PATH_TO_TAB[location.pathname]}`).catch(() => import('./Tabs/NotFoundTab'))),
    [location.pathname],
  )

  return (
    <Layout isLoading={loading} logo={<SettingsHeaderIcon />} title="Settings">
      <LayoutUnstyledRow>
        <NavLinkTabs
          tabs={[
            {
              name: 'Account',
              to: SETTINGS_ACCOUNT,
            },
            {
              name: 'Traffic',
              to: SETTINGS_TRAFFIC,
            },
            {
              name: 'Advanced',
              to: SETTINGS_ADVANCED,
            },
          ]}
        />
        <FlexGrow />
        <Issue nodeUIVersion={packageJson.version} nodeVersion={data.version} />
      </LayoutUnstyledRow>
      <React.Suspense>
        <TabComponent />
      </React.Suspense>
    </Layout>
  )
}
