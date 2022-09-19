/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import { useEffect } from 'react'
import complexActions from '../../../../redux/complex.actions'

export const IdentityRegistrationStatusListener = () => {
  const identity = useAppSelector(selectors.currentIdentity)

  useEffect(() => {
    complexActions.refreshBeneficiary(identity.id)
  }, [identity.id, identity.registrationStatus])

  return null
}
