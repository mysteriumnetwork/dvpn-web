/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ROUTES from '../../../constants/routes'

const subRoute = (subRoute: string): string => `${ROUTES.STORYBOOK}${subRoute}`

interface RouteInfo {
  title: string
  component: string
}

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
  [subRoute('/icons')]: {
    component: './Items/IconsBook',
    title: 'Icons',
  },
  [subRoute('/toasts')]: {
    component: './Items/ToastsBook',
    title: 'Toasts',
  },
  [subRoute('/dropdowns')]: {
    component: './Items/DropdownBook',
    title: 'Dropdown',
  },
  [subRoute('/colors')]: {
    component: './Items/ColorsBook',
    title: 'Colors',
  },
  [subRoute('/node-status')]: {
    component: './Items/NodeStatusBook',
    title: 'Node Status',
  },
  [subRoute('/pie-chart')]: {
    component: './Items/PieChartBook',
    title: 'Pie Charts',
  },
}
