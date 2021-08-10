/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NatStatusV2 } from 'mysterium-vpn-js'
import { NATType } from '../../../../constants/nat'

export enum BubbleStatus {
  WARNING = 'warning',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export const statusText = (status: NatStatusV2): string => {
  switch (status) {
    case NatStatusV2.PENDING:
      return 'Pending'
    case NatStatusV2.ONLINE:
      return 'Online'
    case NatStatusV2.FAILED:
      return 'Test Failed'
    case NatStatusV2.OFFLINE:
      return 'All services offline'
    default:
      return 'Unknown'
  }
}

export const bubbleStatus = (status: NatStatusV2): BubbleStatus => {
  switch (status) {
    case NatStatusV2.PENDING:
      return BubbleStatus.WARNING
    case NatStatusV2.ONLINE:
      return BubbleStatus.SUCCESS
    case NatStatusV2.FAILED:
    case NatStatusV2.OFFLINE:
      return BubbleStatus.FAILED
    default:
      return BubbleStatus.WARNING
  }
}

export const natType2Human = (type: string): string => {
  const humanReadable = NATType[type]
  if (!humanReadable) {
    return 'Unknown'
  }
  return humanReadable
}
