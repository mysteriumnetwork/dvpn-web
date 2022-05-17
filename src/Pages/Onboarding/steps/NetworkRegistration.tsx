/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Tokens, RegistrationPaymentResponse } from 'mysterium-vpn-js'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { tequila } from '../../../api/wrapped-calls'
import storage from '../../../commons/localStorage.utils'
import { currentCurrency } from '../../../commons/money.utils'
import { myst } from '../../../commons/myst.utils'
import payments from '../../../commons/payments'
import Button from '../../../Components/Buttons/Button'
import { Payments } from '../../../Components/Payments/Payments'
import { selectors } from '../../../redux/selectors'
import { StepLayout } from '../Components/StepLayout'

const { api } = tequila

const FROZEN_FEE = 'FROZEN_FEE'
const _60_MINUTES = 60 * 60 * 1000

type FrozenFee = {
  timestamp: number
  amountEther: string
}

const isPaid = (balance: Tokens, registrationPayment: RegistrationPaymentResponse, frozenFee: FrozenFee): boolean =>
  myst.toEtherBig(balance.wei).gte(frozenFee.amountEther) || registrationPayment.paid

const isStale = (info?: FrozenFee): boolean => info === undefined || info.timestamp + _60_MINUTES < Date.now()

const NetworkRegistration = ({ nextStep }: StepProps) => {
  const identity = useSelector(selectors.currentIdentitySelector)
  const fees = useSelector(selectors.feesSelector)

  const [registrationPayment, setRegistrationPayment] = useState<RegistrationPaymentResponse>({ paid: false })

  const frozenFee = useMemo(() => {
    const stored = storage.get<FrozenFee>(FROZEN_FEE)
    const feeEther = myst.toEtherBig(fees.registrationTokens.wei)

    if (isStale(stored)) {
      return storage.put<FrozenFee>(FROZEN_FEE, {
        timestamp: Date.now(),
        amountEther: feeEther.gt(payments.ACTUAL_REGISTRATION_FEE_THRESHOLD)
          ? feeEther.times(1.5).toFixed(2)
          : payments.MINIMAL_REGISTRATION_FEE_ETHER.toString(),
      })
    }

    return stored!
  }, [fees.registration, identity.id])

  useEffect(() => {
    const skipIfPaid = async () => {
      const [registrationPayment] = await Promise.all([
        api.registrationPayment(identity.id),
        api.identityBalanceRefresh(identity.id),
      ])

      if (isPaid(identity.balanceTokens, registrationPayment, frozenFee)) {
        nextStep()
      }
    }
    skipIfPaid()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      api.identityBalanceRefresh(identity.id)
      api.registrationPayment(identity.id).then((r) => setRegistrationPayment(r))
    }, 5 * 1000)
    return () => clearInterval(interval)
  }, [])

  const isRegistrationPaymentReceived =
    myst.toEtherBig(identity.balanceTokens.wei).gte(frozenFee.amountEther) || registrationPayment.paid

  return (
    <StepLayout
      title="Network Registration"
      description={`To register your node on blockchain you can either transfer required amount of ${currentCurrency()} or pay 1 USD/EUR/GBP`}
      controls={<>{isRegistrationPaymentReceived && <Button onClick={nextStep}>Next</Button>}</>}
      controlsCentered
      fixed
    >
      <Payments amountRequiredWei={myst.toWeiBig(frozenFee.amountEther)} isCompleted={isRegistrationPaymentReceived} />
    </StepLayout>
  )
}

export default NetworkRegistration
