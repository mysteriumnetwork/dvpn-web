/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PaymentOrder } from 'mysterium-vpn-js'

export const validateAndReturnCheckoutUrl = (order: PaymentOrder, gateway: string): string => {
  if (order.gatewayName !== gateway) {
    throw new Error(`Unsupported payment gateway ${order.gatewayName}`)
  }
  // @ts-ignore
  if (!order.publicGatewayData?.checkoutUrl) {
    throw new Error('Could not retrieve secure form for payment')
  }

  // @ts-ignore
  return order.publicGatewayData.checkoutUrl
}
