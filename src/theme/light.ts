/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Theme } from '../types/theme'
import { alphaToHex, themeCommon } from './themeCommon'

const light: Omit<Theme, 'common'> = {
  bgServiceCardHeader: themeCommon.colorWhite,
  bgServiceCardHeaderBoxShadow: '0 10px 30px' + themeCommon.yankeeBlue + alphaToHex(0.05),
  bgServiceCardContent: themeCommon.colorLightBlue,
  bgServiceCardContentBoxShadow: '0 5px 20px' + themeCommon.yankeeBlue + alphaToHex(0.02),
  bgServiceCardContentMobile: themeCommon.colorWhite,
  bgSettingsCard: themeCommon.colorWhite,

  bgReportCardDiffPositive: themeCommon.colorGreen + alphaToHex(0.1),
  bgSettlementMobile: themeCommon.colorWhite,
  bgTransactionPageCard: themeCommon.colorWhite,
  bgTransactionPageCardBoxShadow: '0px 5px 20px ' + themeCommon.yankeeBlue + alphaToHex(0.02),

  navigation: {
    bg: themeCommon.bgMysterium,
    bgContent: themeCommon.colorLightBlue,
  },

  layout: {
    row: {
      bgHero: themeCommon.colorGrayBlue + alphaToHex(0.1),
    },
  },

  liveSessions: {
    card: {
      bg: themeCommon.colorWhite,
    },
  },

  report: {
    bgReportCardRow: themeCommon.colorWhite,
    card: {
      bg: themeCommon.colorWhite,
    },
    chart: {
      shadow: '0 10px 30px ' + themeCommon.yankeeBlue + alphaToHex(0.05),
      xTickFontColor: themeCommon.colorGrayBlue,
      yTickFontColor: themeCommon.colorGrayBlue2,
    },
  },

  buttons: {
    disabledOpacity: '0.7',

    outlined: {
      bgHover: themeCommon.colorKeyLight + alphaToHex(0.1),
    },
  },

  table: {
    bgBody: themeCommon.colorWhite,
    bgRowHover: themeCommon.colorGrayBlue + alphaToHex(0.2),
    bgRowOdd: themeCommon.colorLightBlue + alphaToHex(0.2),
    bgRowEven: themeCommon.colorLightBlue + alphaToHex(0.5),
    bgRowOngoing: themeCommon.colorLightGreen,
    bgRowOngoingHover: themeCommon.colorGreen + alphaToHex(0.3),
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
    trackColor: '#e4e4f7',
    handleColor: themeCommon.colorGrayBlue,
    handleColorHover: themeCommon.colorGrayBlue2,
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
    boxShadow: '0px 5px 20px ' + themeCommon.yankeeBlue + alphaToHex(0.1),
  },

  textInput: {
    textColor: themeCommon.colorGrayBlue2,
    textColorDisabled: themeCommon.colorGrayBlue,
    bg: themeCommon.colorWhite,
    bgDisabled: themeCommon.colorLightBlue,
    border: '1px solid ' + themeCommon.colorGrayBlue2,
    borderDisabled: '1px solid ' + themeCommon.colorGrayBlue,

    textColorError: themeCommon.colorKey,
    bgError: themeCommon.colorKey + alphaToHex(0.1),
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
    bg: themeCommon.colorLightBlue + alphaToHex(0.5),
  },

  nodeStatus: {
    bg: {
      monitoringFailed: themeCommon.colorRed,
      offline: themeCommon.colorGrayBlue,
      online: themeCommon.colorGreen,
    },
    textColor: {
      monitoringFailed: themeCommon.colorWhite,
      offline: themeCommon.colorWhite,
      online: themeCommon.colorWhite,
    },
  },
  adminPanel: {
    bgCard: themeCommon.colorLightBlue,
    bgCardHover: themeCommon.colorGrayBlue,
  },
  notifications: {
    bg: themeCommon.colorKey,
    list: {
      bg: themeCommon.colorWhite,
      boxShadow: '0px 5px 20px ' + themeCommon.color2F2A48 + alphaToHex(0.2),
    },

    card: {
      subjectTextColor: themeCommon.colorDarkBlue,
      messageTextColor: themeCommon.colorGrayBlue,
      positive: {
        bg: themeCommon.colorGreen + alphaToHex(0.2),
      },
      negative: {
        bg: themeCommon.colorKey + alphaToHex(0.2),
      },
      neutral: {
        bg: themeCommon.colorGrayBlue + alphaToHex(0.2),
      },
      update: {
        bg: themeCommon.colorYellow + alphaToHex(0.1),
      },
    },
  },

  tooltip: {
    textColor: themeCommon.colorGrayBlue2,
    bg: themeCommon.colorWhite,
    boxShadow: '0 2px 2px' + themeCommon.yankeeBlue + alphaToHex(0.5),
  },

  nat: {
    bg: themeCommon.colorLightBlue,
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
    bgHole: themeCommon.colorWhite,
  },

  a: {
    textColor: themeCommon.colorKey,
  },

  toasts: {
    success: {
      bgIcon: themeCommon.colorGreen + alphaToHex(0.3),
    },
    warning: {
      bgIcon: themeCommon.colorYellow + alphaToHex(0.3),
    },
    info: {
      bgIcon: themeCommon.colorBlue + alphaToHex(0.3),
    },
    error: {
      bgIcon: themeCommon.colorRed + alphaToHex(0.3),
    },
    bg: themeCommon.colorWhite,
    contentTextColor: themeCommon.colorGrayBlue2,
    closeButtonColor: themeCommon.colorGrayBlue2,
  },

  dropdown: {
    valueTextColor: themeCommon.colorWhite,
    placeholderTextColor: themeCommon.colorGrayBlue2,
    border: `1px solid ${themeCommon.colorGrayBlue}`,
    bgMenu: themeCommon.colorWhite,
    bgControl: themeCommon.colorWhite,
    selectedOrFocusedValueColor: themeCommon.colorGrayBlue2,
    bgSelectedValue: themeCommon.colorGrayBlue + alphaToHex(0.3),
    bgFocusedValue: themeCommon.colorGrayBlue + alphaToHex(0.1),
  },

  activity: {
    bgColor: themeCommon.colorWhite,

    online: {
      fill: themeCommon.colorBlue,
      bgColor: '#CDE7FC',
    },

    connectivity: {
      bgColorA: themeCommon.colorGreen,
      bgColorB: '#c8e7c1',
      bgColor: `${themeCommon.colorGreen}${alphaToHex(0.1)}`,
    },

    bubble: {
      fontColor: themeCommon.colorDarkBlue,
    },
  },

  heatAtlas: {
    bgColor: '#E2E0EE',

    country: {
      fill: themeCommon.colorWhite,
      stroke: '#E2E0EE',
    },

    heat: {
      m0: '#BBD7F0',
      m50: '#9896FE',
      m100: '#EA94EC',
      m200: '#FA5F96',
    },

    legend: {
      bgColor: themeCommon.colorWhite,
      boxShadow: '0px 10px 30px rgba(78, 28, 103, 0.05)',
      textColor: themeCommon.colorDarkBlue,
    },
  },
}

export default light
