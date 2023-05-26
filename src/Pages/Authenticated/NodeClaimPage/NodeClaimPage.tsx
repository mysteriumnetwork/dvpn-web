/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import ROUTES from '../../../constants/routes'
import { FullPageSpinner } from '../Components/Spinner/FullPageSpinner'
import { tequila } from '../../../api/tequila'
import errors from '../../../commons/errors'
import toasts from '../../../commons/toasts'

const MMN_API_KEY = 'mmnApiKey'

const { api } = tequila

export const NodeClaimPage = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  useEffect(() => {
    ;(async () => {
      const mmnApiKey = params.get(MMN_API_KEY)

      if (!mmnApiKey) {
        navigate(ROUTES.HOME, { replace: true })
        return
      }

      try {
        await api.setMMNApiKey(mmnApiKey)
        toasts.toastSuccess('Node Claimed!')
      } catch (e) {
        errors.parseToastError(e)
      }

      navigate(ROUTES.HOME, { replace: true })
    })()
  }, [])

  return <FullPageSpinner />
}
