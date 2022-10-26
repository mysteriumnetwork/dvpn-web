/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  DashboardNavIcon,
  SessionsNavIcon,
  SettingsNavIcon,
  WalletNavIcon,
} from '../../../Components/Icons/NavigationIcons'

import {
  DASHBOARD,
  HISTORY,
  SETTINGS,
  SETTINGS_ACCOUNT,
  SETTINGS_ADVANCED,
  SETTINGS_TRAFFIC,
  TRANSACTIONS,
} from '../../../constants/routes'
import { ReportIssue } from '../Components/ReportIssue/ReportIssue'
import { ThemeSwitch } from '../Components/ThemeSwitch/ThemeSwitch'
import { Chat } from '../Components/Chat/Chat'

interface LinkDefinition {
  name?: string
  dataTestId?: string
  icon: any
  path: string
  subPaths?: string[]
}
interface ControllerDefinition {
  dataTestId?: string
  name: string
  component: any
}

export const LINK_DEFINITIONS: LinkDefinition[] = [
  {
    name: 'Dashboard',
    dataTestId: 'DesktopNavigation.dashboardLink',
    icon: DashboardNavIcon,
    path: DASHBOARD,
  },
  {
    name: 'History',
    dataTestId: 'DesktopNavigation.historyLink',
    icon: SessionsNavIcon,
    path: HISTORY,
  },
  {
    name: 'Transactions',
    dataTestId: 'DesktopNavigation.transactionsLink',
    icon: WalletNavIcon,
    path: TRANSACTIONS,
  },
  {
    name: 'Settings',
    dataTestId: 'DesktopNavigation.settingsLink',
    icon: SettingsNavIcon,
    path: SETTINGS,
    subPaths: [SETTINGS_ACCOUNT, SETTINGS_ADVANCED, SETTINGS_TRAFFIC],
  },
]
export const CONTROLLER_DEFINITIONS: ControllerDefinition[] = [
  {
    name: 'Report Issue',
    dataTestId: 'DesktopNavigation.reportIssue',
    component: ReportIssue,
  },
  {
    name: 'Chat',
    dataTestId: 'DesktopNavigation.chat',
    component: Chat,
  },
  {
    name: 'Dark Mode',
    dataTestId: 'DesktopNavigation.darkMode',
    component: ThemeSwitch,
  },
]
