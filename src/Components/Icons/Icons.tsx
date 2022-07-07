/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'
import { ReactComponent as DashboardNavSvg } from '../../assets/images/navigation/dashboard.svg'
import { ReactComponent as HistoryNavSvg } from '../../assets/images/navigation/history.svg'
import { ReactComponent as SettingsNavSvg } from '../../assets/images/navigation/settings.svg'
import { ReactComponent as TransactionsNavSvg } from '../../assets/images/navigation/transactions.svg'
import { ReactComponent as BugNavSvg } from '../../assets/images/navigation/bug.svg'
import { ReactComponent as ChatNavSvg } from '../../assets/images/navigation/chat.svg'
import { ReactComponent as InfoSvg } from '../../assets/images/info.svg'
import { ReactComponent as ClockSvg } from '../../assets/images/clock.svg'
import { ReactComponent as DataSvg } from '../../assets/images/data.svg'
import { ReactComponent as PeopleSvg } from '../../assets/images/people.svg'
import { ReactComponent as WalletSvg } from '../../assets/images/wallet.svg'
import { ReactComponent as StopwatchSvg } from '../../assets/images/stopwatch.svg'
import { ReactComponent as CloudSvg } from '../../assets/images/cloud.svg'
import { ReactComponent as StopwatchSimpleSvg } from '../../assets/images/stopwatch_simple.svg'
import { ReactComponent as QualityBarsSvg } from '../../assets/images/quality-bars.svg'
import { ReactComponent as InputEmailSvg } from '../../assets/images/input/email.svg'
import { ReactComponent as InputCopyToClipboardSvg } from '../../assets/images/input/copy-to-clipboard.svg'
import { ReactComponent as InputLockSvg } from '../../assets/images/input/lock.svg'
import themes from '../../commons/themes'

interface NavProps {
  $active?: boolean
}

const navIconCss = css<NavProps>`
  rect {
    opacity: ${({ $active }) => ($active ? 1 : 0.05)};
  }
  path {
    stroke: ${({ $active }) => ($active ? themes.current().colorNavActiveStroke : themes.current().colorNavStroke)};
  }
`

export const DashboardNavIcon = styled(DashboardNavSvg)<NavProps>`
  ${navIconCss}
`

export const SessionsNavIcon = styled(HistoryNavSvg)<NavProps>`
  ${navIconCss}
`

export const WalletNavIcon = styled(TransactionsNavSvg)<NavProps>`
  ${navIconCss}
`

export const SettingsNavIcon = styled(SettingsNavSvg)<NavProps>`
  ${navIconCss}
`

export const BugNavIcon = styled(BugNavSvg)<NavProps>`
  ${navIconCss}
`

export const ChatNavIcon = styled(ChatNavSvg)<NavProps>`
  ${navIconCss}
`

interface InfoProps {
  $inverted?: boolean
}

export const InfoIcon = styled(InfoSvg)<InfoProps>`
  path {
    fill: ${({ $inverted }) => ($inverted ? themes.current().colorWhite : themes.current().colorGrayBlue)};
  }
`

interface AccentedProps {
  $accented?: boolean
}

interface InactiveProps {
  $inactive?: boolean
}

export const ClockIcon = styled(ClockSvg)<InactiveProps>`
  ${({ $inactive }) => $inactive && walletInactiveCss}
`
export const DataIcon = styled(DataSvg)<InactiveProps>`
  ${({ $inactive }) => $inactive && walletInactiveCss}
`
export const PeopleIcon = styled(PeopleSvg)<InactiveProps>`
  ${({ $inactive }) => $inactive && walletInactiveCss}
`
export const StopwatchIcon = styled(StopwatchSvg)``
export const CloudIcon = styled(CloudSvg)``

const headerCSS = css`
  rect {
    opacity: 1;
    fill: ${themes.current().colorKey};
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

export const WalletIcon = styled(WalletSvg)<AccentedProps & InactiveProps>`
  ${({ $accented }) => $accented && walletIconAccentedCss}
  ${({ $inactive }) => $inactive && walletInactiveCss}
`
const walletIconAccentedCss = css<AccentedProps>`
  width: 50px;
  height: 50px;
  circle {
    fill: ${themes.current().colorKey};
    opacity: 1;
  }
  #outline {
    stroke: ${themes.current().colorKeyLight};
  }
  #buckle,
  #pocket {
    stroke: ${themes.current().colorWhite};
  }
`

const walletInactiveCss = css<InactiveProps>`
  g {
    opacity: 0.5;
  }
  circle {
    fill: ${themes.current().colorGrayBlue};
  }
  path,
  ellipse {
    stroke: ${themes.current().colorGrayBlue};
  }
`

export const SessionsIcon = styled(HistoryNavSvg)<AccentedProps>`
  rect {
    fill: ${themes.current().colorKeyLight};
    opacity: 1;
  }
  #l1,
  #l3,
  #d2 {
    opacity: 0.5;
  }
`

export const StopwatchSimpleIcon = styled(StopwatchSimpleSvg)``

interface QualityBarsProps {
  $quality?: number
}

export const QualityBarsIcon = styled(QualityBarsSvg)<QualityBarsProps>`
  rect {
    fill: ${themes.current().colorKeyLight}33;
  }
  #bar-1 {
    fill: ${({ $quality = 0 }) => $quality > 0 && themes.current().colorKey} !important;
  }
  #bar-2 {
    fill: ${({ $quality = 0 }) => $quality > 1 && themes.current().colorKey} !important;
  }
  #bar-3 {
    fill: ${({ $quality = 0 }) => $quality > 2 && themes.current().colorKey} !important;
  }
`

interface InputIconProps {
  $noCircle?: boolean
}

export const InputEmailIcon = styled(InputEmailSvg)<InputIconProps>`
  display: flex;
  width: 100%;
  height: 100%;
  circle {
    opacity: ${({ $noCircle }) => $noCircle && 0};
  }
`

export const InputCopyToClipboardIcon = styled(InputCopyToClipboardSvg)<InputIconProps>`
  display: flex;
  width: 100%;
  height: 100%;
  circle {
    opacity: ${({ $noCircle }) => $noCircle && 0};
  }
`

export const InputLockIcon = styled(InputLockSvg)<InputIconProps>`
  display: flex;
  width: 100%;
  height: 100%;
  circle {
    opacity: ${({ $noCircle }) => $noCircle && 0};
  }
`
