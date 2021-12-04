/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Suspense, useMemo, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import styles from './Onboarding.module.scss'
import sideImage from '../../assets/images/onboarding/SideImage.png'
import { useSelector } from 'react-redux'
import { onBoardingStateSelector } from '../../redux/selectors'
import { Onboarding } from '../../redux/app.slice'

interface Step {
  component: string
  isApplicable: (onBoarding: Onboarding) => boolean
}

const steps: Step[] = [
  {
    component: 'Greeting',
    isApplicable: () => true,
  },
  {
    component: 'TOS',
    isApplicable: (onBoarding) => onBoarding.needsAgreedTerms,
  },
  {
    component: 'Registration',
    isApplicable: (onBoarding) => onBoarding.needsRegisteredIdentity,
  },
  {
    component: 'Password',
    isApplicable: (onBoarding) => onBoarding.needsOnBoarding,
  },
]

const OnBoardingPage = () => {
  const onBoarding = useSelector(onBoardingStateSelector)

  const [step, setStep] = useState<number>(0)
  const Step = useMemo(() => React.lazy(() => import(`./steps/${steps[step].component}`)), [step])

  const nextStep = () => {
    setStep(nextApplicableStep(step))
  }

  const nextApplicableStep = (step: number): number => {
    if (steps.length === step + 1) {
      return step // last step
    }

    for (let i = step + 1; i < steps.length; i++) {
      if (steps[i].isApplicable(onBoarding)) {
        return i
      }
    }
    return step
  }

  return (
    <div className={styles.onBoarding}>
      <div className={styles.onBoardingContent}>
        <Suspense fallback={<CircularProgress className="spinner" disableShrink />}>
          <Step {...{ nextStep }} />
        </Suspense>
      </div>
      <div className={styles.onBoardingSidebar}>
        <img alt="OnBoarding" src={sideImage} />
      </div>
    </div>
  )
}

export default OnBoardingPage
