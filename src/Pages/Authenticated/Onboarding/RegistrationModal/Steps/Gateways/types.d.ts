/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import BigNumber from 'bignumber.js'
import { PaymentGateway } from 'mysterium-vpn-js'

export type PaymentProps = {
  amountRequiredWei: BigNumber
  isCompleted: boolean
}

export type GatewayProps = {
  gateway: PaymentGateway
  payments: PaymentProps
  back?: () => void
  next?: () => void
  backText?: string
}
