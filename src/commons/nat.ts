/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type Variant = 'ok' | 'warning' | 'error'

type NatHumanInfo = {
  readonly connectionAcceptance: string
  readonly label: string
  readonly human: string
  readonly variant: Variant
}

export const nat2Human = (type: string): NatHumanInfo => {
  switch (type) {
    case 'none':
      return { connectionAcceptance: 'All', label: 'None', variant: 'ok', human: 'Open' }
    case 'fullcone':
      return { connectionAcceptance: 'All', label: 'Full Cone', variant: 'ok', human: 'Open' }
    case 'rcone':
      return { connectionAcceptance: 'All', label: 'Restricted Cone', variant: 'ok', human: 'Open' }
    case 'prcone':
      return { connectionAcceptance: 'Most', label: 'Port Restricted Cone', variant: 'ok', human: 'Moderate' }
    case 'symmetric':
      return { connectionAcceptance: 'Limited', label: 'Symmetric', variant: 'warning', human: 'Strict' }
    default:
      return { connectionAcceptance: 'Unknown', label: 'Unknown', variant: 'error', human: 'Unknown' }
  }
}
