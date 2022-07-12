/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const alphaToHex = (value: number) => {
  return ((value * 255) | (1 << 8)).toString(16).slice(1)
}

const common = {
  backgroundMysterium: 'linear-gradient(180deg, #562160 0%, #7B2061 48.96%, #64205D 100%)',
  colorKey: '#D61F85',
  colorKeyLight: '#ED5BAC',
  colorDarkBlue: '#3C3857',
  colorGrayBlue: '#9090BB',
  colorGrayBlue2: '#5A597D',
  colorWhite: '#FFFFFF',
  colorGreen: '#63B64E',
  colorLightGreen: '#EFF8ED',
  colorBlue: '#5BB1EF',
  colorLightBlue: '#F6F6FA',

  colorNavStroke: '#FFFFFF',
  colorNavActiveStroke: '#3C3857',

  color221E39: '#221E39',
  color2F2A48: '#2F2A48',
  color393453: '#393453',
  color4e1c67: '#4e1c67',

  fontSizeSmallest: '8px',
  fontSizeSmaller: '10px',
  fontSizeSmall: '12px',
  fontSizeNormal: '14px',
  fontSizeBigger: '16px',
  fontSizeBig: '18px',
  fontSizeHuge: '24px',
}

const light = {
  bgNavigation: common.backgroundMysterium,
  bgLayout: common.colorLightBlue,
  bgLayoutHeroRow: common.colorGrayBlue + alphaToHex(0.1),
  bgLayoutCardCss: common.colorWhite,

  bgServiceCardHeader: common.colorWhite,
  bgServiceCardContent: common.colorLightBlue,

  bgSettingsCard: common.colorWhite,

  bgReportChartRow: common.colorWhite,
  bgReportChartRowBoxShadow: '0 10px 30px ' + common.color4e1c67 + alphaToHex(0.05),

  bgReportCardDiffPositive: common.colorGreen + alphaToHex(0.1),

  colorTextMain: common.colorDarkBlue,
  colorTextSecondary: common.colorGrayBlue2,

  backgroundMysterium: 'linear-gradient(180deg, #562160 0%, #7B2061 48.96%, #64205D 100%)',

  colorKey: '#D61F85',
  colorKeyLight: '#ED5BAC',
  colorDarkBlue: '#3C3857',
  colorGrayBlue: '#9090BB',
  colorGrayBlue2: '#5A597D',
  colorWhite: '#FFFFFF',
  colorGreen: '#63B64E',
  colorLightGreen: '#EFF8ED',
  colorBlue: '#5BB1EF',
  colorLightBlue: '#F6F6FA',

  colorNavStroke: '#FFFFFF',
  colorNavActiveStroke: '#3C3857',

  fontSizeSmallest: '8px',
  fontSizeSmaller: '10px',
  fontSizeSmall: '12px',
  fontSizeNormal: '14px',
  fontSizeBigger: '16px',
  fontSizeBig: '18px',
}

const dark = {
  bgNavigation: common.color221E39,
  bgLayout: common.color2F2A48,
  bgLayoutHeroRow: common.color221E39,
  bgLayoutCardCss: common.color393453,

  bgServiceCardHeader: common.color393453,
  bgServiceCardContent: common.color393453,

  bgSettingsCard: common.color393453,

  bgReportChartRow: common.color393453,
  bgReportChartRowBoxShadow: '0 10px 20px ' + common.color221E39 + alphaToHex(0.4),

  bgReportCardDiffPositive: common.colorGreen + alphaToHex(0.1),

  colorTextMain: common.colorLightBlue,
  colorTextSecondary: common.colorGrayBlue,

  backgroundMysterium: 'linear-gradient(180deg, #562160 0%, #7B2061 48.96%, #64205D 100%)',

  colorKey: '#D61F85',
  colorKeyLight: '#ED5BAC',
  colorDarkBlue: '#3C3857',
  colorGrayBlue: '#9090BB',
  colorGrayBlue2: '#5A597D',
  colorWhite: '#FFFFFF',
  colorGreen: '#63B64E',
  colorLightGreen: '#EFF8ED',
  colorBlue: '#5BB1EF',
  colorLightBlue: '#F6F6FA',

  colorNavStroke: '#FFFFFF',
  colorNavActiveStroke: '#3C3857',

  fontSizeSmallest: '8px',
  fontSizeSmaller: '10px',
  fontSizeSmall: '12px',
  fontSizeNormal: '14px',
  fontSizeBigger: '16px',
  fontSizeBig: '18px',
}

/**
 * @deprecated
 */
const current = () => {
  return light
}

const themes = {
  dark,
  light,
  common,
  current,
}

export const screenSizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}

export const devices = {
  mobileS: `(min-width: ${screenSizes.mobileS})`,
  mobileM: `(min-width: ${screenSizes.mobileM})`,
  mobileL: `(min-width: ${screenSizes.mobileL})`,
  tablet: `(min-width: ${screenSizes.tablet})`,
  laptop: `(min-width: ${screenSizes.laptop})`,
  laptopL: `(min-width: ${screenSizes.laptopL})`,
  desktop: `(min-width: ${screenSizes.desktop})`,
  desktopL: `(min-width: ${screenSizes.desktop})`,
}

export default themes
