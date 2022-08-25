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
  bgServiceCardHeaderBoxShadow: '0 10px 30px' + themeCommon.color000065 + alphaToHex(0.05),
  bgServiceCardContent: themeCommon.colorLightBlue,
  bgServiceCardContentBoxShadow: '0 5px 20px' + themeCommon.color000065 + alphaToHex(0.02),
  bgServiceCardContentMobile: themeCommon.colorWhite,
  bgSettingsCard: themeCommon.colorWhite,

  bgReportChartRow: themeCommon.colorWhite,
  bgReportChartRowBoxShadow: '0 10px 30px ' + themeCommon.color4e1c67 + alphaToHex(0.05),

  bgReportCardDiffPositive: themeCommon.colorGreen + alphaToHex(0.1),
  bgSettlementMobile: themeCommon.colorWhite,
  bgTransactionPageCard: themeCommon.colorWhite,
  bgTransactionPageCardBoxShadow: '0px 5px 20px ' + themeCommon.color221E39 + alphaToHex(0.02),

  buttons: {
    disabledOpacity: '0.7',

    outlined: {
      hoverBackgroundColor: themeCommon.colorKeyLight + alphaToHex(0.1),
    },
  },

  table: {
    bgBody: themeCommon.colorWhite,
    bgRowOdd: themeCommon.colorLightBlue + alphaToHex(0.2),
    bgRowEven: themeCommon.colorLightBlue + alphaToHex(0.5),
    textColorPrimary: themeCommon.colorDarkBlue,
    textColorSecondary: themeCommon.colorDarkBlue,
    mobileCard: {
      textColorPrimary: themeCommon.colorDarkBlue,
      textColorSecondary: themeCommon.colorGrayBlue,
    },
  },
  text: {
    colorMain: themeCommon.colorDarkBlue,
    colorSecondary: themeCommon.colorGrayBlue2,
  },
  navTab: {
    bgColor: themeCommon.colorWhite,
    textColor: themeCommon.colorDarkBlue,
  },
  settleModal: {
    card: {
      titleColor: themeCommon.colorGrayBlue2,
      amountColor: themeCommon.colorDarkBlue,
    },
  },
  idleStat: {
    bubbleTextColor: themeCommon.colorDarkBlue,
  },
  TOSModal: {
    textColor: themeCommon.colorDarkBlue,
  },
  settleCard: {
    earningsColor: themeCommon.colorDarkBlue,
  },
  scrollBar: {
    trackColor: 'f1f1f1f1',
    handleColor: themeCommon.colorLightBlue,
    handleColorHover: themeCommon.colorDarkBlue,
  },
  calendar: {
    bgBody: themeCommon.colorWhite,
    bgHeader: themeCommon.colorWhite,
    textColor: themeCommon.colorGrayBlue2,
    inputColor: themeCommon.colorGrayBlue2,
  },
  modal: {
    bgOverlay: themeCommon.colorDarkBlue + alphaToHex(0.5),
    bgColor: themeCommon.colorWhite,
    titleColor: themeCommon.colorDarkBlue,
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

  notifications: {
    background: themeCommon.colorKey,
    list: {
      background: themeCommon.colorWhite,
      boxShadow: '0px 5px 20px ' + themeCommon.color2F2A48 + alphaToHex(0.2),
    },

    card: {
      subjectTextColor: themeCommon.colorDarkBlue,
      messageTextColor: themeCommon.colorGrayBlue,
      positive: {
        background: themeCommon.colorGreen + alphaToHex(0.2),
      },
      negative: {
        background: themeCommon.colorKey + alphaToHex(0.2),
      },
      neutral: {
        background: themeCommon.colorGrayBlue + alphaToHex(0.2),
      },
      update: {
        background: themeCommon.colorYellow + alphaToHex(0.1),
      },
    },
  },

  tooltip: {
    textColor: themeCommon.colorGrayBlue,
    background: themeCommon.colorWhite,
    boxShadow: '0 4px 4px' + themeCommon.color000065 + alphaToHex(0.5),
  },

  nat: {
    background: themeCommon.colorLightBlue,
  },

  indicator: {
    ok: {
      color: themeCommon.colorGreen,
    },
    warning: {
      color: themeCommon.colorYellow,
    },
    error: {
      color: themeCommon.colorRed,
    },
    holeBackground: themeCommon.colorWhite,
  },

  a: {
    textColor: themeCommon.colorKey,
  },

  toasts: {
    success: {
      iconBackground: themeCommon.colorGreen + alphaToHex(0.3),
    },
    warning: {
      iconBackground: themeCommon.colorYellow + alphaToHex(0.3),
    },
    info: {
      iconBackground: themeCommon.colorBlue + alphaToHex(0.3),
    },
    error: {
      iconBackground: themeCommon.colorRed + alphaToHex(0.3),
    },
    background: themeCommon.colorWhite,
    contentTextColor: themeCommon.colorGrayBlue2,
    closeButtonColor: themeCommon.colorGrayBlue2,
  },

  dropdown: {
    valueTextColor: themeCommon.colorDarkBlue,
    placeholderTextColor: themeCommon.colorGrayBlue2,
    border: `1px solid ${themeCommon.colorGrayBlue}`,
    backgroundColor: themeCommon.colorWhite,
    selectedOrFocusedValueColor: themeCommon.colorWhite,
    selectedValueBackgroundColor: themeCommon.colorKey,
    focusedValueBackgroundColor: themeCommon.colorKeyLight,
  },
}

export default light
