/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const date2human = (ds: string): string => {
  return new Date(Date.parse(ds)).toLocaleString()
}

export const seconds2ISOTime = (seconds: number): string => {
  return new Date(seconds * 1000).toISOString().substr(11, 8)
}

export const seconds2Time = (seconds: number): string => {
  let days = Math.floor(seconds / 86400)
  seconds %= 86400
  let hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0')
  seconds %= 3600
  let minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  let seconds_ = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')

  return `${days}D ${hours}h ${minutes}m ${seconds_}s`
}
