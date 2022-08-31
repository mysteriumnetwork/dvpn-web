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
  bgServiceCardHeader: themeCommon.color393453,
  bgServiceCardHeaderBoxShadow: '0 10px 20px' + themeCommon.color221E39 + alphaToHex(0.4),
  bgServiceCardContent: themeCommon.color393453,
  bgServiceCardContentBoxShadow: '0 5px 20px' + themeCommon.color000065 + alphaToHex(0.02),
  bgServiceCardContentMobile: themeCommon.color393453,

  bgSettingsCard: themeCommon.color393453,

  bgReportCardDiffPositive: themeCommon.colorGreen + alphaToHex(0.1),
  bgSettlementMobile: themeCommon.color444161,
  bgTransactionPageCard: themeCommon.color393453,

  bgTransactionPageCardBoxShadow: '0px 10px 20px ' + themeCommon.color221E39 + alphaToHex(0.4),

  navigation: {
    background: themeCommon.color221E39,
    contentBackground: themeCommon.color2F2A48,
  },

  layout: {
    row: {
      heroBackground: themeCommon.color221E39,
    },
  },

  liveSessions: {
    card: {
      background: themeCommon.color393453,
    },
  },

  report: {
    reportCardRowBackground: themeCommon.color393453,
    card: {
      background: themeCommon.color393453,
    },
    chart: {
      shadow: '0 10px 20px ' + themeCommon.color221E39 + alphaToHex(0.4),
      xTickFontColor: themeCommon.colorGrayBlue,
      yTickFontColor: themeCommon.colorGrayBlue,
    },
  },

  buttons: {
    disabledOpacity: '0.3',

    outlined: {
      hoverBackgroundColor: themeCommon.colorKeyLight + alphaToHex(0.1),
    },
  },

  table: {
    bgBody: themeCommon.color393453,
    bgRowOdd: themeCommon.colorGrayBlue2 + alphaToHex(0.1),
    bgRowEven: themeCommon.colorGrayBlue2 + alphaToHex(0.3),
    textColorPrimary: themeCommon.colorLightBlue,
    textColorSecondary: themeCommon.colorGrayBlue,
    mobileCard: {
      textColorPrimary: themeCommon.colorLightBlue,
      textColorSecondary: themeCommon.colorGrayBlue,
    },
  },
  scrollBar: {
    trackColor: themeCommon.colorGrayBlue2,
    handleColor: themeCommon.colorGrayBlue,
    handleColorHover: themeCommon.colorDarkBlue,
  },
  text: {
    colorMain: themeCommon.colorLightBlue,
    colorSecondary: themeCommon.colorGrayBlue,
  },
  navTab: {
    bgColor: themeCommon.colorDarkBlue,
    textColor: themeCommon.colorGrayBlue,
  },
  modal: {
    bgOverlay: themeCommon.color231F3A + alphaToHex(0.8),
    bgColor: themeCommon.color393453,
    titleColor: themeCommon.colorLightBlue,
    boxShadow: '0px 10px 20px ' + themeCommon.color221E39 + alphaToHex(0.4),
  },
  calendar: {
    bgHeader: themeCommon.colorGrayBlue2,
    bgBody: themeCommon.colorGrayBlue2,
    textColor: themeCommon.colorLightBlue,
    inputColor: themeCommon.colorGrayBlue,
  },
  TOSModal: {
    textColor: themeCommon.colorLightBlue,
  },
  idleStat: {
    bubbleTextColor: themeCommon.colorWhite,
  },
  settleModal: {
    card: {
      titleColor: themeCommon.colorGrayBlue,
      amountColor: themeCommon.colorLightBlue,
    },
  },
  settleCard: {
    earningsColor: themeCommon.colorLightBlue,
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

  notifications: {
    background: themeCommon.colorKeyLight,
    list: {
      background: themeCommon.color3B3755,
      boxShadow: '0px 5px 20px ' + themeCommon.color2F2A48 + alphaToHex(0.2),
    },

    card: {
      subjectTextColor: themeCommon.colorLightBlue,
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
    background: themeCommon.colorGrayBlue2,
    boxShadow: '0 4px 4px' + themeCommon.color4e1c67 + alphaToHex(0.4),
  },

  nat: {
    background: themeCommon.colorGrayBlue + alphaToHex(0.1),
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
    holeBackground: themeCommon.color393453,
  },

  a: {
    textColor: themeCommon.colorYellow,
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
      iconBackground: themeCommon.colorRed + alphaToHex(0.2),
    },
    background: themeCommon.colorDarkBlue,
    contentTextColor: themeCommon.colorWhite,
    closeButtonColor: themeCommon.colorWhite,
  },

  dropdown: {
    valueTextColor: themeCommon.colorLightBlue,
    placeholderTextColor: themeCommon.colorGrayBlue,
    border: `1px solid ${themeCommon.colorGrayBlue}`,
    backgroundColor: themeCommon.colorGrayBlue2,
    selectedOrFocusedValueColor: themeCommon.colorWhite,
    selectedValueBackgroundColor: themeCommon.colorKey,
    focusedValueBackgroundColor: themeCommon.colorKeyLight,
  },
}

export default dark
