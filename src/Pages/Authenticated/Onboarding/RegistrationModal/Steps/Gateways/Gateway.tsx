/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PaymentOrder } from 'mysterium-vpn-js'
import React, { useEffect, useMemo, useState } from 'react'
import { tequila } from '../../../../../../api/tequila'
import countries from '../../../../../../commons/countries'
import errors from '../../../../../../commons/errors'
import { selectors } from '../../../../../../redux/selectors'
import { validateAndReturnCheckoutUrl } from './fiat'
import { GatewayProps } from './types'
import { useAppSelector } from '../../../../../../commons/hooks'
import { CircularSpinner } from '../../../../../../Components/CircularSpinner/CircularSpinner'
import { Button } from '../../../../../../Components/Inputs/Button'
import { Select } from '../../../../../../Components/Select/Select'
import { Option } from '../../../../../../types/common'
import styled from 'styled-components'
import { SUPPORTED_GATEWAYS } from '../../gateways'
import { InputGroup } from '../../../../../../Components/Inputs/InputGroup'

const { parseToastError } = errors
const { countryNames } = countries
const { api } = tequila

const PROJECT_ID = 'mystnodes'

interface State {
  currency: string
  taxCountry: Option
  isLoading: boolean
  isRedirected: boolean
  order?: PaymentOrder
  isLoadingPayNow: boolean
}

const initialState: State = {
  currency: 'USD',
  taxCountry: { label: '', value: '' },
  isLoading: true,
  isRedirected: false,
  isLoadingPayNow: false,
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const FlexGrow = styled.div`
  flex-grow: 1;
`

const Spinner = styled(CircularSpinner)`
  width: 50px;
  height: 50px;
  align-self: center;
  justify-self: center;
  top: 50%;
`

const Title = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.common.fontSizeHumongous};
  font-weight: 600;
`

const Description = styled.div`
  display: flex;
  margin-top: 30px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  line-height: 22px;
  color: ${({ theme }) => theme.common.colorGrayBlue2};
`

const Note = styled.div`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.common.colorGrayBlue};
`

const Controls = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const Input = styled.div`
  margin-top: 8px;
`

const Gateway = ({ payments: { isCompleted }, next, gateway, back, backText }: GatewayProps) => {
  const { name: gatewayName } = gateway

  const identity = useAppSelector(selectors.currentIdentitySelector)

  const [state, setState] = useState<State>(initialState)
  const { taxCountry, isLoading, isRedirected } = state

  const countryOptions = useMemo(
    () => Object.keys(countryNames).map((key) => ({ value: key.toUpperCase(), label: countryNames[key] })),
    [],
  )

  useEffect(() => {
    ;(async () => {
      try {
        const [location, orders] = await Promise.all([api.location(), api.payment.orders(identity.id)])
        const taxCountry = countryOptions.find((co) => co.value === location.country)
        if (!taxCountry) {
          throw new Error('Current location is unavailable for payment')
        }

        setState((p) => ({
          ...p,
          taxCountry,
          order: orders.find((o) => o.status === 'new' && o.gatewayName === gatewayName),
        }))
      } catch (e: any) {
        parseToastError(e)
      } finally {
        setState((p) => ({ ...p, isLoading: false }))
      }
    })()
  }, [gatewayName])

  const markRedirected = () => setState((p) => ({ ...p, isRedirected: true }))
  const handleTaxCountryChange = (taxCountry: Option) => setState((p) => ({ ...p, taxCountry }))

  const handlePayNow = async () => {
    try {
      setState((p) => ({ ...p, isLoadingPayNow: true }))
      const order = await createOrRetrieveOrder()
      const checkoutUrl = validateAndReturnCheckoutUrl(order, gatewayName)
      openInNewTab(checkoutUrl)
      markRedirected()
    } catch (err: any) {
      parseToastError(err)
    } finally {
      setState((p) => ({ ...p, isLoadingPayNow: false }))
    }
  }

  const createOrRetrieveOrder = async () => {
    if (state.order) {
      return state.order
    }

    const country = state.taxCountry.value as string
    const order = await api.payment.createOrder(identity.id, gatewayName, {
      payCurrency: state.currency,
      country,
      projectId: PROJECT_ID,
      amountUsd: '1',
      gatewayCallerData: {},
    })
    setState((p) => ({ ...p, order: order }))
    return order
  }

  const showInvoiceLink = isCompleted && state.order?.id
  const showPayNow = (): boolean => {
    if (isCompleted) {
      return false
    }

    if (isRedirected) {
      return false
    }

    return true
  }

  if (isLoading) {
    return (
      <Content>
        <Spinner />
      </Content>
    )
  }

  return (
    <Content>
      <Title>{SUPPORTED_GATEWAYS[gateway.name].title}</Title>
      <Description>{SUPPORTED_GATEWAYS[gateway.name].description}</Description>
      <Input>
        {' '}
        <InputGroup
          title="Country"
          input={
            <Select options={countryOptions} value={taxCountry} onChange={(o) => handleTaxCountryChange(o as Option)} />
          }
        />
      </Input>
      <Note>{SUPPORTED_GATEWAYS[gateway.name].note}</Note>
      <FlexGrow />
      <WaitingPayment showPayNow={showPayNow()} isRegistrationPaymentReceived={isCompleted} />
      {showInvoiceLink && <DownloadInvoice id={identity.id} orderId={state.order?.id} />}
      <Controls>
        {showPayNow() && <Button rounded onClick={handlePayNow} loading={state.isLoadingPayNow} label="Pay 1 USD" />}
        {isCompleted && <Button label="Continue" rounded onClick={next} />}
        <Button onClick={back} variant="outlined" rounded label={backText || 'Back'} />
      </Controls>
    </Content>
  )
}

interface WaitingPaymentProps {
  isRegistrationPaymentReceived: boolean
  showPayNow: boolean
}

const WaitingSpinner = styled(CircularSpinner)`
  width: 30px;
  height: 30px;
`

const Waiting = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  gap: 5px;
`

const WaitingPayment = ({ isRegistrationPaymentReceived, showPayNow }: WaitingPaymentProps) => {
  if (showPayNow) {
    return <></>
  }
  return (
    <>
      {isRegistrationPaymentReceived ? (
        <>Payment successful! Click Next to proceed.</>
      ) : (
        <Waiting>
          <WaitingSpinner />
          Wait for confirmation (might take couple of minutes)
        </Waiting>
      )}
    </>
  )
}

const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank')
  win?.focus()
}

const InvoiceLink = styled.a`
  align-self: center;
`

const DownloadInvoice = ({ id, orderId }: { id: string; orderId?: string }) => {
  const [url, setUrl] = useState<string>()
  const [name, setName] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const generate = async () => {
      try {
        const data = await api.payment.invoice(id, orderId!)
        const blob = new Blob([data], { type: 'application/pdf' })
        if (url && url !== '') {
          window.URL.revokeObjectURL(url)
        }
        setUrl(window.URL.createObjectURL(blob))
        setName(`MystNodes-order-${orderId}.pdf`)
      } catch (err) {
        parseToastError(err)
      }
    }
    if (orderId) {
      setIsLoading(true)
      generate()
      setIsLoading(false)
    }
  }, [id, orderId])

  if (isLoading) {
    return <></>
  }

  return (
    <InvoiceLink download={name} href={url}>
      Download Invoice
    </InvoiceLink>
  )
}

export default Gateway
