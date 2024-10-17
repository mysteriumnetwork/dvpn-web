/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CenteredColumn } from '../Components'
import { QuickOnboardingPage } from '../../Onboarding/Password/QuickOnboardingPage'
import { AdvancedBoardingPage } from '../../Onboarding/Password/AdvancedBoardingPage'

const OnboardingBook = () => {
  return (
    <CenteredColumn>
      <QuickOnboardingPage />
      <AdvancedBoardingPage />
    </CenteredColumn>
  )
}

export default OnboardingBook
