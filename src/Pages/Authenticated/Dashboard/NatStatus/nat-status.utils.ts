/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const statusText = (status: string): string => {
  switch (status) {
    case 'not_finished':
      return 'Not Finished'
    case 'successful':
      return 'Success'
    case 'failed':
      return 'Failed'
    default:
      return 'Unknown'
  }
}

export const statusColor = (status: string): string => {
  switch (status) {
    case 'not_finished':
      return 'warning'
    case 'successful':
      return 'success'
    case 'failed':
      return 'failed'
    default:
      return 'warning'
  }
}
