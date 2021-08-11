/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NatStatusV2Response } from 'mysterium-vpn-js'
import { NATType } from '../../../../constants/nat'

export enum BubbleStatus {
  WARNING = 'warning',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export const statusText = (nat: NatStatusV2Response, online: boolean): string => {
  if (!online) {
    return 'All services offline'
  }
  switch (nat.status) {
    case 'failed':
      return 'Test Failed'
    default:
      return 'Online'
  }
}

export const bubbleStatus = (status: NatStatusV2Response, online: boolean): BubbleStatus => {
  if (!online) {
    return BubbleStatus.FAILED
  }
  switch (status.status) {
    case 'failed':
      return BubbleStatus.WARNING
    default:
      return BubbleStatus.SUCCESS
  }
}

export const natType2Human = (type: string): string => {
  const humanReadable = NATType[type]
  if (!humanReadable) {
    return 'Unknown'
  }
  return humanReadable
}
