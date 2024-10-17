/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import MenuItem from './MenuItem'
import {
  CircledQuestionMarkIcon,
  ConnectedPointsIcon,
  GearIcon,
  IdentityCardIcon,
  LogoutIcon,
  MoneyPouchIcon,
  NodeIcon,
} from '../../../components/Icons/Icons'
import complexActions from '../../../redux/complex.actions'
import routes from '../../../constants/routes'

const MENU_ITEMS = [
  {
    title: 'Node',
    icon: NodeIcon,
    path: routes.DASHBOARD,
  },
  {
    title: 'Identity',
    icon: IdentityCardIcon,
    path: routes.IDENTITY,
  },
  {
    title: 'Earnings',
    icon: MoneyPouchIcon,
    path: routes.EARNINGS,
  },
  {
    title: 'Sessions',
    icon: ConnectedPointsIcon,
    path: routes.SESSIONS,
  },
  {
    title: 'Settings',
    icon: GearIcon,
    path: routes.SETTINGS,
  },
  {
    title: 'Help',
    icon: CircledQuestionMarkIcon,
    path: routes.HELP,
  },
]

type Props = {
  readonly className?: string
}

export function Menu({ className }: Props) {
  const { pathname } = useLocation()

  return (
    <div className={twMerge('flex flex-col', className)}>
      {MENU_ITEMS.map((x) => (
        <MenuItem title={x.title} SvgIcon={x.icon} path={x.path} key={x.title} active={pathname === x.path} />
      ))}
      <MenuItem
        title="Logout"
        path="/"
        SvgIcon={LogoutIcon}
        onClick={complexActions.logout}
        className="border-solid border-t border-blue-175 rounded-r-none md:rounded-r-none mt-2.5 md:mt-0 md:pt-6"
      />
    </div>
  )
}

export default Menu
