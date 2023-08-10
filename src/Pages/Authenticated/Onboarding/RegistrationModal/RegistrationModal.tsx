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
import { gatewayDescriptor } from './gateways'
import { devices } from '../../../../theme/themes'
import zIndexes from '../../../../constants/z-indexes'
import { media } from '../../../../commons/media'
import { useMediaQuery } from 'react-responsive'
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'

const { isDesktopQuery } = media
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
  @media ${devices.tablet} {
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
    padding: 20px;
  }
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 80px;
  @media ${devices.tablet} {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
  }
`
const Wallet = styled(WalletSVG)`
  height: 400px;
  width: 500px;
  > rect#bg {
    fill: ${({ theme }) => theme.onboarding.bgSvg};
  }
  @media ${devices.tablet} {
    height: 180px;
    width: 400px;
  }
`
const Payment = styled(PaymentSVG)`
  height: 400px;
  width: 500px;
  > rect {
    fill: ${({ theme }) => theme.onboarding.bgSvg};
  }
  @media ${devices.tablet} {
    height: 180px;
    width: 400px;
  }
`
const StepNumber = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  right: -10px;
  top: 25px;

  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.common.colorKey};
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: 64px;
  font-weight: 900;
`

const Header = styled.div`
  position: relative;
  @media ${devices.tablet} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Image = styled.div``

const steps = [
  {
    component: `PaymentMethod`,
    logo: () => <Payment />,
  },
  {
    component: `Payment`,
    logo: (gateway: string) => {
      const Logo = gatewayDescriptor(gateway).logo
      if (!Logo) {
        return <Payment />
      }
      return <Logo />
    },
  },
  {
    component: `Wallet`,
    logo: () => <Wallet />,
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
  const isDesktop = useMediaQuery(isDesktopQuery)
  const Step = useMemo(() => React.lazy(() => import(`./Steps/${steps[step].component}`)), [step])
  const identity = useAppSelector(selectors.currentIdentity)

  useEffect(() => {
    ;(async () => {
      try {
        const [gateways, freeRegistrationEligibility, existingOrders] = await Promise.all([
          api.payment.gateways(),
          api.freeRegistrationEligibility(identity.id),
          api.payment.orders(identity.id),
        ])
        setAllGateways(gateways)
        if (freeRegistrationEligibility.eligible) {
          setStep(steps.length - 1)
        }
        if (existingOrders.length !== 0) {
          const order = existingOrders[0]
          setGateway(order.gatewayName)
          setStep(1)
        }
      } catch (err: any) {
        errors.parseToastError(err)
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
    <Modal
      disableBackdrop
      disableX
      show={show}
      size="xl"
      zIndex={zIndexes.onboardingModal}
      loading={loading || stepLoading}
    >
      <Content>
        <BreadCrumbs current={step} showStep={isDesktop} />
        <Wrapper>
          <Header>
            <Image>{steps[step].logo(gateway)}</Image>
            {isDesktop && <StepNumber>{step + 1}</StepNumber>}
          </Header>
          <Suspense>
            <Step {...stepProps} />
          </Suspense>
        </Wrapper>
      </Content>
    </Modal>
  )
}
