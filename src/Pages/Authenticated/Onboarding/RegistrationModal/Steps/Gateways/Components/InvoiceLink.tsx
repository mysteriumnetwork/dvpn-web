/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useFetch } from '../../../../../../../commons/hooks'
import { PaymentOrder } from 'mysterium-vpn-js'
import { tequila } from '../../../../../../../api/tequila'
import errors from '../../../../../../../commons/errors'
import { ReactComponent as Icon } from '../../../../../../../assets/images/download.svg'
import { devices } from '../../../../../../../theme/themes'

const { api } = tequila

const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 12px;
  align-self: center;
  text-decoration: none;
  color: ${({ theme }) => theme.common.colorBlue};
  @media ${devices.tablet} {
    font-size: ${({ theme }) => theme.common.fontSizeSmall};
    font-weight: 500;
  }
`
const Download = styled(Icon)`
  margin-bottom: 2px;
  #inner {
    fill: ${({ theme }) => theme.common.colorBlue};
  }
`
export const InvoiceLink = ({ identity, isCompleted }: { identity: string; isCompleted?: boolean }) => {
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')

  const [suposedlyPaidOrder] = useFetch(async () => {
    if (!isCompleted) {
      return
    }
    const orders = await api.payment.orders(identity)
    return orders.find(Boolean)
  }, [isCompleted])

  useEffect(() => {
    const generate = async (order: PaymentOrder) => {
      try {
        const data = await api.payment.invoice(identity, order.id)
        const blob = new Blob([data], { type: 'application/pdf' })
        if (url && url !== '') {
          window.URL.revokeObjectURL(url)
        }
        setUrl(window.URL.createObjectURL(blob))
        setName(`MystNodes-order-${order.id}.pdf`)
      } catch (err) {
        errors.parseToastError(err)
      }
    }

    if (suposedlyPaidOrder && isCompleted) {
      generate(suposedlyPaidOrder)
    }
  }, [suposedlyPaidOrder?.id])

  if (!suposedlyPaidOrder) {
    return <></>
  }

  return (
    <Link download={name} href={url}>
      <Download /> Download Invoice
    </Link>
  )
}
