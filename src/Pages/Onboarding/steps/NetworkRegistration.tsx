/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RegistrationPaymentResponse, Tokens } from 'mysterium-vpn-js'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { tequila } from '../../../api/wrapped-calls'
import { currentCurrency } from '../../../commons/money.utils'
import { myst } from '../../../commons/mysts'
import Button from '../../../Components/Buttons/Button'
import { Payments } from '../../../Components/Payments/Payments'
import { selectors } from '../../../redux/selectors'
import { StepLayout } from '../Components/StepLayout'
import { feez } from '../../../commons/fees'
import { CollapseAlert } from '../../Authenticated/Components/WithdrawalModal/CollapseAlert'
import BigNumber from 'bignumber.js'

const { api } = tequila

const FEE_SPIKE_MULTIPLIER = 1.5

const isPaid = (balance: Tokens, registrationPayment: RegistrationPaymentResponse, feeEther: string): boolean =>
  myst.toEtherBig(balance.wei).gte(feeEther) || registrationPayment.paid

const NetworkRegistration = ({ nextStep }: StepProps) => {
  const identity = useSelector(selectors.currentIdentitySelector)
  const fees = useSelector(selectors.feesSelector)

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
        api.registrationPayment(identity.id),
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
      api.registrationPayment(identity.id).then((r) => setRegistrationPayment(r))
    }, 5 * 1000)
    return () => clearInterval(interval)
  }, [])

  const isRegistrationPaymentReceived =
    myst.toEtherBig(identity.balanceTokens.wei).gte(registration.ether) || registrationPayment.paid

  return (
    <StepLayout
      title="Network Registration"
      description={`To register your node on blockchain you can either transfer required amount of ${currentCurrency()} or pay 1 USD/EUR/GBP`}
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
