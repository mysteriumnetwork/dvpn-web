/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const light = {
  backgroundLightgray: '#F6F6FA',
  backgroundContent: '#FFFFFF',
  backgroundLightgreen: '#EFF8ED',
  backgroundMysterium: 'linear-gradient(180deg, #562160 0%, #7B2061 48.96%, #64205D 100%)',

  colorPrimary: '#D61F85',
  colorSecondary: '#ED5BAC',
  colorGrayBlue: '#9090BB',
  colorGrayBlue2: '#5A597D',
  colorWhite: '#FFFFFF',
  colorGreen: '#63B64E',

  colorNavStroke: '#FFFFFF',
  colorNavActiveStroke: '#3C3857',

  fontSizeSmall: '12px',
  fontSizeNormal: '14pp',
  fontSizeBig: '18px',
}

const current = () => {
  return light
}

const themes = {
  light,
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
