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
}

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
