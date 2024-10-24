/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState } from 'react'
import Button, { ButtonProps } from '../../../../components/Buttons/Button'
import errors from '../../../../commons/errors'
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import { urls } from '../../../../commons/urls'
import ROUTES from '../../../../constants/routes'
import { ANDROID_DEEPLINK_CLAIM } from '../../../../constants/urls'
import { tequila } from '../../../../api/tequila'

const { initClaim } = tequila

export const ClaimButton = ({ label = 'Claim', ...props }: ButtonProps) => {
  const config = useAppSelector(selectors.currentConfig)
  const [loading, setLoading] = useState(false)

  const handleClaim = async () => {
    setLoading(true)
    try {
      const { link } = await initClaim(urls.featureAwareCurrentOrigin(config, ROUTES.CLAIM, ANDROID_DEEPLINK_CLAIM))
      window.location.href = link
    } catch (e) {
      errors.parseToastError(e)
      setLoading(false)
    }
  }

  return <Button label={label} loading={loading} onClick={handleClaim} {...props} />
}
