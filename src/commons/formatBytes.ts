/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const format = (a?: number, b = 2): string => {
  if (!a || 0 === a) return '0 Bytes'
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1000))
  return (
    parseFloat((a / Math.pow(1000, d)).toFixed(c)) + ' ' + ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
  )
}

export default format

export const add = (a?: number, b?: number): number => {
  return (a || 0) + (b || 0)
}
