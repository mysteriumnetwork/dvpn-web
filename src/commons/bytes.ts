/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const format = (a?: number, b = 2): string => {
  if (!a || 0 === a) return '0 Bytes'
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024))
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    ' ' +
    ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'][d]
  )
}

const gib = (bytes: number): number => {
  if (!bytes) {
    return 0
  }
  return Number((bytes / 1024 / 1024 / 1024).toFixed(2))
}

const add = (a?: number, b?: number): number => (a || 0) + (b || 0)

const subtract = (a?: number, b?: number): number => (a || 0) - (b || 0)

const bytes = {
  format,
  add,
  gib,
  subtract,
}

export default bytes
