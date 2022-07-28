/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Common } from '../types/theme'

export const alphaToHex = (value: number) => {
  return ((value * 255) | (1 << 8)).toString(16).slice(1)
}

export const themeCommon: Common = {
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

  // yankeeblue
  color221E39: '#221E39',
  // gunmetal
  color2F2A48: '#2F2A48',
  // jakarta
  color393453: '#393453',
  // american purple
  color4e1c67: '#4e1c67',
  // yankee blue
  color231F3A: '#231F3A',
  // jakarta
  color3B3755: '#3B3755',
  // american blue
  color444161: '#444161',
  color000065: '#000065',

  fontSizeSmallest: '8px',
  fontSizeSmaller: '10px',
  fontSizeSmall: '12px',
  fontSizeNormal: '14px',
  fontSizeBigger: '16px',
  fontSizeBig: '18px',
  fontSizeHuge: '24px',
}
