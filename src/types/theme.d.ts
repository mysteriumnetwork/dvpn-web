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

  table: {
    bgBody: string
    bgRowOdd: string
    bgRowEven: string
  }
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

  nodeStatus: {
    background: {
      online: string
      offline: string
      monitoringFailed: string
    }
    textColor: {
      online: string
      offline: string
      monitoringFailed: string
    }
  }

  notifications: {
    background: string
    border: string

    list: {
      background: string
      boxShadow: string
    }

    card: {
      subjectTextColor: string
      messageTextColor: string
      positive: {
        background: string
      }
      negative: {
        background: string
      }
      neutral: {
        background: string
      }
    }
  }

  common: Common
}

export type Common = {
  backgroundMysterium: string

  colorKey: string
  colorKeyLight: string
  colorDarkBlue: string
  colorGrayBlue: string
  colorGrayBlue2: string
  colorWhite: string
  colorGreen: string
  colorLightGreen: string
  colorBlue: string
  colorLightBlue: string

  colorNavStroke: string
  colorNavActiveStroke: string

  color221E39: string
  color2F2A48: string
  color393453: string
  color4e1c67: string
  color231F3A: string
  color3B3755: string

  fontSizeSmallest: string
  fontSizeSmaller: string
  fontSizeSmall: string
  fontSizeNormal: string
  fontSizeBigger: string
  fontSizeBig: string
  fontSizeHuge: string
}

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
