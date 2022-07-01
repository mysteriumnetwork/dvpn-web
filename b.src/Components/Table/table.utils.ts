/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import _ from 'lodash'

export const createResponsiveRange = (page: number, lastPage: number): number[] => {
  const whole = _.range(1, lastPage + 1)
  const toKeep = [1, lastPage, page + 1, page - 1, page]
  return _.remove(whole, (it) => toKeep.includes(it))
}
