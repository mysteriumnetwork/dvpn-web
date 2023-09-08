/**
 * Copyright (c) 2023 BlockDev AG
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
import { Chat } from '../Components/Chat/Chat'
import { LogoutButton } from './LogoutButton'

interface LinkDefinition {
  name?: string
  icon: any
  path: string
  subPaths?: string[]
}
interface ControllerDefinition {
  name: string
  component: any
}

export const LINK_DEFINITIONS: LinkDefinition[] = [
  {
    name: 'Dashboard',
    icon: DashboardNavIcon,
    path: DASHBOARD,
  },
  {
    name: 'History',
    icon: SessionsNavIcon,
    path: HISTORY,
  },
  {
    name: 'Transactions',
    icon: WalletNavIcon,
    path: TRANSACTIONS,
  },
  {
    name: 'Settings',
    icon: SettingsNavIcon,
    path: SETTINGS,
    subPaths: [SETTINGS_ACCOUNT, SETTINGS_ADVANCED, SETTINGS_TRAFFIC],
  },
]
export const DESKTOP_CONTROLLER_DEFINITIONS: ControllerDefinition[] = [
  {
    name: 'Report Issue',
    component: ReportIssue,
  },
  {
    name: 'Chat',
    component: Chat,
  },
  {
    name: 'Logout',
    component: LogoutButton,
  },
]
export const MOBILE_CONTROLLER_DEFINITIONS: ControllerDefinition[] = [
  {
    name: 'Report Issue',
    component: ReportIssue,
  },
  {
    name: 'Chat',
    component: Chat,
  },
  {
    name: 'Logout',
    component: LogoutButton,
  },
]
