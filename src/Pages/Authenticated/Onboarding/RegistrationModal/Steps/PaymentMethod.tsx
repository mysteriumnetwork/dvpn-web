/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { Button } from '../../../../../Components/Inputs/Button'
import React, { useEffect, useState } from 'react'
import { Option } from '../../../../../Components/Radio/Radio'
import { SUPPORTED_GATEWAYS } from '../gateways'
import { RegistrationStepProps } from '../types'

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.common.colorGrayBlue2};
  line-height: 22px;
`
const Options = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const DIRECT_GATEWAY_OPTION: Option = { value: 'direct', label: SUPPORTED_GATEWAYS.direct.summary }

const PaymentMethod = ({ setLoading, selectGateway, next, allGateways }: RegistrationStepProps) => {
  const [availableGatewayOptions, setAvailableGatewayOptions] = useState<Option[]>([])
  useEffect(() => {
    setLoading(true)
    const options: Option[] = allGateways
      .filter((gw) => Object.keys(SUPPORTED_GATEWAYS).includes(gw.name))
      .map((gw) => ({ value: gw.name, label: SUPPORTED_GATEWAYS[gw.name].summary }))
    setAvailableGatewayOptions([DIRECT_GATEWAY_OPTION, ...options])
    setLoading(false)
  }, [allGateways])

  const handleSelect = (value: string) => {
    selectGateway(value)
    next()
  }

  return (
    <Content>
      <Title>Select payment method</Title>
      <Description>
        To register your node on blockchain you can either transfer required amount of MYST or pay 1 USD.
      </Description>
      <Options>
        {availableGatewayOptions.map((o) => (
          <Button key={o.value} variant="outlined" label={o.label} onClick={() => handleSelect(o.value)} />
        ))}
      </Options>
    </Content>
  )
}

export default PaymentMethod
