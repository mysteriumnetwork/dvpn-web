/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'styled-components'

export type Theme = {
  bgServiceCardHeader: string
  bgServiceCardHeaderBoxShadow: string
  bgServiceCardContent: string
  bgServiceCardContentBoxShadow: string
  bgServiceCardContentMobile: string
  bgSettingsCard: string

  bgReportCardDiffPositive: string

  bgTransactionPageCard: string
  bgTransactionPageCardBoxShadow: string
  bgSettlementMobile: string

  navigation: {
    bg: string
    bgContent: string
  }

  layout: {
    row: {
      bgHero: string
    }
  }

  liveSessions: {
    card: {
      bg: string
    }
  }

  report: {
    bgReportCardRow: string
    card: {
      bg: string
    }
    chart: {
      shadow: string
      xTickFontColor: string
      yTickFontColor: string
    }
  }

  buttons: {
    disabledOpacity: string

    outlined: {
      bgHover: string
    }
  }

  settleModal: {
    card: {
      titleColor: string
      amountColor: string
    }
  }
  TOSModal: {
    textColor: string
  }
  settleCard: {
    earningsColor: string
  }
  calendar: {
    bgHeader: string
    bgBody: string
    textColor: string
    inputColor: string
  }
  idleStat: {
    bubbleTextColor: string
  }
  table: {
    bgBody: string
    bgRowOdd: string
    bgRowEven: string
    bgRowOngoing: string
    textColorPrimary: string
    textColorSecondary: string
    mobileCard: {
      textColorPrimary: string
      textColorSecondary: string
    }
  }
  modal: {
    bgOverlay: string
    bgColor: string
    titleColor: string
    boxShadow: string
  }
  navTab: {
    bgColor: string
    textColor: string
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
  adminPanel: {
    bgCard: string
    bgCardHover: string
  }
  textInput: {
    textColor: string
    textColorDisabled: string
    textColorError: string

    bg: string
    bgDisabled: string
    bgError: string

    border: string
    borderDisabled: string
    borderError: string
  }
  scrollBar: {
    trackColor: string
    handleColor: string
    handleColorHover: string
  }
  dndList: {
    textColor: string
    bg: string
  }

  nodeStatus: {
    bg: {
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
    bg: string

    list: {
      bg: string
      boxShadow: string
    }

    card: {
      subjectTextColor: string
      messageTextColor: string
      positive: {
        bg: string
      }
      negative: {
        bg: string
      }
      neutral: {
        bg: string
      }
      update: {
        bg: string
      }
    }
  }

  tooltip: {
    textColor: string
    bg: string
    boxShadow: string
  }

  nat: {
    bg: string
  }

  indicator: {
    ok: {
      color: string
    }
    warning: {
      color: string
    }
    error: {
      color: string
    }
    bgHole: string
  }

  a: {
    textColor: string
  }

  toasts: {
    success: {
      bgIcon: string
    }
    warning: {
      bgIcon: string
    }
    info: {
      bgIcon: string
    }
    error: {
      bgIcon: string
    }
    bg: string
    contentTextColor: string
    closeButtonColor: string
  }

  dropdown: {
    valueTextColor: string
    placeholderTextColor: string
    border: string
    bgMenu: string
    bgControl: string
    selectedOrFocusedValueColor: string
    bgSelectedValue: string
    bgFocusedValue: string
  }

  activity: {
    bgColor: string

    online: {
      fill: string
      bgColor: string
    }

    connectivity: {
      bgColorA: string
      bgColorB: string
      bgColor: string
    }

    bubble: {
      fontColor: string
    }
  }

  heatAtlas: {
    bgColor: string

    country: {
      fill: string
      stroke: string
    }

    heat: {
      m0: string
      m50: string
      m100: string
      m200: string
    }

    legend: {
      bgColor: string
      boxShadow: string
      textColor: string
    }
  }

  common: Common
}

export type Common = {
  bgMysterium: string

  colorKey: string
  colorKeyLight: string
  colorKeyDark: string
  colorDarkBlue: string
  colorGrayBlue: string
  colorGrayBlue2: string
  colorWhite: string
  colorGreen: string
  colorRed: string
  colorLightGreen: string
  colorBlue: string
  colorLightBlue: string
  colorLightBlue1: string
  colorDarkBlue2: string
  colorYellow: string

  colorNavStroke: string
  colorNavActiveStroke: string

  color2F2A48: string
  color393453: string
  yankeeBlue: string
  color3B3755: string
  color444161: string

  fontSizeSmallest: string
  fontSizeSmaller: string
  fontSizeSmall: string
  fontSizeNormal: string
  fontSizeBigger: string
  fontSizeBig: string
  fontSizeHuge: string
  fontSizeHumongous: string
}

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
