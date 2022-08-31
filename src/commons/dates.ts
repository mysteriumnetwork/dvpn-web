/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const date2human = (ds: string): string => new Date(Date.parse(ds)).toLocaleString('en-GB')

const localDate = (date: Date | undefined): string | undefined => {
  if (date === undefined) {
    return
  }
  return date.toISOString().split('T')[0]
}
const date2Locale = (d: Date): string => d.toLocaleString('en-GB')

const seconds2Time = (seconds: number): string => {
  const days = Math.floor(seconds / 86400)
  seconds %= 86400
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0')
  seconds %= 3600
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const seconds_ = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')

  const res = `${hours}:${minutes}:${seconds_}`
  if (days > 0) {
    return `${days}d ${res}`
  }
  return res
}
const days2Ms = (days: number): number => days * 86400 * 1000

const dates = {
  date2human,
  seconds2Time,
  date2Locale,
  days2Ms,
  localDate,
}

export default dates
