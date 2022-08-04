/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const date2human = (ds: string): string => {
  return new Date(Date.parse(ds)).toLocaleString('en-GB')
}
const localDate = (date: Date | undefined): string | undefined => {
  if (date === undefined) {
    return
  }
  return date.toISOString().split('T')[0]
}
const date2Locale = (d: Date): string => {
  return d.toLocaleString('en-GB')
}
const seconds2Time = (seconds: number): string => {
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

  let res = `${hours}:${minutes}:${seconds_}`
  if (days > 0) {
    res = `${days}d ${res}`
  }
  return res
}
const days2Ms = (days: number): number => {
  const milliseconds = days * 86400 * 1000
  return milliseconds
}

const dates = {
  date2human,
  seconds2Time,
  date2Locale,
  days2Ms,
  localDate,
}

export default dates
