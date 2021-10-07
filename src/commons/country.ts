/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import '@formatjs/intl-displaynames/polyfill'
import '@formatjs/intl-displaynames/locale-data/en'

// @ts-ignore
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

export const countryName = (countryCode: string): string => {
  return regionNames.of(countryCode)
}
