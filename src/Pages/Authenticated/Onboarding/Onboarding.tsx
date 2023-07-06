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
import { ConfirmationDialog } from '../../../Components/ConfirmationDialog/ConfirmationDialog'
import { RegistrationModal } from './RegistrationModal/RegistrationModal'
import { useLocation } from 'react-router-dom'
import ROUTES from '../../../constants/routes'

export const Onboarding = () => {
  const { pathname } = useLocation()
  const identity = useAppSelector(selectors.currentIdentity)
  const { needsAgreedTerms, needsRegisteredIdentity } = useAppSelector(selectors.onBoarding)

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

  if (pathname === ROUTES.ADMIN) {
    return <></>
  }

  if (needsAgreedTerms) {
    return <TOSModal show />
  }

  if (needsRegisteredIdentity || identities.isRegistrationError(identity)) {
    return <RegistrationModal show />
  }

  return <></>
}
