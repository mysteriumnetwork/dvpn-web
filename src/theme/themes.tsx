/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import light from './light'
import dark from './dark'
import { themeCommon } from './themeCommon'
import { Theme } from '../types/theme'

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
  mobileS: `(max-width: ${screenSizes.mobileS})`,
  mobileM: `(max-width: ${screenSizes.mobileM})`,
  mobileL: `(max-width: ${screenSizes.mobileL})`,
  tablet: `(max-width: ${screenSizes.tablet})`,
  laptop: `(max-width: ${screenSizes.laptop})`,
  laptopL: `(max-width: ${screenSizes.laptopL})`,
  desktop: `(max-width: ${screenSizes.desktop})`,
  desktopL: `(max-width: ${screenSizes.desktop})`,
}

const themes: {
  dark: Theme
  light: Theme
} = {
  dark: { ...dark, common: themeCommon },
  light: { ...light, common: themeCommon },
}

export default themes
