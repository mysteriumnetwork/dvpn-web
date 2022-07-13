/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'styled-components'

export type Theme = {
  bgNavigation: string
  bgLayout: string
  bgLayoutHeroRow: string
  bgLayoutCardCss: string

  bgServiceCardHeader: string
  bgServiceCardContent: string

  bgSettingsCard: string

  bgReportChartRow: string
  bgReportChartRowBoxShadow: string

  bgReportCardDiffPositive: string

  bgTransactionPageCard: string
  bgTransactionPageCardBoxShadow: string

  modal: {
    bgOverlay: string
    bgColor: string
    boxShadow: string
  }

  text: {
    colorMain: string
    colorSecondary: string
  }

  inputIcon: {
    fill: string
    fillDisabled: string
    fillError: string

    stroke: string
    strokeDisabled: string
    strokeError: string
  }

  textInput: {
    textColor: string
    textColorDisabled: string
    textColorError: string

    background: string
    backgroundDisabled: string
    backgroundError: string

    border: string
    borderDisabled: string
    borderError: string
  }

  dndList: {
    textColor: string
    background: string
  }
}

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
