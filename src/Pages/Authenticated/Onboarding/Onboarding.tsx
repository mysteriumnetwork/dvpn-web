/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { selectors } from '../../../redux/selectors'
import { useAppSelector } from '../../../commons/hooks'
import identities from '../../../commons/identities'
import { TOSModal } from '../Components/TOSModal/TOSModal'
import React from 'react'
import { ConfirmationDialog } from '../../../Components/ConfirmationDialog/ConfirmationDialog'
import { RegistrationModal } from './RegistrationModal/RegistrationModal'
import { RegistrationInProgressModal } from './RegistrationInProgressModal'

export const Onboarding = () => {
  const identity = useAppSelector(selectors.currentIdentitySelector)
  const { needsAgreedTerms, needsRegisteredIdentity } = useAppSelector(selectors.onBoardingStateSelector)

  // TODO should not happen but maybe prettier exposition is in order
  if (identities.isEmpty(identity)) {
    return (
      <ConfirmationDialog
        title="Identity not loaded"
        message="Something went wrong and node was not able to load you identity!"
        show
      />
    )
  }

  if (needsAgreedTerms) {
    return <TOSModal show />
  }

  if (needsRegisteredIdentity || identities.isRegistrationError(identity)) {
    return <RegistrationModal show />
  }

  if (identities.isInProgress(identity)) {
    return <RegistrationInProgressModal show />
  }

  return <></>
}
