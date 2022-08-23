/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Layout, LayoutRow } from '../Components/Layout/Layout'
import { SettingsHeaderIcon } from '../../../Components/Icons/PageIcons'
import { NavLinkTabs } from '../../../Components/Tabs/NavLinkTabs'
import React, { useMemo } from 'react'
import { SETTINGS, SETTINGS_ACCOUNT, SETTINGS_ADVANCED, SETTINGS_TRAFFIC } from '../../../constants/routes'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../../commons/hooks'
import { Issue } from './Issue'
import styled from 'styled-components'
import packageJson from '../../../../package.json'
import { selectors } from '../../../redux/selectors'
import { PowerOffButton } from '../../../Components/PowerOffButton/PowerOffButton'
import FEATURES from '../../../commons/features'
import { configs } from '../../../commons/config'
import { devices } from '../../../theme/themes'

const Row = styled(LayoutRow)`
  justify-content: space-between;

  @media ${devices.tablet} {
    flex-direction: column-reverse;
  }
`

const Grouped = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PATH_TO_TAB = {
  [SETTINGS]: './Tabs/AccountTab',
  [SETTINGS_ACCOUNT]: './Tabs/AccountTab',
  [SETTINGS_TRAFFIC]: './Tabs/TrafficTab',
  [SETTINGS_ADVANCED]: './Tabs/AdvancedTab',
}

export const SettingsPage = () => {
  const healthCheck = useAppSelector(selectors.healthCheck)

  const config = useAppSelector(selectors.currentConfig)
  const restartEnabled = configs.isFeatureEnabled(config, FEATURES.RESTART.name)

  const location = useLocation()
  const TabComponent = useMemo(
    () => React.lazy(() => import(`${PATH_TO_TAB[location.pathname]}`).catch(() => import('./Tabs/NotFoundTab'))),
    [location.pathname],
  )

  return (
    <Layout logo={<SettingsHeaderIcon />} title="Settings">
      <Row>
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
        <Grouped>
          <Issue nodeUIVersion={packageJson.version} nodeVersion={healthCheck.version} />
          {restartEnabled && <PowerOffButton />}
        </Grouped>
      </Row>
      <React.Suspense>
        <TabComponent />
      </React.Suspense>
    </Layout>
  )
}
