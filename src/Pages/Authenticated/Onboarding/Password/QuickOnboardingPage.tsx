/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PasswordSetComponents } from './PasswordSetComponents'
import { TOS } from './TOS'
import { useState } from 'react'
import ROUTES from '../../../../constants/routes'
import routes from '../../../../constants/routes'
import { InternalLink } from '../../../../Components/Common/Link'
import { useAppSelector, useIsFeatureEnabled } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import FEATURES from '../../../../commons/features'
import { Navigate, useLocation } from 'react-router-dom'
import { tequila } from '../../../../api/tequila'
import { urls } from '../../../../commons/urls'
import { ANDROID_DEEPLINK_CLICKBOARDING } from '../../../../constants/urls'
import toasts from '../../../../commons/toasts'
import { events } from '../../../../commons/events'

const { Page, LockRow, StartButton, GTitle, GDescription, GradientCard, Welcome, WhiteCard } = PasswordSetComponents

export const QuickOnboardingPage = () => {
  const config = useAppSelector(selectors.currentConfig)
  const isClickBoardDisabled = useIsFeatureEnabled(FEATURES.DISABLE_CLICKBOARDING)

  const location = useLocation()

  const [agreedTOS, setAgreedTOS] = useState(false)

  const getLinkAndRedirect = async () => {
    if (!agreedTOS) {
      toasts.toastError('You must agree to Terms and Conditions to proceed')
      return
    }

    const { link } = await tequila.initClickBoarding(
      urls.featureAwareCurrentOrigin(config, routes.CLICKBOARDING, ANDROID_DEEPLINK_CLICKBOARDING),
    )
    await events.send('click_quick_clickboarding_start')
    window.location.href = link
  }

  if (isClickBoardDisabled) {
    return <Navigate to={ROUTES.NEW_PASSWORD} replace />
  }

  return (
    <Page>
      <WhiteCard>
        <Welcome />
        <GradientCard>
          <GTitle $textAlign="center">Quick Onboarding</GTitle>
          <GDescription $textAlign="center">
            The easy way to set up and start running your node. It will guide you through the onboarding, node claiming,
            and password-setting process with just a few clicks of a button.
          </GDescription>
          <TOS
            onAgree={(checked) => {
              setAgreedTOS(checked)
            }}
            isAgreed={agreedTOS}
          />
          <StartButton size="large" label="START" rounded onClick={getLinkAndRedirect} />
          <GDescription $textAlign="center">
            Advanced onboarding{' '}
            <InternalLink to={ROUTES.ADVANCED_ONBOARDING + location.search}>Start here</InternalLink>
          </GDescription>
          <LockRow />
        </GradientCard>
      </WhiteCard>
    </Page>
  )
}
