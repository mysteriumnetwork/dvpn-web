/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Theme } from '../types/theme'
import { alphaToHex } from './themeCommon'
import { themeCommon } from './themeCommon'

const dark: Omit<Theme, 'common'> = {
  bgNavigation: themeCommon.color221E39,
  bgLayout: themeCommon.color2F2A48,
  bgLayoutHeroRow: themeCommon.color221E39,
  bgLayoutCardCss: themeCommon.color393453,
  bgServiceCardHeader: themeCommon.color393453,

  bgServiceCardContent: themeCommon.color393453,
  bgSettingsCard: themeCommon.color393453,

  bgReportChartRow: themeCommon.color393453,

  bgReportChartRowBoxShadow: '0 10px 20px ' + themeCommon.color221E39 + alphaToHex(0.4),
  bgReportCardDiffPositive: themeCommon.colorGreen + alphaToHex(0.1),

  bgTransactionPageCard: themeCommon.color393453,

  bgTransactionPageCardBoxShadow: '0px 10px 20px ' + themeCommon.color221E39 + alphaToHex(0.4),
  bgHistoryTable: themeCommon.color393453,

  text: {
    colorMain: themeCommon.colorLightBlue,
    colorSecondary: themeCommon.colorGrayBlue,
  },

  modal: {
    bgOverlay: themeCommon.color231F3A + alphaToHex(0.8),
    bgColor: themeCommon.color393453,
    boxShadow: '0px 10px 20px ' + themeCommon.color221E39 + alphaToHex(0.4),
  },

  textInput: {
    textColor: themeCommon.colorGrayBlue,
    textColorDisabled: '',
    background: themeCommon.colorDarkBlue,
    backgroundDisabled: themeCommon.colorDarkBlue,
    border: '1px solid ' + themeCommon.colorGrayBlue,
    borderDisabled: '1px solid ' + themeCommon.colorGrayBlue2,

    textColorError: themeCommon.colorKey,
    backgroundError: themeCommon.colorKeyLight + alphaToHex(0.1),
    borderError: '1px solid ' + themeCommon.colorKey,
  },

  inputIcon: {
    fill: themeCommon.colorGrayBlue2,
    fillDisabled: themeCommon.colorGrayBlue2,
    fillError: themeCommon.colorKey,

    stroke: themeCommon.colorGrayBlue,
    strokeDisabled: themeCommon.colorGrayBlue,
    strokeError: themeCommon.colorWhite,
  },

  dndList: {
    textColor: themeCommon.colorLightBlue,
    background: themeCommon.colorGrayBlue + alphaToHex(0.1),
  },

  nodeStatus: {
    background: {
      monitoringFailed: themeCommon.colorKey,
      offline: themeCommon.colorGrayBlue2,
      online: themeCommon.colorGreen,
    },
    textColor: {
      monitoringFailed: themeCommon.colorWhite,
      offline: themeCommon.colorGrayBlue,
      online: themeCommon.colorWhite,
    },
  },
}

export default dark
