/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RegistrationPaymentResponse, Tokens } from 'mysterium-vpn-js'
import { useEffect, useMemo, useState } from 'react'
import { tequila } from '../../../api/tequila'
import { currentCurrency } from '../../../commons/currency'
import { myst } from '../../../commons/mysts'
import Button from '../../../Components/Buttons/Button'
import { Payments } from '../../../Components/Payments/Payments'
import { selectors } from '../../../redux/selectors'
import { StepLayout } from '../Components/StepLayout'
import { feez } from '../../../commons/fees'
import { CollapseAlert } from '../../../Components/Alerts/CollapseAlert'
import BigNumber from 'bignumber.js'
import { useAppSelector } from '../../../commons/hooks'

const { api } = tequila

const FEE_SPIKE_MULTIPLIER = 1.5

const isPaid = (balance: Tokens, registrationPayment: RegistrationPaymentResponse, feeEther: string): boolean =>
  myst.toEtherBig(balance.wei).gte(feeEther) || registrationPayment.paid

const NetworkRegistration = ({ nextStep }: StepProps) => {
  const identity = useAppSelector(selectors.currentIdentitySelector)
  const fees = useAppSelector(selectors.feesSelector)

  const {
    current: { registration },
  } = fees

  const isEmptyFees = feez.isEmpty(fees)

  const minimalAmountEther = useMemo(
    () => myst.toBig(registration.ether).times(FEE_SPIKE_MULTIPLIER).dp(2, BigNumber.ROUND_UP),
    [registration.ether],
  )

  const [registrationPayment, setRegistrationPayment] = useState<RegistrationPaymentResponse>({ paid: false })

  useEffect(() => {
    const skipIfPaid = async () => {
      const [registrationPayment] = await Promise.all([
        api.payment.registrationPayment(identity.id),
        api.identityBalanceRefresh(identity.id),
      ])
      if (!isEmptyFees && isPaid(identity.balanceTokens, registrationPayment, registration.ether)) {
        nextStep()
      }
    }
    skipIfPaid()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      api.identityBalanceRefresh(identity.id)
      api.payment.registrationPayment(identity.id).then((r) => setRegistrationPayment(r))
    }, 5 * 1000)
    return () => clearInterval(interval)
  }, [])

  const isRegistrationPaymentReceived =
    myst.toEtherBig(identity.balanceTokens.wei).gte(registration.ether) || registrationPayment.paid

  return (
    <StepLayout
      title="Network Registration"
      description={`To register your node on blockchain you can either transfer required amount of ${currentCurrency()} or pay 1 USD`}
      controls={<>{isRegistrationPaymentReceived && !isEmptyFees && <Button onClick={nextStep}>Next</Button>}</>}
      controlsCentered
      fixed
    >
      <CollapseAlert severity="error" visible={isEmptyFees}>
        Could not retrieve blockchain fees please refresh page and try again...
      </CollapseAlert>
      <Payments amountRequiredWei={myst.toWeiBig(minimalAmountEther)} isCompleted={isRegistrationPaymentReceived} />
    </StepLayout>
  )
}

export default NetworkRegistration
