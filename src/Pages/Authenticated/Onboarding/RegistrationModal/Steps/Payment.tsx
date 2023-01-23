/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { RegistrationPaymentResponse, Tokens } from 'mysterium-vpn-js'
import { tequila } from '../../../../../api/tequila'
import { GatewayProps } from './Gateways/types'
import { RegistrationStepProps } from '../types'
import { gatewayDescriptor } from '../gateways'
import { useAppSelector } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import { feez } from '../../../../../commons/fees'
import { myst } from '../../../../../commons/mysts'
import BigNumber from 'bignumber.js'

const { api } = tequila

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const isPaid = (balance: Tokens, registrationPayment: RegistrationPaymentResponse, feeEther: string): boolean =>
  myst.toEtherBig(balance.wei).gte(feeEther) || registrationPayment.paid

const Payment = ({ gateway, allGateways, back, next }: RegistrationStepProps) => {
  const identity = useAppSelector(selectors.currentIdentity)
  const fees = useAppSelector(selectors.fees)
  const {
    current: { registration },
  } = fees

  const isEmptyFees = feez.isEmpty(fees)

  const minimalAmountEther = myst
    .toEtherBig(useAppSelector(selectors.minimumRegistrationAmountWei))
    .dp(2, BigNumber.ROUND_UP)

  const [registrationPayment, setRegistrationPayment] = useState<RegistrationPaymentResponse>({ paid: false })

  const Gateway = useMemo(() => React.lazy(() => import(`./Gateways/${gatewayDescriptor(gateway).component}`)), [
    gateway,
  ])

  useEffect(() => {
    const skipIfPaid = async () => {
      const [registrationPayment] = await Promise.all([
        api.payment.registrationPayment(identity.id),
        api.identityBalanceRefresh(identity.id),
      ])
      if (!isEmptyFees && isPaid(identity.balanceTokens, registrationPayment, registration.ether)) {
        next()
      }
    }
    skipIfPaid()
  }, [])

  const refreshPaymentStatus = async () => {
    await api.payment.registrationPayment(identity.id).then((r) => setRegistrationPayment(r))
    await api.identityBalanceRefresh(identity.id)
  }

  const isRegistrationPaymentReceived =
    myst.toEtherBig(identity.balanceTokens.wei).gte(registration.ether) || registrationPayment.paid

  useEffect(() => {
    refreshPaymentStatus()
    const interval = setInterval(() => {
      if (isRegistrationPaymentReceived) {
        return
      }
      refreshPaymentStatus()
    }, 5 * 1000)
    return () => clearInterval(interval)
  }, [isRegistrationPaymentReceived])

  const gatewayProps: GatewayProps = {
    gateway: allGateways.find((gw) => gw.name === gateway)!,
    payments: { isCompleted: isRegistrationPaymentReceived, amountRequiredWei: myst.toWeiBig(minimalAmountEther) },
    back,
    next,
  }

  return (
    <Content>
      <Suspense>
        <Gateway {...gatewayProps} />
      </Suspense>
    </Content>
  )
}

export default Payment
