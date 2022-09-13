/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { Button } from '../../../../../Components/Inputs/Button'
import { useEffect, useState } from 'react'
import { gatewayDescriptor, SUPPORTED_GATEWAYS } from '../gateways'
import { RegistrationStepProps } from '../types'
import { Option } from '../../../../../types/common'
import { devices } from '../../../../../theme/themes'
import BigNumber from 'bignumber.js'
import { useAppSelector } from '../../../../../commons/hooks'
import { myst } from '../../../../../commons/mysts'
import { selectors } from '../../../../../redux/selectors'

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media ${devices.tablet} {
    align-items: center;
    width: 90%;
  }
`
const Title = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.common.fontSizeHumongous};
  font-weight: 600;
  @media ${devices.tablet} {
    font-size: ${({ theme }) => theme.common.fontSizeHuge};
  }
`
const Description = styled.div`
  display: flex;
  margin-top: 30px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.common.colorGrayBlue2};
  line-height: 22px;
  @media ${devices.tablet} {
    text-align: center;
  }
`
const Options = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const PaymentMethod = ({ setLoading, selectGateway, next, allGateways }: RegistrationStepProps) => {
  const minimalAmountEther = myst
    .toEtherBig(useAppSelector(selectors.minimumRegistrationAmountWei))
    .dp(2, BigNumber.ROUND_UP)
    .toString()
  const DIRECT_GATEWAY_OPTION: Option = {
    value: 'direct',
    label: gatewayDescriptor('direct').summary(minimalAmountEther),
  }
  const [availableGatewayOptions, setAvailableGatewayOptions] = useState<Option[]>([])

  useEffect(() => {
    setLoading(true)
    const orderedSupportedGateways = Array.from(SUPPORTED_GATEWAYS.keys())
      .filter((key) => allGateways.find((ag) => ag.name === key))
      .map<Option>((key) => ({ value: key, label: gatewayDescriptor(key).summary() }))

    setAvailableGatewayOptions([DIRECT_GATEWAY_OPTION, ...orderedSupportedGateways])
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
          <Button key={o.value} variant="outlined" label={o.label} onClick={() => handleSelect(o.value as string)} />
        ))}
      </Options>
    </Content>
  )
}

export default PaymentMethod
