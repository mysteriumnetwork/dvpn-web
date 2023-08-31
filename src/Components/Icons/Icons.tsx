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
import { ReactComponent as DragIndicatorSvg } from '../../assets/images/drag-indicator.svg'
import { ReactComponent as FileSvg } from '../../assets/images/file.svg'
import { ReactComponent as ChatSvg } from '../../assets/images/chat.svg'
import { ReactComponent as QuestionSvg } from '../../assets/images/question.svg'
import { ReactComponent as MystnodesSvg } from '../../assets/images/mystnodes.svg'

import { themeCommon } from '../../theme/themeCommon'

interface InfoProps {
  $inverted?: boolean
}

export const InfoIcon = styled(InfoSvg)<InfoProps>`
  path {
    fill: ${({ $inverted }) => ($inverted ? themeCommon.colorWhite : themeCommon.colorGrayBlue)};
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
    fill: ${themeCommon.colorKey};
    opacity: 1;
  }
  #outline {
    stroke: ${themeCommon.colorKeyLight};
  }
  #buckle,
  #pocket {
    stroke: ${themeCommon.colorWhite};
  }
`

const walletInactiveCss = css<InactiveProps>`
  g {
    opacity: 0.5;
  }
  circle {
    fill: ${themeCommon.colorGrayBlue};
  }
  path,
  ellipse {
    stroke: ${themeCommon.colorGrayBlue};
  }
`

export const SessionsIcon = styled(HistoryNavSvg)<AccentedProps>`
  rect {
    fill: ${themeCommon.colorKeyLight};
    opacity: 1;
  }
  #l1,
  #l3,
  #d2 {
    opacity: 0.5;
  }
`

export const StopwatchSimpleIcon = styled(StopwatchSimpleSvg)``

export const DragIndicatorIcon = styled(DragIndicatorSvg)``

export const FileIcon = styled(FileSvg)``

export const ChatIcon = styled(ChatSvg)``

export const QuestionIcon = styled(QuestionSvg)``

export const MystnodesIcon = styled(MystnodesSvg)`
  width: 24px;
  height: 24px;
`
