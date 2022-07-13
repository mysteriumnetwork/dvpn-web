/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import light from './light'
import dark from './dark'
import { themeCommon } from './themeCommon'

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

const themes = {
  dark,
  light,
  common: themeCommon,
}

export default themes
