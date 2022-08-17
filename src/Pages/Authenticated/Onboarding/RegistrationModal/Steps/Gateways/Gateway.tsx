/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PaymentOrder } from 'mysterium-vpn-js'
import React, { useEffect, useMemo, useState } from 'react'
import { tequila } from '../../../../../../api/tequila'
import location, { stateNames } from '../../../../../../commons/location'
import errors from '../../../../../../commons/errors'
import { selectors } from '../../../../../../redux/selectors'
import { validateAndReturnCheckoutUrl } from './fiat'
import { GatewayProps } from './types'
import { useAppSelector } from '../../../../../../commons/hooks'
import { CircularSpinner } from '../../../../../../Components/CircularSpinner/CircularSpinner'
import { Button } from '../../../../../../Components/Inputs/Button'
import { Select } from '../../../../../../Components/Inputs/Select'
import { Option } from '../../../../../../types/common'
import styled from 'styled-components'
import { SUPPORTED_GATEWAYS } from '../../gateways'
import { InputGroup } from '../../../../../../Components/Inputs/InputGroup'
import gatewaysUtils from './gateways.utils'
import { InvoiceLink } from './Components/InvoiceLink'
import { WaitingFiatPayment } from './Components/WaitingFiatPayment'

const { parseToastError } = errors
const { countryNames } = location
const { api } = tequila

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

const PROJECT_ID = 'mystnodes'

interface State {
  currency: string
  taxCountry: Option
  taxState?: Option
  loading: boolean
  redirected: boolean
  order?: PaymentOrder
  isLoadingPayNow: boolean
}

const initialState: State = {
  currency: 'USD',
  taxCountry: { label: '', value: '' },
  loading: true,
  redirected: false,
  isLoadingPayNow: false,
}

const Gateway = ({ payments: { isCompleted }, next, gateway, back }: GatewayProps) => {
  const { name: gatewayName } = gateway

  const identity = useAppSelector(selectors.currentIdentity)

  const [state, setState] = useState<State>(initialState)
  const { taxCountry, taxState, loading, redirected } = state

  const countryOptions = useMemo(() => gatewaysUtils.toOptions(countryNames), [])
  const stateOptions = useMemo(() => gatewaysUtils.toOptions(stateNames['US']), [])

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
      }
      setState((p) => ({ ...p, loading: false }))
    })()
  }, [gatewayName])

  const markRedirected = () => setState((p) => ({ ...p, redirected: true }))
  const handleTaxCountryChange = (taxCountry: Option) => setState((p) => ({ ...p, taxCountry }))
  const handleTaxStateChange = (taxState: Option) => setState((p) => ({ ...p, taxState }))

  useEffect(() => {
    if (taxCountry.value === 'US' && !taxState) {
      setState((p) => ({ ...p, taxState: stateOptions[0] }))
      return
    }

    if (taxCountry.value !== 'US' && taxState) {
      setState((p) => ({ ...p, taxState: undefined }))
      return
    }
  }, [taxCountry.value])

  const handlePayNow = async () => {
    try {
      setState((p) => ({ ...p, isLoadingPayNow: true }))
      const order = await createOrRetrieveOrder()
      const checkoutUrl = validateAndReturnCheckoutUrl(order, gatewayName)
      gatewaysUtils.openInNewTab(checkoutUrl)
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

    const country = state.taxCountry.value
    const taxState = state.taxState?.value || ''

    const order = await api.payment.createOrder(identity.id, gatewayName, {
      payCurrency: state.currency,
      country,
      state: taxState,
      projectId: PROJECT_ID,
      amountUsd: '1',
      gatewayCallerData: {},
    })
    setState((p) => ({ ...p, order: order }))
    return order
  }

  const showPayNow = ((): boolean => {
    if (isCompleted) {
      return false
    }

    if (redirected) {
      return false
    }

    return true
  })()

  if (loading) {
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
        <InputGroup
          title="Country"
          input={
            <Select options={countryOptions} value={taxCountry} onChange={(o) => handleTaxCountryChange(o as Option)} />
          }
        />
      </Input>
      {taxCountry.value === 'US' && (
        <Input>
          <InputGroup
            title="State"
            input={
              <Select options={stateOptions} value={taxState} onChange={(o) => handleTaxStateChange(o as Option)} />
            }
          />
        </Input>
      )}
      <Note>{SUPPORTED_GATEWAYS[gateway.name].note}</Note>
      <FlexGrow />
      <WaitingFiatPayment visible={showPayNow} isCompleted={isCompleted} />
      <InvoiceLink identity={identity.id} isCompleted={isCompleted} />
      <Controls>
        {showPayNow && <Button rounded onClick={handlePayNow} loading={state.isLoadingPayNow} label="Pay 1 USD" />}
        {isCompleted && <Button label="Continue" rounded onClick={next} />}
        <Button onClick={back} variant="outlined" rounded label="Back To Payment Method" />
      </Controls>
    </Content>
  )
}

export default Gateway
