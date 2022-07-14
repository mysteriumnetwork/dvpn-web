/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Theme } from '../types/theme'
import { alphaToHex, themeCommon } from './themeCommon'

const light: Omit<Theme, 'common'> = {
  bgNavigation: themeCommon.backgroundMysterium,
  bgLayout: themeCommon.colorLightBlue,
  bgLayoutHeroRow: themeCommon.colorGrayBlue + alphaToHex(0.1),
  bgLayoutCardCss: themeCommon.colorWhite,

  bgServiceCardHeader: themeCommon.colorWhite,
  bgServiceCardContent: themeCommon.colorLightBlue,

  bgSettingsCard: themeCommon.colorWhite,

  bgReportChartRow: themeCommon.colorWhite,
  bgReportChartRowBoxShadow: '0 10px 30px ' + themeCommon.color4e1c67 + alphaToHex(0.05),

  bgReportCardDiffPositive: themeCommon.colorGreen + alphaToHex(0.1),

  bgTransactionPageCard: themeCommon.colorWhite,
  bgTransactionPageCardBoxShadow: '0px 5px 20px ' + themeCommon.color221E39 + alphaToHex(0.02),

  table: {
    bgBody: themeCommon.colorWhite,
    bgRowOdd: themeCommon.colorLightBlue + alphaToHex(0.2),
    bgRowEven: themeCommon.colorLightBlue + alphaToHex(0.5),
  },
  text: {
    colorMain: themeCommon.colorDarkBlue,
    colorSecondary: themeCommon.colorGrayBlue2,
  },

  modal: {
    bgOverlay: themeCommon.colorDarkBlue + alphaToHex(0.5),
    bgColor: themeCommon.colorWhite,
    boxShadow: '0px 5px 20px ' + themeCommon.color221E39 + alphaToHex(0.1),
  },

  textInput: {
    textColor: themeCommon.colorGrayBlue2,
    textColorDisabled: themeCommon.colorGrayBlue,
    background: themeCommon.colorWhite,
    backgroundDisabled: themeCommon.colorLightBlue,
    border: '1px solid ' + themeCommon.colorGrayBlue2,
    borderDisabled: '1px solid ' + themeCommon.colorGrayBlue,

    textColorError: themeCommon.colorKey,
    backgroundError: themeCommon.colorKey + alphaToHex(0.1),
    borderError: '1px solid ' + themeCommon.colorKey,
  },

  inputIcon: {
    fill: themeCommon.colorGrayBlue2,
    fillDisabled: themeCommon.colorLightBlue,
    fillError: themeCommon.colorKey,

    stroke: themeCommon.colorWhite,
    strokeDisabled: themeCommon.colorGrayBlue,
    strokeError: themeCommon.colorWhite,
  },

  dndList: {
    textColor: themeCommon.colorGrayBlue2,
    background: themeCommon.colorLightBlue + alphaToHex(0.5),
  },

  nodeStatus: {
    background: {
      monitoringFailed: themeCommon.colorKey,
      offline: themeCommon.colorGrayBlue,
      online: themeCommon.colorGreen,
    },
    textColor: {
      monitoringFailed: themeCommon.colorWhite,
      offline: themeCommon.colorWhite,
      online: themeCommon.colorWhite,
    },
  },
}

export default light
