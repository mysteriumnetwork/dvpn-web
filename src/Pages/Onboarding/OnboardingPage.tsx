/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react'
import { Fees, Identity } from 'mysterium-vpn-js'
import { CircularProgress } from '@material-ui/core'

import sideImage from '../../assets/images/onboarding/SideImage.png'

import PasswordChange from './steps/PasswordChange'
import Welcome from './steps/Welcome'
import StepCounter from './StepCounter'
import TermsAndConditions from './steps/TermsAndConditions'
import PayoutSettings from './steps/PayoutSettings'

import './Onboarding.scss'
import { Onboarding } from '../../redux/app.slice'
import { Config } from 'mysterium-vpn-js/lib/config/config'

interface Props {
  onboarding: Onboarding
  identity?: Identity
  config?: Config
  fees?: Fees
}

interface StateProps {
  needsAgreedTerms: boolean
  needsRegisteredIdentity: boolean
  needsPasswordChange: boolean
}

export interface SettlementProps {
  stake: number
  beneficiary: string
}

const OnboardingPage = ({ onboarding, identity, config, fees }: Props) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [state] = useState<StateProps>({
    needsAgreedTerms: onboarding.needsAgreedTerms,
    needsRegisteredIdentity: onboarding.needsRegisteredIdentity,
    needsPasswordChange: onboarding.needsPasswordChange,
  })

  const callbacks: OnboardingChildProps = {
    nextStep: (): void => {
      setCurrentStep(currentStep + 1)
    },
  }

  if (!identity || !config || !fees) {
    return <CircularProgress className="spinner" disableShrink />
  }

  const steps = [<Welcome key="welcome" callbacks={callbacks} />]

  if (state.needsAgreedTerms) {
    steps.push(<TermsAndConditions key="terms" callbacks={callbacks} />)
  }

  if (state.needsRegisteredIdentity) {
    steps.push(<PayoutSettings key="payout" identity={identity} callbacks={callbacks} fees={fees} config={config} />)
  }

  if (state.needsPasswordChange) {
    steps.push(<PasswordChange key="password" config={config} callbacks={callbacks} />)
  }

  const totalStepCount = steps.length
  const nextStepComponent = steps[currentStep > steps.length - 1 ? steps.length - 1 : currentStep]

  return (
    <div className="onboarding">
      <div className="onboarding__content">
        <div className="steps">
          {nextStepComponent}
          <StepCounter currentStep={currentStep} totalStepCount={totalStepCount} />
        </div>
      </div>
      <div className="onboarding__sidebar">
        <img alt="onboarding" src={sideImage} />
      </div>
    </div>
  )
}

export default OnboardingPage
