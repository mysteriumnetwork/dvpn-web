/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PaymentOrder } from 'mysterium-vpn-js'

export const CARDINITY_GATEWAY = 'cardinity'

export const formData: { regexp: RegExp; key: string }[] = [
  { regexp: /name="amount" value="(.*)"/, key: 'amount' },
  { regexp: /name="country" value="(.*)"/, key: 'country' },
  { regexp: /name="currency" value="(.*)"/, key: 'currency' },
  { regexp: /name="order_id" value="(.*)"/, key: 'order_id' },
  { regexp: /name="project_id" value="(.*)"/, key: 'project_id' },
  { regexp: /name="return_url" value="(.*)"/, key: 'return_url' },
  { regexp: /name="signature" value="(.*)"/, key: 'signature' },
]

export const buildFormData = (html: string): { [key: string]: any } | undefined => {
  let data: { [key: string]: any } = {}

  for (let i = 0; i < formData.length; i++) {
    const fd = formData[i]
    const value = match(html, fd.regexp)
    if (!value) {
      return undefined
    }
    data[fd.key] = value
  }

  return data
}

const match = (html: string, p: RegExp): any | undefined => {
  const match = html.match(p)
  return match ? match[1] : undefined
}

export const validateOrderAndReturnSecureForm = (order: PaymentOrder): string => {
  if (order.gatewayName !== CARDINITY_GATEWAY) {
    throw new Error(`Unsupported payment gateway ${order.gatewayName}`)
  }
  if (!order.publicGatewayData?.secureForm) {
    throw new Error('Could not retrieve secure form for payment')
  }

  return order.publicGatewayData.secureForm
}
