/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DECIMAL_PART, DisplayMoneyOptions } from 'mysterium-vpn-js'

export enum ServiceType {
  WIREGUARD = 'WireGuard',
  OPENVPN = 'OpenVPN',
}

export const DEFAULT_MONEY_DISPLAY_OPTIONS: DisplayMoneyOptions = {
  showCurrency: true,
  fractionDigits: 3,
  removeInsignificantZeros: false,
  decimalPart: DECIMAL_PART,
}
