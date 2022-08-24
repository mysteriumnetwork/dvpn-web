/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const localDate = (timestamp: string): string => {
  const date = new Date(timestamp)
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  return `${month}-${day}`
}

export const dayHour = (timestamp: string): string => {
  const date = new Date(timestamp)
  const day = date.getDay() < 10 ? `0${date.getDay()}` : `${date.getDay()}`
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
  return `${day}-${hour}`
}
