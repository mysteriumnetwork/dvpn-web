/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export enum BubbleStatus {
  WARNING = 'warning',
  SUCCESS = 'success',
  FAILED = 'failed',
}

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

export const bubbleStatus = (status: string): BubbleStatus => {
  switch (status) {
    case 'not_finished':
      return BubbleStatus.WARNING
    case 'successful':
      return BubbleStatus.SUCCESS
    case 'failed':
      return BubbleStatus.FAILED
    default:
      return BubbleStatus.WARNING
  }
}
