/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'
import { ReactComponent as HistoryNavSvg } from '../../assets/images/navigation/history.svg'
import { ReactComponent as InfoSvg } from '../../assets/images/info.svg'
import { ReactComponent as ClockSvg } from '../../assets/images/clock.svg'
import { ReactComponent as DataSvg } from '../../assets/images/data.svg'
import { ReactComponent as PeopleSvg } from '../../assets/images/people.svg'
import { ReactComponent as WalletSvg } from '../../assets/images/wallet.svg'
import { ReactComponent as StopwatchSvg } from '../../assets/images/stopwatch.svg'
import { ReactComponent as CloudSvg } from '../../assets/images/cloud.svg'
import { ReactComponent as StopwatchSimpleSvg } from '../../assets/images/stopwatch_simple.svg'
import { ReactComponent as QualityBarsSvg } from '../../assets/images/quality-bars.svg'
import { ReactComponent as DragIndicatorSvg } from '../../assets/images/drag-indicator.svg'
import themes from '../../commons/themes'

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

export const DragIndicatorIcon = styled(DragIndicatorSvg)``
