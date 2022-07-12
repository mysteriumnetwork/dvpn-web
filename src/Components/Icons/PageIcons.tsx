/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'
import themes from '../../commons/themes'
import { ReactComponent as DashboardNavSvg } from '../../assets/images/navigation/dashboard.svg'
import { ReactComponent as SettingsNavSvg } from '../../assets/images/navigation/settings.svg'
import { ReactComponent as HistoryNavSvg } from '../../assets/images/navigation/history.svg'
import { ReactComponent as TransactionsNavSvg } from '../../assets/images/navigation/transactions.svg'

const headerCSS = css`
  rect {
    opacity: 1;
    fill: ${themes.common.colorKey};
  }
`

export const DashboardHeaderIcon = styled(DashboardNavSvg)`
  ${headerCSS}
`
export const SettingsHeaderIcon = styled(SettingsNavSvg)`
  ${headerCSS}
`

export const HistoryHeaderIcon = styled(HistoryNavSvg)`
  ${headerCSS}
`

export const TransactionsHeaderIcon = styled(TransactionsNavSvg)`
  ${headerCSS}
`
