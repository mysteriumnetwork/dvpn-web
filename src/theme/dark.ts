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
  bgServiceCardHeaderBoxShadow: '0 10px 20px' + themeCommon.yankeeBlue + alphaToHex(0.4),
  bgServiceCardContent: themeCommon.color393453,
  bgServiceCardContentBoxShadow: '0 5px 20px' + themeCommon.yankeeBlue + alphaToHex(0.02),
  bgServiceCardContentMobile: themeCommon.color393453,

  bgSettingsCard: themeCommon.color393453,

  bgReportCardDiffPositive: themeCommon.colorGreen + alphaToHex(0.1),
  bgSettlementMobile: themeCommon.color444161,
  bgTransactionPageCard: themeCommon.color393453,

  bgTransactionPageCardBoxShadow: '0px 10px 20px ' + themeCommon.yankeeBlue + alphaToHex(0.4),

  generatedPassword: {
    textColor: themeCommon.colorWhite,
  },

  changePassword: {
    separatorColor: themeCommon.colorLightBlue,
  },

  navigation: {
    bg: themeCommon.yankeeBlue,
    bgContent: themeCommon.color2F2A48,
  },

  layout: {
    row: {
      bgHero: themeCommon.yankeeBlue,
    },
  },

  liveSessions: {
    card: {
      bg: themeCommon.color393453,
    },
  },

  report: {
    bgReportCardRow: themeCommon.color393453,
    card: {
      bg: themeCommon.color393453,
    },
    chart: {
      shadow: '0 10px 20px ' + themeCommon.yankeeBlue + alphaToHex(0.4),
      xTickFontColor: themeCommon.colorGrayBlue,
      yTickFontColor: themeCommon.colorGrayBlue,
    },
  },

  buttons: {
    disabledOpacity: '0.3',

    outlined: {
      bgHover: themeCommon.colorKeyLight + alphaToHex(0.1),
    },
  },

  table: {
    bgBody: themeCommon.color393453,
    bgRowHover: themeCommon.colorGrayBlue2 + alphaToHex(0.8),
    bgRowOdd: themeCommon.colorGrayBlue2 + alphaToHex(0.1),
    bgRowEven: themeCommon.colorGrayBlue2 + alphaToHex(0.3),
    bgRowOngoing: themeCommon.colorGreen + alphaToHex(0.3),
    bgRowOngoingHover: themeCommon.colorGreen + alphaToHex(0.5),
    textColorPrimary: themeCommon.colorLightBlue,
    textColorSecondary: themeCommon.colorLightBlue,
    mobileCard: {
      textColorPrimary: themeCommon.colorLightBlue,
      textColorSecondary: themeCommon.colorGrayBlue,
    },
  },
  onboarding: {
    bgOverlay: themeCommon.colorDarkBlue,
    bgCard: themeCommon.colorGrayBlue2,
    bgSvg: 'none',
    bgCardGradient: 'linear-gradient(180deg, #262237 0%, #565075 100%)',
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
    bgOverlay: themeCommon.yankeeBlue + alphaToHex(0.8),
    bgColor: themeCommon.color393453,
    titleColor: themeCommon.colorLightBlue,
    boxShadow: '0px 10px 20px ' + themeCommon.yankeeBlue + alphaToHex(0.4),
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
    bg: themeCommon.colorDarkBlue,
    bgDisabled: themeCommon.colorDarkBlue,
    border: '1px solid ' + themeCommon.colorGrayBlue,
    borderDisabled: '1px solid ' + themeCommon.colorGrayBlue2,

    textColorError: themeCommon.colorKey,
    bgError: themeCommon.colorKeyLight + alphaToHex(0.1),
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
    bg: themeCommon.colorGrayBlue + alphaToHex(0.1),
  },

  nodeStatus: {
    bg: {
      unknown: themeCommon.colorWarning,
      monitoringFailed: themeCommon.colorRed,
      offline: themeCommon.colorGrayBlue2,
      online: themeCommon.colorGreen,
    },
    textColor: themeCommon.colorWhite,
  },
  quality: {
    bg: {
      good: themeCommon.colorGreen,
      normal: themeCommon.colorWarning,
      poor: themeCommon.colorRed,
      unknown: themeCommon.colorGrayBlue2,
    },
  },
  adminPanel: {
    bgCard: themeCommon.colorGrayBlue2,
    bgCardHover: themeCommon.colorDarkBlue,
  },
  notifications: {
    bg: themeCommon.colorKeyLight,
    list: {
      bg: themeCommon.color3B3755,
      boxShadow: '0px 5px 20px ' + themeCommon.color2F2A48 + alphaToHex(0.2),
    },

    card: {
      subjectTextColor: themeCommon.colorLightBlue,
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
    textColor: themeCommon.colorLightBlue,
    bg: themeCommon.colorGrayBlue2,
    boxShadow: '0 4px 4px' + themeCommon.yankeeBlue + alphaToHex(0.4),
  },

  nat: {
    bg: themeCommon.colorGrayBlue + alphaToHex(0.1),
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
    bgHole: themeCommon.color393453,
  },

  a: {
    textColor: themeCommon.colorKeyLight,
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
      bgIcon: themeCommon.colorRed + alphaToHex(0.2),
    },
    bg: themeCommon.colorDarkBlue,
    contentTextColor: themeCommon.colorWhite,
    closeButtonColor: themeCommon.colorWhite,
  },

  dropdown: {
    valueTextColor: themeCommon.colorLightBlue,
    placeholderTextColor: themeCommon.colorGrayBlue,
    border: `1px solid ${themeCommon.colorGrayBlue}`,
    bgControl: themeCommon.colorGrayBlue2,
    bgMenu: themeCommon.colorGrayBlue2,
    selectedOrFocusedValueColor: themeCommon.colorWhite,
    bgSelectedValue: themeCommon.colorKey,
    bgFocusedValue: themeCommon.colorKeyLight,
  },

  activity: {
    bgColor: themeCommon.color393453,

    online: {
      fill: themeCommon.colorBlue,
      bgColor: '#404D72',
    },

    connectivity: {
      bgColorA: themeCommon.colorGreen,
      bgColorB: '#41614B',
      bgColor: `${themeCommon.colorGreen}${alphaToHex(0.1)}`,
    },

    bubble: {
      fontColor: themeCommon.colorWhite,
    },
  },

  heatAtlas: {
    bgColor: '#221E39',

    country: {
      fill: '#393453',
      stroke: '#221E39',
    },

    heat: {
      m0: '#BBD7F0',
      m50: '#9896FE',
      m100: '#EA94EC',
      m200: '#FA5F96',
    },

    legend: {
      bgColor: themeCommon.color444161,
      boxShadow: '0px 10px 20px rgba(34, 30, 57, 0.4)',
      textColor: themeCommon.colorGrayBlue,
    },
  },

  asyncBeneficiaryModal: {
    notice: {
      bgColor: themeCommon.colorDarkBlue,
    },
  },
}

export default dark
