/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Modal } from '../../../../Components/Modals/Modal'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { PaymentGateway } from 'mysterium-vpn-js'
import { tequila } from '../../../../api/tequila'
import styled from 'styled-components'
import { ReactComponent as PaymentSVG } from '../../../../assets/images/onboarding/payment.svg'
import { ReactComponent as WalletSVG } from '../../../../assets/images/onboarding/wallet.svg'
import { BreadCrumbs } from './BreadCrumbs'
import { toast } from 'react-toastify'
import { RegistrationStepProps } from './types'
import errors from '../../../../commons/errors'
import { SUPPORTED_GATEWAYS } from './gateways'

const { api } = tequila

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: space-between;
  padding: 48px;
  gap: 38px;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 80px;
`

const StepNumber = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  right: -50px;
  top: 25px;

  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.common.colorKey};
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: 64px;
  font-weight: 900;
`

const Image = styled.div`
  position: relative;
  width: 517px;
  height: 443px;
`

const steps = [
  {
    component: `PaymentMethod`,
    logo: () => <PaymentSVG />,
  },
  {
    component: `Payment`,
    logo: (gateway: string) => {
      const Logo = SUPPORTED_GATEWAYS[gateway].logo
      if (!Logo) {
        return <PaymentSVG />
      }
      return <Logo />
    },
  },
  {
    component: `Wallet`,
    logo: () => <WalletSVG />,
  },
]

interface Props {
  show?: boolean
}

export const RegistrationModal = ({ show }: Props) => {
  const [loading, setLoading] = useState(true)
  const [stepLoading, setStepLoading] = useState(false)
  const [step, setStep] = useState(0)
  const [allGateways, setAllGateways] = useState<PaymentGateway[]>([])
  const [gateway, setGateway] = useState('empty')
  const [beneficiary, setBeneficiary] = useState('')

  const Step = useMemo(() => React.lazy(() => import(`./Steps/${steps[step].component}`)), [step])

  useEffect(() => {
    ;(async () => {
      try {
        const gateways = await api.payment.gateways()
        setAllGateways(gateways)
      } catch (e: any) {
        toast.error(errors.apiError(e).human)
        toast.error('Could not retrieve payment gateways')
      }

      setLoading(false)
    })()
  }, [])

  const stepProps: RegistrationStepProps = {
    allGateways,
    gateway,
    selectGateway: (gw: string) => setGateway(gw),
    beneficiary,
    setBeneficiary: (beneficiary: string) => setBeneficiary(beneficiary),
    next: () => setStep((p) => p + 1),
    back: () => setStep((p) => p - 1),
    loading: stepLoading,
    setLoading: setStepLoading,
  }

  return (
    <Modal disableBackdrop disableX show={show} size="xl" loading={loading || stepLoading}>
      <Content>
        <Row>
          <BreadCrumbs current={step} />
        </Row>
        <Row>
          <Image>
            {steps[step]?.logo(gateway) || <PaymentSVG />}
            <StepNumber>{step + 1}</StepNumber>
          </Image>

          <Suspense>
            <Step {...stepProps} />
          </Suspense>
        </Row>
      </Content>
    </Modal>
  )
}
